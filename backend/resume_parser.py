import io
import re

def parse_resume_content(file_content: bytes, filename: str) -> str:
    """
    Extracts text from PDF bytes or returns string for other formats.
    Optimized for basic keyword extraction without heavy dependencies if possible.
    """
    try:
        if filename.endswith(".pdf"):
            # Try importing pypdf
            try:
                from pypdf import PdfReader
                reader = PdfReader(io.BytesIO(file_content))
                text = ""
                for page in reader.pages:
                    text += page.extract_text() + "\n"
                return text
            except ImportError:
                print("pypdf not installed, falling back to simple byte search")
                return file_content.decode("latin-1", errors="ignore")
        else:
            # Assume text/markdown/docx (simple read)
            return file_content.decode("utf-8", errors="ignore")
    except Exception as e:
        print(f"Error parsing file: {e}")
        return ""


# Global variable to cache the model
_nlp_model = None

def load_model():
    global _nlp_model
    if _nlp_model:
        return _nlp_model
        
    try:
        import spacy
        print("Loading custom resume model...")
        _nlp_model = spacy.load("./resume_model")
        print("Model loaded successfully.")
    except Exception as e:
        print(f"Model load failed: {e}. Using simple keyword fallback.")
        _nlp_model = None
    return _nlp_model

def extract_skills(text: str) -> list[str]:
    """
    Extracts skills using the custom trained Spacy model.
    Falls back to keyword matching if model isn't available or finds too few skills.
    """
    nlp = load_model()
    found_skills = set()
    
    # 1. Try Model Extraction
    if nlp:
        doc = nlp(text)
        for ent in doc.ents:
            if ent.label_ == "SKILL":
                found_skills.add(ent.text)
                
    # 2. Hybrid Approach: Always run keyword check too (for high recall)
    # Common tech keywords to look for
    keywords = [
        "Python", "Java", "React", "JavaScript", "TypeScript", "Node.js", 
        "AWS", "Docker", "Kubernetes", "SQL", "NoSQL", "MongoDB", 
        "PostgreSQL", "Git", "CI/CD", "Machine Learning", "Deep Learning",
        "TensorFlow", "PyTorch", "Pandas", "NumPy", "Scikit-Learn",
        "FastAPI", "Flask", "Django", "HTML", "CSS", "Tailwind",
        "Next.js", "GraphQL", "REST API", "Linux", "Bash", "C++", "C#"
    ]
    
    text_lower = text.lower()
    for skill in keywords:
        pattern = r"\b" + re.escape(skill.lower()) + r"\b"
        if re.search(pattern, text_lower):
            found_skills.add(skill)
            
    # 3. Clean and Filter Results
    filtered_skills = set()
    stopwords = {"in", "a", "and", "to", "of", "for", "with", "the", "on", "at", "by", "from", "or", "an"}
    
    # Common words that are often misclassified as skills by simple NER
    blocklist = {
        "problem", "time", "system", "software", "college", "private", "communication",
        "computer", "science", "engineering", "used", "using", "work", "year", "years",
        "month", "months", "team", "project", "university", "school", "education",
        "cgpa", "gpa", "bachelor", "master", "key", "roles", "responsibilities",
        "technologies", "tools", "languages", "frameworks", "database", "databases",
        "server", "client", "application", "web", "data", "analysis", "analytics",
        # New additions from screenshot
        "b.tech", "ambassador", "travel", "acted", "cell", "bharuch", "skills", 
        "ui", "student", "member", "activities", "board", "council"
    }
    
    for skill in found_skills:
        clean = skill.strip()
        lower = clean.lower()
        
        # Rule 1: Remove short tokens (unless specific acronyms like 'C' or 'R' or 'Go')
        if len(clean) < 2 and clean.upper() not in ["C", "R"]:
            continue
            
        # Rule 2: Remove numeric-only strings (years, grades)
        if re.match(r'^\d+$', clean):
            continue
            
        # Rule 3: Remove common stopwords
        if lower in stopwords:
            continue
            
        # Rule 4: Remove email addresses
        if "@" in clean:
            continue
            
        # Rule 5: Blocklist check
        if lower in blocklist:
            continue
        
        # Rule 6: Filter out full sentences (if model captured a whole line)
        if len(clean.split()) > 3:
             continue

        filtered_skills.add(clean)
            
    return list(filtered_skills)
