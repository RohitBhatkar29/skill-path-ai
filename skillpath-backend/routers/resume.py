from fastapi import APIRouter, UploadFile, File, HTTPException
import joblib, re, numpy as np
import io

router = APIRouter()

clf = joblib.load("models/clf.pkl")
tfidf = joblib.load("models/tfidf.pkl")
encoder = joblib.load("models/encoder.pkl")

LAST_RESUME_TEXT = ""

ROLE_SKILLS = {
    "Data Scientist": ["python","machine learning","statistics","pandas","numpy","scikit-learn","sql","power bi","tableau"],
    "Machine Learning Engineer": ["python","tensorflow","pytorch","deep learning","nlp","docker","kubernetes"],
    "Python Developer": ["python","django","flask","fastapi","sql","git","docker"],
    "Frontend Developer": ["html","css","javascript","react","angular","vue"],
    "Backend Developer": ["python","java","node.js","django","spring","mysql","rest api"],
    "DevOps Engineer": ["aws","docker","kubernetes","jenkins","terraform","linux","ci/cd"],
    "Cloud Engineer": ["aws","azure","gcp","linux","terraform","docker"],
    "QA Engineer": ["manual testing","selenium","automation testing","jira","test cases"],
    "Data Analyst": ["sql","excel","power bi","tableau","python","statistics"],
    "AI Engineer": ["python","deep learning","nlp","computer vision","tensorflow","pytorch"]
}

def clean_text(t):
    return re.sub(r"\s+", " ", re.sub(r"[^a-zA-Z0-9\s]", " ", t.lower())).strip()

def extract_text_from_pdf(file_content):
    """Extract text from PDF using multiple methods"""
    text = ""
    
    # Method 1: Try pdfplumber first
    try:
        import pdfplumber
        with pdfplumber.open(io.BytesIO(file_content)) as pdf:
            for page in pdf.pages:
                page_text = page.extract_text()
                if page_text:
                    text += page_text + "\n"
        if text.strip():
            print("✓ Extracted with pdfplumber")
            return text.strip()
    except Exception as e:
        print(f"pdfplumber failed: {e}")
    
    # Method 2: Try PyPDF2 as fallback
    try:
        import PyPDF2
        reader = PyPDF2.PdfReader(io.BytesIO(file_content))
        for page in reader.pages:
            page_text = page.extract_text()
            if page_text:
                text += page_text + "\n"
        if text.strip():
            print("✓ Extracted with PyPDF2")
            return text.strip()
    except Exception as e:
        print(f"PyPDF2 failed: {e}")
    
    # Method 3: Try pypdf as another fallback
    try:
        from pypdf import PdfReader
        reader = PdfReader(io.BytesIO(file_content))
        for page in reader.pages:
            page_text = page.extract_text()
            if page_text:
                text += page_text + "\n"
        if text.strip():
            print("✓ Extracted with pypdf")
            return text.strip()
    except Exception as e:
        print(f"pypdf failed: {e}")
    
    # Method 4: Try pdfminer.six as final fallback
    try:
        from pdfminer.high_level import extract_text
        text = extract_text(io.BytesIO(file_content))
        if text.strip():
            print("✓ Extracted with pdfminer")
            return text.strip()
    except Exception as e:
        print(f"pdfminer failed: {e}")
    
    return text.strip()

def extract_name(text):
    for line in text.split("\n")[:6]:
        line = line.strip()
        if re.search(r"career summary|profile|objective", line, re.I):
            continue
        if re.match(r"^[A-Z][A-Z .]{3,}$", line):
            return line
        if "@" in line:
            part = re.sub(r"email.*", "", line, flags=re.I)
            part = re.sub(r"[^A-Z .]", "", part)
            return part.strip()
    return ""

def extract_email(text):
    clean = re.sub(r"email[:\-]?", "", text.replace(" ", ""), flags=re.I)
    m = re.search(r"[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}", clean)
    return m.group(0) if m else ""

def extract_phone(text):
    m = re.search(r"\b\d{10}\b", text)
    return m.group(0) if m else ""

def extract_skills(text):
    found = set()
    for skill in set(sum(ROLE_SKILLS.values(), [])):
        if re.search(r"\b" + re.escape(skill.lower()) + r"\b", text.lower()):
            found.add(skill)
    return list(found)

def predict_roles(text):
    vec = tfidf.transform([clean_text(text)])
    scores = clf.decision_function(vec)[0]
    idxs = np.argsort(scores)[::-1][:3]
    return [{"job_role": encoder.inverse_transform([i])[0], "confidence": round(float(scores[i]),3)} for i in idxs]

@router.post("/resume-analyze")
async def resume_analyze(resume_file: UploadFile = File(...)):
    try:
        # Read file content
        content = await resume_file.read()
        
        if not content:
            raise HTTPException(status_code=400, detail="Empty file received")
        
        print(f"Received file: {resume_file.filename}, size: {len(content)} bytes")
        
        text = ""
        if resume_file.filename.endswith(".txt"):
            try:
                text = content.decode("utf-8")
            except:
                text = content.decode("latin-1")
        else:
            # Extract text from PDF
            text = extract_text_from_pdf(content)
        
        print(f"Extracted text length: {len(text)} characters")
        
        if not text or len(text.strip()) < 10:
            raise HTTPException(
                status_code=400, 
                detail="Could not extract text from PDF. It might be an image/scanned PDF. Please try the 'Paste Text' tab instead."
            )

        global LAST_RESUME_TEXT
        LAST_RESUME_TEXT = text

        preds = predict_roles(text)

        return {
            "name": extract_name(text),
            "email": extract_email(text),
            "phone": extract_phone(text),
            "skills": extract_skills(text),
            "primary_job_role": preds[0]["job_role"],
            "all_predictions": preds,
            "resume_text": text,
            "status": "success"
        }
    except HTTPException:
        raise
    except Exception as e:
        print(f"Error processing resume: {e}")
        raise HTTPException(status_code=500, detail=f"Error processing file: {str(e)}")
