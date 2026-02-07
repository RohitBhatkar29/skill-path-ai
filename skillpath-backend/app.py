from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import resume, ats

app = FastAPI(title="Skill Path AI Backend")

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins for development
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(resume.router)
app.include_router(ats.router)

@app.get("/")
def home():
    return {"status": "Skill Path AI Backend Running 🚀"}
