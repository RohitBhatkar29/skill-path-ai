from fastapi import APIRouter, Form
import joblib, re, numpy as np
from sklearn.metrics.pairwise import cosine_similarity
from routers import resume
from routers.resume import ROLE_SKILLS, clean_text, extract_skills, predict_roles

router = APIRouter()

tfidf = joblib.load("models/tfidf.pkl")

def ats_score(r_text, jd):
    v = tfidf.transform([clean_text(r_text), clean_text(jd)])
    return round(cosine_similarity(v[0], v[1])[0][0] * 100, 2)

def skill_gap(user, role):
    req = ROLE_SKILLS.get(role, [])
    return list(set(req) - set(user))

@router.post("/jd-match")
async def jd_match(job_description: str = Form(...)):
    current_resume_text = resume.LAST_RESUME_TEXT
    
    # Debug log
    print(f"ATS Match: Checking resume text... Length: {len(current_resume_text)}")
    
    if not current_resume_text:
        return {"error": "Upload resume first"}

    preds = predict_roles(current_resume_text)
    role = preds[0]["job_role"]
    score = ats_score(current_resume_text, job_description)
    gaps = skill_gap(extract_skills(current_resume_text), role)

    return {
        "predicted_role": role,
        "ats_match_score": f"{score}%",
        "missing_skills": gaps,
        "recommended_skills": gaps[:5]
    }
