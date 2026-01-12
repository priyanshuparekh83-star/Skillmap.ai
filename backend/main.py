from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional

app = FastAPI(title="Skill-Gap AI API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins (dev mode)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Models
class Skill(BaseModel):
    name: str
    category: str

class AnalysisRequest(BaseModel):
    target_role: str
    current_skills: List[str]

class AnalysisResponse(BaseModel):
    match_score: int
    missing_skills: List[str]
    roadmap: List[dict]
    graph_data: dict

@app.get("/")
def read_root():
    return {"status": "AI Service Online", "stack": "Python + Neo4j + LangChain"}

@app.post("/analyze-resume")
async def analyze_resume(file: UploadFile = File(...)):
    """
    Parses an uploaded PDF resume and returns detected skills.
    Now uses local keyword extraction for valid dynamic data.
    """
    from resume_parser import parse_resume_content, extract_skills
    
    content = await file.read()
    text = parse_resume_content(content, file.filename)
    skills = extract_skills(text)
    
    # If no skills found (empty file or parse fail), fallback to defaults
    if not skills:
        skills = ["Communication", "Teamwork"]
        
    return {"filename": file.filename, "detected_skills": skills}

@app.post("/generate-roadmap", response_model=AnalysisResponse)
async def generate_roadmap(request: AnalysisRequest):
    """
    Generates a dynamic roadmap based on the gap between current skills and target role.
    """
    # Simple logic mapping for the demo
    target = request.target_role
    current = set(request.current_skills)
    
    # Define requirements per role
    role_requirements = {
        "AI Engineer": ["Python", "PyTorch", "LangChain", "Vector Databases", "FastAPI"],
        "Data Scientist": ["Python", "SQL", "Machine Learning", "Pandas", "Statistics"],
        "Full Stack Developer": ["React", "Node.js", "SQL", "Git", "TypeScript"],
        "DevOps Engineer": ["AWS", "Docker", "Kubernetes", "Terraform", "Linux"]
    }
    
    required = role_requirements.get(target, ["Python", "Git"])
    
    missing = [skill for skill in required if skill not in current]
    matched = [skill for skill in required if skill in current]
    
    # Calculate score
    total_req = len(required)
    score = int((len(matched) / total_req) * 100) if total_req > 0 else 0
    
    # Generate Roadmap Steps dynamically based on missing skills
    roadmap = []
    for i, skill in enumerate(missing):
        roadmap.append({
            "id": i+1,
            "title": f"Learn {skill}",
            "timeline": f"Week {i+1}-{i+2}",
            "duration": "10-15 Hours",
            "difficulty": "Medium",
            "reason": f"Essential for {target} roles."
        })
        
    if not roadmap:
         roadmap.append({
            "id": 1,
            "title": "Advanced Projects",
            "timeline": "Week 1-4",
            "duration": "40 Hours",
            "difficulty": "Hard",
            "reason": "You have the core skills! Build a portfolio piece."
        })

    # Construct Graph Data
    nodes = [{"id": "You", "name": "You", "group": "user", "val": 20}]
    links = []
    
    for s in matched:
        nodes.append({"id": s, "name": s, "group": "skill", "val": 10})
        links.append({"source": "You", "target": s, "value": 5})
        
    for s in missing:
        nodes.append({"id": s, "name": s, "group": "target", "val": 10})
        links.append({"source": s, "target": "You", "value": 1})

    return {
        "match_score": score,
        "missing_skills": missing,
        "roadmap": roadmap,
        "graph_data": {"nodes": nodes, "links": links}
    }
