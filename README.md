# Skill Path AI

Skill Path AI is an AI-powered EdTech platform that provides personalized career guidance, skill assessments, and resume analysis.

## Features

*   **Skill Assessment:** Multi-step wizard to evaluate user skills.
*   **AI Recommendations:** Personalized course and job recommendations.
*   **Resume Analyzer:**
    *   **Analysis:** AI-powered extraction of skills and job roles from PDF/DOCX resumes.
    *   **Job Matching:** Match your resume against a job description to get an ATS score.
    *   **Resume Builder:** Create and download professional PDF resumes.
*   **Dashboard:** Visual analytics of your progress.

## Prerequisites

*   [Node.js](https://nodejs.org/) (v14+)
*   [Python](https://www.python.org/) (v3.9+)
*   [MongoDB](https://www.mongodb.com/try/download/community) (running locally or Atlas URI)

## 🚀 How to Run the Project

You need to run three separate terminals for the full application.

### 1. Start the Node.js Backend (Port 5000)

Handles API requests, authentication, and acts as a proxy to the Python service.

1.  Open a terminal.
2.  Navigate to the `backend` folder:
    ```bash
    cd backend
    ```
3.  Install dependencies (first time only):
    ```bash
    npm install
    ```
4.  Start the server:
    ```bash
    npm run dev
    ```
    *   *You should see: `Server running on port 5000` & `MongoDB Connected successfully`*

### 2. Start the Python AI Microservice (Port 8000)

Handles resume parsing, ML predictions, and text processing.

1.  Open a **new** terminal.
2.  Navigate to the `skillpath-backend` folder:
    ```bash
    cd skillpath-backend
    ```
3.  Install Python dependencies (first time only):
    ```bash
    pip install -r requirements.txt
    ```
    *   *Note: Ensure you have `scikit-learn`, `fastapi`, `uvicorn`, `pypdf2`, `python-multipart` installed.*
4.  Start the FastAPI server:
    ```bash
    python -m uvicorn app:app --port 8000 --reload
    ```
    *   *You should see: `Uvicorn running on http://127.0.0.1:8000`*

### 3. Start the Frontend (Port 5173)

The React user interface.

1.  Open a **third** terminal.
2.  Navigate to the `frontend` folder:
    ```bash
    cd frontend
    ```
3.  Install dependencies (first time only):
    ```bash
    npm install
    ```
4.  Start the Vite development server:
    ```bash
    npm run dev
    ```
5.  Open your browser and go to: **[http://localhost:5173](http://localhost:5173)**

---

## Resume Analyzer Usage

1.  Navigate to the **Resume** page.
2.  **Upload**: Drag & drop your resume (PDF/DOCX) to see extracted skills and predicted roles.
3.  **Job Match**: Paste a Job Description on the right sidebar and click "Calculate Match Score" to see your ATS score and missing skills.
4.  **Create**: Use the "Create Resume" tab to build a resume from scratch and download it as a PDF.
