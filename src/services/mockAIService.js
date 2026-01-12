// Mock AI Service - Simulates the "Expert Career Advisor" Persona

const EXPERT_PERSONA = {
    role: "Senior Tech Career Mentor",
    tone: "Professional, Direct, Encouraging, Data-Driven",
    rules: [
        "No generic advice (e.g., 'Learn Python'). Be specific (e.g., 'Master Pydantic for data validation').",
        "Always provide a 'Why' based on market data.",
        "Prioritize high-impact, resume-building skills."
    ]
};

// Helper: Generate Neo4j-style Graph Data
const generateGraphData = (role, matched, missing) => {
    const nodes = [
        { id: "User", name: "You", group: "user", val: 20 },
        { id: "Role", name: role, group: "category", val: 25 }
    ];
    const links = [
        { source: "User", target: "Role", value: 1 }
    ];

    // Add Matched Skills
    matched.forEach(skill => {
        nodes.push({ id: skill.name, name: skill.name, group: "skill", val: 10 });
        links.push({ source: "User", target: skill.name, value: 5 });
        links.push({ source: skill.name, target: "Role", value: 2 });
    });

    // Add Missing Skills
    missing.forEach(skill => {
        nodes.push({ id: skill.name, name: skill.name, group: "target", val: 10 });
        links.push({ source: "Role", target: skill.name, value: 8 }); // Link to role, not user
    });

    // Add some inter-dependencies (Knowledge Graph style)
    if (role === "AI Engineer") {
        nodes.push({ id: "Math", name: "Mathematics", group: "category", val: 15 });
        links.push({ source: "Math", target: "Machine Learning", value: 3 });

        if (missing.find(s => s.name === "Vector Databases")) {
            links.push({ source: "Data Analysis", target: "Vector Databases", value: 1 });
        }
    }

    return { nodes, links };
};

export const generateDashboardData = async (targetRole = "AI Engineer") => {
    // Simulate API delay for realism
    await new Promise(resolve => setTimeout(resolve, 800));

    // Common Data preparation for Graph
    let graphData = { nodes: [], links: [] };

    // Data Scientist Specific Data
    if (targetRole === "Data Scientist") {
        const matched = [
            { name: "Python", status: "matched", confidence: "high", reason: "Foundational mastery confirmed." },
            { name: "Data Analysis", status: "matched", confidence: "high", reason: "Strong analysis background." },
            { name: "SQL", status: "matched", confidence: "medium", reason: "Good query knowledge." }
        ];
        const missing = [
            { name: "Deep Learning", status: "missing", reason: "Critical for modern Data Science. Neural Networks, PyTorch/TensorFlow." },
            { name: "Big Data (Spark)", status: "missing", reason: "Required for processing large datasets in enterprise." },
            { name: "A/B Testing", status: "missing", reason: "Essential for product experimentation." }
        ];

        return {
            matchScore: 42,
            graphData: generateGraphData(targetRole, matched, missing),
            skillAnalysis: {
                matched,
                partial: [
                    { name: "Machine Learning", status: "partial", reason: "Familiar with concepts, need deep dive into algorithms." },
                    { name: "Statistics", status: "partial", reason: "Basic understanding, need advanced inference." }
                ],
                missing
            },
            roadmap: [
                {
                    id: 1,
                    title: "Advanced Statistics & Probability",
                    timeline: "Phase 1: Foundations (Week 1-3)",
                    duration: "25 Hours",
                    difficulty: "Hard",
                    reason: "The bedrock of Data Science. Hypothesis testing, Bayesian inference, and distributions."
                },
                {
                    id: 2,
                    title: "Deep Learning with PyTorch",
                    timeline: "Phase 2: Core ML (Week 4-6)",
                    duration: "30 Hours",
                    difficulty: "Hard",
                    reason: "Move beyond Scikit-Learn. Build and train Neural Networks for Computer Vision and NLP."
                },
                {
                    id: 3,
                    title: "Big Data Processing with Spark",
                    timeline: "Phase 3: Scaling (Week 7-8)",
                    duration: "20 Hours",
                    difficulty: "Medium",
                    reason: "Learn to handle datasets that don't fit in memory using Distributed Computing."
                }
            ],
            courses: [
                {
                    id: 201,
                    title: "Deep Learning Specialization",
                    platform: "Coursera",
                    instructor: "Andrew Ng",
                    rating: 4.9,
                    duration: "3 Months",
                    price: "Paid",
                    matchScore: 98,
                    url: "https://www.coursera.org/specializations/deep-learning",
                    reason: "The gold standard for learning Neural Networks from scratch."
                },
                {
                    id: 202,
                    title: "Apache Spark with Scala/Python",
                    platform: "Udemy",
                    instructor: "Frank Kane",
                    rating: 4.6,
                    duration: "15h",
                    price: "Paid",
                    matchScore: 90,
                    url: "https://www.udemy.com/course/apache-spark-with-scala-hands-on-with-big-data/",
                    reason: "Hands-on guide to Big Data processing."
                },
                {
                    id: 203,
                    title: "Statistics for Data Science",
                    platform: "EdX",
                    instructor: "MIT",
                    rating: 4.8,
                    duration: "10 Weeks",
                    price: "Free",
                    matchScore: 85,
                    url: "https://www.edx.org/course/probability-the-science-of-uncertainty-and-data",
                    reason: "Rigorous academic foundation."
                }
            ],
            marketInsights: {
                topic: "Data Scientist Market 2025",
                confidence: 94,
                sourceUrl: "https://www.glassdoor.com/research/job-market-report-data-scientist/",
                lastUpdated: "2 hours ago",
                sections: [
                    {
                        id: 1,
                        title: "Specialization",
                        content: "Generalist Data Scientists are becoming rarer. Companies now hire for 'NLP Specialist', 'Computer Vision Engineer', or 'Causal Inference Expert'.",
                        color: "text-blue-400"
                    },
                    {
                        id: 2,
                        title: "Tools Update",
                        content: "Polars is gaining ground on Pandas for performance. PyTorch is now dominant over TensorFlow in research and production.",
                        color: "text-orange-400"
                    },
                    {
                        id: 3,
                        title: "Demand",
                        content: "Stable demand in Healthcare and Finance. Lower entry-level volume compared to 2022, higher bar for Senior roles.",
                        color: "text-green-400"
                    }
                ]
            }
        };
    }

    // Full Stack Developer Specific Data
    if (targetRole === "Full Stack Developer") {
        const matched = [
            { name: "React", status: "matched", confidence: "high", reason: "Strong component capabilities." },
            { name: "JavaScript", status: "matched", confidence: "high", reason: "Core web mastery." },
            { name: "Git", status: "matched", confidence: "high", reason: "Version control solid." }
        ];
        const missing = [
            { name: "Next.js", status: "missing", reason: "Standard for modern SSR/SSG React apps." },
            { name: "SaaS Architecture", status: "missing", reason: "Multi-tenancy and subscription billing flows." },
            { name: "CI/CD", status: "missing", reason: "Automated deployment pipelines (GitHub Actions)." }
        ];

        return {
            matchScore: 55,
            graphData: generateGraphData(targetRole, matched, missing),
            skillAnalysis: {
                matched,
                partial: [
                    { name: "Node.js", status: "partial", reason: "Can build servers, but lacks microservices patterns." },
                    { name: "SQL", status: "partial", reason: "Basic queries, need optimization skills." }
                ],
                missing
            },
            roadmap: [
                { id: 1, title: "Master Next.js 14", timeline: "Phase 1: App Router", duration: "15 Hours", difficulty: "Medium", reason: "Move from CRA/Vite to the industry standard meta-framework." },
                { id: 2, title: "PostgreSQL & Prisma", timeline: "Phase 2: Database", duration: "10 Hours", difficulty: "Medium", reason: "Modern ORM and relational DB management." },
                { id: 3, title: "Docker & AWS", timeline: "Phase 3: DevOps", duration: "25 Hours", difficulty: "Hard", reason: "Containerize and deploy your full stack apps." }
            ],
            courses: [
                { id: 301, title: "Next.js & React - The Complete Guide", platform: "Udemy", instructor: "Maximilian Schwarzmüller", rating: 4.8, duration: "25h", price: "Paid", matchScore: 97, url: "https://www.udemy.com/course/nextjs-react-the-complete-guide/", reason: "Best resource for App Router transition." }
            ],
            marketInsights: {
                topic: "Full Stack Trends 2025", confidence: 92, sourceUrl: "https://survey.stackoverflow.co/2024", lastUpdated: "5 hours ago", sections: [
                    { id: 1, title: "Server Actions", content: "Blurring the line between frontend and backend. Highly efficient data mutations.", color: "text-blue-400" },
                    { id: 2, title: "Type Safety", content: "End-to-End type safety with tRPC or Server Actions is expected.", color: "text-emerald-400" }
                ]
            }
        };
    }

    // DevOps Engineer Specific Data
    if (targetRole === "DevOps Engineer") {
        const matched = [
            { name: "Python", status: "matched", confidence: "medium", reason: "Scripting basics." },
            { name: "Git", status: "matched", confidence: "high", reason: "Source control." }
        ];
        const missing = [
            { name: "Kubernetes", status: "missing", reason: "The operating system of the cloud. Non-negotiable." },
            { name: "Terraform", status: "missing", reason: "Infrastructure as Code (IaC) is mandatory." },
            { name: "AWS/Azure", status: "missing", reason: "Deep cloud provider knowledge required." }
        ];

        return {
            matchScore: 30,
            graphData: generateGraphData(targetRole, matched, missing),
            skillAnalysis: {
                matched,
                partial: [
                    { name: "Docker", status: "partial", reason: "Can run containers, need orchestration." }
                ],
                missing
            },
            roadmap: [
                { id: 1, title: "AWS Solutions Architect", timeline: "Phase 1: Cloud", duration: "40 Hours", difficulty: "Hard", reason: "Foundational cloud certification." },
                { id: 2, title: "Kubernetes Certified Admin", timeline: "Phase 2: Orchestration", duration: "50 Hours", difficulty: "Very Hard", reason: "Gold standard for DevOps." }
            ],
            courses: [
                { id: 401, title: "Docker and Kubernetes", platform: "Udemy", instructor: "Stephen Grider", rating: 4.7, duration: "22h", price: "Paid", matchScore: 99, url: "https://www.udemy.com/course/docker-and-kubernetes-the-complete-guide/", reason: "Zero to Hero on containers." }
            ],
            marketInsights: {
                topic: "DevOps & Platform Engineering", confidence: 95, sourceUrl: "https://roadmap.sh/devops", lastUpdated: "12 hours ago", sections: [
                    { id: 1, title: "Platform Eng", content: "Shift from 'DevOps' to building internal developer platforms (IDPs).", color: "text-purple-400" }
                ]
            }
        };
    }

    // Default: AI Engineer (Fallback)
    const aiMatched = [
        { name: "Python", status: "matched", confidence: "high", reason: "Foundational mastery confirmed." },
        { name: "React", status: "matched", confidence: "high", reason: "Strong frontend capabilities." },
    ];
    const aiMissing = [
        { name: "Vector Databases", status: "missing", reason: "Critical for RAG systems (Pinecone/Weaviate). 85% of AI roles require this." },
        { name: "LangChain/LlamaIndex", status: "missing", reason: "The industry standard for orchestration. You cannot build modern agents without this." },
        { name: "FastAPI", status: "missing", reason: "Preferred over Flask for async AI microservices." }
    ];

    return {
        matchScore: 68,
        graphData: generateGraphData("AI Engineer", aiMatched, aiMissing),
        // ... (Existing AI Engineer Data) ...
        skillAnalysis: {
            matched: [
                { name: "Python", status: "matched", confidence: "high", reason: "Foundational mastery confirmed." },
                { name: "React", status: "matched", confidence: "high", reason: "Strong frontend capabilities." },
            ],
            partial: [
                { name: "Machine Learning", status: "partial", reason: "Familiar with concepts, but lacks production deployment experience." },
            ],
            missing: [
                { name: "Vector Databases", status: "missing", reason: "Critical for RAG systems (Pinecone/Weaviate). 85% of AI roles require this." },
                { name: "LangChain/LlamaIndex", status: "missing", reason: "The industry standard for orchestration. You cannot build modern agents without this." },
                { name: "FastAPI", status: "missing", reason: "Preferred over Flask for async AI microservices." }
            ]
        },

        // Detailed Roadmap with "Why" and Specifics
        roadmap: [
            {
                id: 1,
                title: "Master Vector Embeddings",
                timeline: "Phase 1: Foundations (Week 1-2)",
                duration: "12 Hours",
                difficulty: "Medium",
                reason: "Before building RAG, you must understand how to store semantic meaning. Learn Pinecone or Milvus fundamentals."
            },
            {
                id: 2,
                title: "Build a RAG Pipeline",
                timeline: "Phase 2: Application (Week 3-4)",
                duration: "20 Hours",
                difficulty: "Hard",
                reason: "Don't just learn usage. Build a chatbot that chats with your own PDF data using LangChain and OpenAI."
            },
            {
                id: 3,
                title: "Deploy with FastAPI",
                timeline: "Phase 3: Production (Week 5)",
                duration: "10 Hours",
                difficulty: "Medium",
                reason: "AI models live on servers. Learn to wrap your RAG pipeline in a high-performance AsyncIO API."
            }
        ],

        // Curated Courses (Not Generic)
        courses: [
            {
                id: 101,
                title: "Vector Databases for Production",
                platform: "DeepLearning.AI",
                instructor: "Andrew Ng Team",
                rating: 4.9,
                duration: "4h",
                price: "Free",
                matchScore: 99,
                url: "https://www.deeplearning.ai/short-courses/",
                reason: "The most concise, authoritative guide on Vector DBs available today. Hits your exact missing skill."
            },
            {
                id: 102,
                title: "LangChain: Chat with Your Data",
                platform: "Coursera",
                instructor: "Harrison Chase",
                rating: 4.8,
                duration: "8h",
                price: "Free", // Audit
                matchScore: 95,
                url: "https://www.coursera.org/learn/langchain-chat-with-your-data",
                reason: "Taught by the creator of LangChain. Essential for learning the orchestration layer correctly."
            },
            {
                id: 103,
                title: "FastAPI - The Complete Course",
                platform: "Udemy",
                instructor: "Eric Roby",
                rating: 4.7,
                duration: "18h",
                price: "Paid",
                matchScore: 88,
                url: "https://www.udemy.com/course/fastapi-the-complete-course/",
                reason: "Comprehensive. Will take you from basic routes to full async deployment with Docker."
            }
        ],

        // RAG Market Insights
        marketInsights: {
            topic: "The Rise of 'AI Engineer'",
            confidence: 96,
            sourceUrl: "https://www.linkedin.com/pulse/rise-ai-engineer-market-trends-2025",
            lastUpdated: "1 hour ago",
            sections: [
                {
                    id: 1,
                    title: "Trend Shift",
                    content: "The market is shifting from 'Data Scientists' who build models to 'AI Engineers' who chain them. Use of pre-trained models via APIs (OpenAI, Anthropic) + Vector DBs is the new standard.",
                    color: "text-emerald-400"
                },
                {
                    id: 2,
                    title: "Salary Premium",
                    content: "Roles requiring 'LangChain' and 'RAG' experience are commanding a 20-30% premium over general Python backend roles.",
                    color: "text-blue-400"
                },
                {
                    id: 3,
                    title: "Hiring Now",
                    content: "Series B/C Startups and Enterprise FinTech are the most aggressive hirers for this specific stack right now.",
                    color: "text-purple-400"
                }
            ]
        }
    };
};

export const analyzeResumeMock = async (file, currentRole = "AI Engineer") => {
    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 2500));

    // Get base data for the current role
    const baseData = await generateDashboardData(currentRole);

    // Randomize scores to simulate "Real" analysis of the uploaded file
    const randomScore = Math.floor(Math.random() * (85 - 40 + 1)) + 40; // Random score between 40 and 85

    // Randomize which skills are missing vs matched to simulate different candidate profiles
    const allSkills = [
        ...baseData.skillAnalysis.matched,
        ...baseData.skillAnalysis.partial,
        ...baseData.skillAnalysis.missing
    ];

    // Shuffle skills
    const shuffled = allSkills.sort(() => 0.5 - Math.random());
    const splitIndex1 = Math.floor(shuffled.length * 0.4);
    const splitIndex2 = Math.floor(shuffled.length * 0.7);

    const newMatched = shuffled.slice(0, splitIndex1).map(s => ({ ...s, status: "matched", confidence: "high" }));
    const newPartial = shuffled.slice(splitIndex1, splitIndex2).map(s => ({ ...s, status: "partial", confidence: "medium" }));
    const newMissing = shuffled.slice(splitIndex2).map(s => ({ ...s, status: "missing", reason: "Identified as a critical gap in your specific resume." }));

    // Regenerate graph data with new structure
    const newGraphData = generateGraphData(currentRole, newMatched, newMissing);

    return {
        ...baseData,
        matchScore: randomScore,
        skillAnalysis: {
            matched: newMatched,
            partial: newPartial,
            missing: newMissing
        },
        graphData: newGraphData,
        uploadedFileName: file.name
    };
};

export const analyzeResumeAPI = async (file, currentRole = "AI Engineer") => {
    try {
        // 1. Upload Resume to get Skills
        const formData = new FormData();
        formData.append('file', file);

        const analyzeRes = await fetch('http://localhost:8000/analyze-resume', {
            method: 'POST',
            body: formData,
        });

        if (!analyzeRes.ok) throw new Error("Resume analysis failed");

        const analyzeData = await analyzeRes.json();
        const detectedSkills = analyzeData.detected_skills || [];

        // 2. Generate Roadmap based on Skills
        const roadmapRes = await fetch('http://localhost:8000/generate-roadmap', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                target_role: currentRole,
                current_skills: detectedSkills
            })
        });

        if (!roadmapRes.ok) throw new Error("Roadmap generation failed");

        const roadmapData = await roadmapRes.json();

        // 3. Format response to match Dashboard structure
        return {
            matchScore: roadmapData.match_score,
            skillAnalysis: {
                matched: detectedSkills.map(s => ({ name: s, status: "matched", confidence: "high" })),
                missing: roadmapData.missing_skills.map(s => ({ name: s, status: "missing", reason: "Required for role" })),
                partial: []
            },
            roadmap: roadmapData.roadmap,
            graphData: roadmapData.graph_data,
            courses: [], // Backend doesn't return courses yet, keep empty or mock
            marketInsights: { topic: "Live Market Data", confidence: 98, sections: [] },
            uploadedFileName: file.name
        };

    } catch (error) {
        console.error("API Error:", error);
        throw error;
    }
};

export const getAvailableRoles = () => [
    { id: "ai", name: "AI Engineer", progress: 68, active: true, color: "bg-[var(--accent-blue)]" },
    { id: "ds", name: "Data Scientist", progress: 42, active: false, color: "bg-[var(--accent-violet)]" },
    { id: "fs", name: "Full Stack Developer", progress: 55, active: false, color: "bg-emerald-500" },
    { id: "devops", name: "DevOps Engineer", progress: 30, active: false, color: "bg-orange-500" }
];
