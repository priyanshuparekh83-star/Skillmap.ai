# AI Skill-Gap Personal Roadmap Generator

An intelligent career assistant that analyzes your resume, compares it against real-time market data, and generates a hyper-personalized learning roadmap to bridge the gap between your current skills and your dream role.

![Project Preview](https://via.placeholder.com/800x400?text=SkillMap.ai+Dashboard+Preview)

## 🚀 Key Features

### 1. 📄 AI Resume Analysis
- **Smart Parsing**: Automatically extracts skills from your uploaded resume (PDF/DOC).
- **Confidence Scoring**: Identifies strong skills versus areas needing verification.
- **Detailed Summary**: Generates an "Expert" candidate profile summary.

### 2. 📊 Skill Gap Visualization
- **Market Comparison**: Visualizes your profile against the "perfect candidate" for roles like *AI Engineer*, *Data Scientist*, *Full Stack Developer*, and *DevOps*.
- **Critical Gaps**: Highlights "Must-Have" skills you are missing (e.g., "Vector DBs" for AI roles).
- **Match Score**: Calculates a real-time readiness percentage (e.g., 68% Ready).

### 3. 🗺️ Dynamic Learning Roadmap
- **Phased Timeline**: Breaks down learning into manageable phases (Weeks 1-2, 3-4, etc.).
- **Contextual "Why"**: Explains *why* a specific skill is needed (e.g., "FastAPI is preferred over Flask for async AI microservices").
- **Actionable Steps**: Each milestone includes specific learning objectives and duration estimates.

### 4. 🎓 AI-Curated Course Recommendations
- **Smart Matching**: Recommends specific courses (Coursera, Udemy, DeepLearning.AI) that directly address your identified gaps.
- **Deep Linking**: One-click access to official course pages.
- **Filtering**: sorting by "Free" vs "Paid" options.

### 5. 📈 Live Market Insights (RAG-Style)
- **Trend Analysis**: Provides context on *why* certain skills are hot right now (e.g., "Rise of AI Engineers").
- **Salary Data**: Insights into salary premiums for specific tech stacks.
- **Source Citations**: Links to valid sources (LinkedIn, StackOverflow Surveys) for trust.

## 🛠️ How It Works

1.  **Upload**: User drags & drops their resume on the landing page.
2.  **Analyze**: The system extracts skills (Python, React, etc.) and asks the user to confirm.
3.  **Target**: User selects a target role (e.g., **AI Engineer**).
4.  **Generate**: The AI compares the profile vs. the target role's market requirements.
5.  **Plan**: The Dashboard presents the personalized Gap Analysis, Roadmap, and Courses.
6.  **Switch**: User can dynamically switch roles (e.g., check **Data Scientist** path) to see how their current skills stack up against a different career.

## 💻 Tech Stack

- **Frontend**: React 18 + Vite
- **Styling**: Tailwind CSS v4 + Vanilla CSS Variables (Dark Mode/Theming)
- **Icons**: Lucide React
- **Visualization**: Recharts
- **Animation**: CSS Keyframes + Transitions

## 🔮 Future Roadmap

- [ ] **Backend Integration**: Replace mock services with real Python/FastAPI backend.
- [ ] **Real Resume Parsing**: Integration with text-extraction libraries.
- [ ] **Live Job Feed**: Scraping real-time job listings to populate "Recent Openings".
- [ ] **User Auth**: Save progress permanently across sessions.
