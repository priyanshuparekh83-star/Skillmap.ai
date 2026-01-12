# AI Skill-Gap Backend Service

This directory contains the reference implementation for the **Python + Neo4j + LangChain** backend stack required by the problem statement.

## Tech Stack
- **API Framework**: FastAPI (Python)
- **Database**: Neo4j (Graph Database for Skill Relationships)
- **AI/LLM Logic**: LangChain (Orchestration & RAG)
- **Resume Parsing**: PyMuPDF + OpenAI

## Architecture
1.  **`main.py`**: The API Gateway.
2.  **`graph_agent.py`**: Interfaces with Neo4j using LangChain's `GraphCypherQAChain`.
3.  **`resume_parser.py`**: Extracts text and entities from PDF resumes.

## Setup (Future Integration)
To switch the Frontend from "Mock Mode" to this Live Backend:
1.  Install dependencies: `pip install fastapi uvicorn neo4j langchain openai`
2.  Run Neo4j locally.
3.  Start server: `uvicorn main:app --reload`
4.  Update `src/services/api.js` in the frontend to point to `http://localhost:8000`.
