# 🚀 Skillmap.ai — AI Skill-Gap Personal Roadmap Generator

**Skillmap.ai** is an intelligent career assistant that analyzes your resume, compares it against **real-time job-market demand**, and generates a **hyper-personalized learning roadmap** to bridge the gap between your current skills and your dream role.

It combines **AI reasoning**, **skill-gap analytics**, and **modern UI visualization** to help learners make *data-driven career decisions*.

![Skillmap.ai Dashboard Preview](https://via.placeholder.com/1200x500?text=Skillmap.ai+AI+Skill-Gap+Dashboard)

---

## 🌟 Why Skillmap.ai?

Most learners follow **generic courses** without knowing:
- What skills they already have
- What skills they’re missing
- What the job market *actually* wants right now

**Skillmap.ai solves this by turning resumes + market data into a clear, actionable roadmap.**

---

## ✨ Core Features

### 📄 1. AI Resume Analysis
- **Smart Parsing**: Extracts technical & soft skills from PDF/DOC resumes
- **Confidence Scoring**: Separates verified skills from weak claims
- **Expert Profile Summary**: Generates a recruiter-style candidate snapshot

---

### 📊 2. Skill Gap Visualization
- **Market Comparison**: Matches your profile against the *ideal candidate* for roles like:
  - AI Engineer
  - Data Scientist
  - Full Stack Developer
  - DevOps Engineer
- **Critical Gaps**: Highlights *must-have* missing skills (e.g., Vector DBs, MLOps)
- **Readiness Score**: Live role-fit percentage (e.g., **68% Ready**)

---

### 🗺️ 3. Dynamic Learning Roadmap
- **Phase-Based Timeline**: Learning broken into weekly milestones
- **Contextual “Why”**: Explains *why* a skill matters in the market
- **Actionable Tasks**: Clear learning objectives with time estimates

---

### 🎓 4. AI-Curated Course Recommendations
- **Smart Matching**: Courses mapped directly to missing skills
- **Trusted Platforms**: Coursera, Udemy, DeepLearning.AI
- **Filters**: Free vs Paid learning paths
- **Direct Links**: One-click access to official courses

---

### 📈 5. Live Market Insights (RAG-Style)
- **Skill Trend Analysis**: Why certain stacks are rising
- **Salary Insights**: Skill-based salary premiums
- **Source-Backed Data**: LinkedIn Jobs, StackOverflow Surveys

---

## 🔄 How It Works (End-to-End Flow)

1. **Upload** → User uploads resume
2. **Analyze** → AI extracts & validates skills
3. **Select** → User chooses target role
4. **Compare** → Profile vs real market requirements
5. **Generate** → Skill gaps, roadmap, and courses
6. **Switch Roles** → Instantly compare against other careers

---

## 🛠️ Tech Stack

### Frontend
- ⚛️ React 18 (Vite)
- 🎨 Tailwind CSS v4
- 🌙 Dark Mode (CSS Variables)
- 📊 Recharts
- 🎞️ CSS Animations + Transitions
- 🔗 Lucide React Icons

### Backend (In Progress)
- 🟢 Node.js + Express
- 🧠 Python / FastAPI (planned)

### AI & Data (Planned / In Progress)
- 🧠 LangChain
- 🕸️ Neo4j (Skill Knowledge Graph)
- 🔍 RAG-based job market analysis

---

## 📂 Project Structure

```text
Skillmap.ai/
│
├── backend "Backend APIs"
├── public "Static assets"
├── src "Frontend source"
│   ├── components
│   ├── pages
│   ├── utils
│
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── eslint.config.js
├── README.md
└── .gitignore
```

###⚙️ Setup & Installation
##1️⃣ Clone the repository
```bash
git clone https://github.com/priyanshuparekh83-star/Skillmap.ai.git
cd Skillmap.ai
```
##2️⃣ Install dependencies
```bash
npm install
```
##3️⃣ Configure environment variables
```bash
Create a .env file:
VITE_API_URL=http://localhost:5000
⚠️ Never commit .env to GitHub
```
##4️⃣ Run the frontend
```bash
npm run dev
Open:
http://localhost:5173
```
##5️⃣ Run backend 
```bash
cd backend
npm install
npm start
```
