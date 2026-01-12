import React, { useState, useEffect } from 'react';
import { Check, X, AlertTriangle, ShieldCheck, Loader2, Cpu } from 'lucide-react';

// Mock Data for parsed results
const MOCK_PARSED_DATA = {
    summary: "Senior Computer Science Student with a strong foundation in Full Stack Development and emerging expertise in AI/ML. Detected significant project experience with React, Python, and Data Analysis workflows. Your profile suggests a high aptitude for 'AI Engineer' or 'ML Ops' roles, though production deployment experience is currently a gap.",
    skills: [
        // Languages
        { name: "Python", confidence: "high" },
        { name: "JavaScript", confidence: "high" },
        { name: "TypeScript", confidence: "medium" },
        { name: "SQL", confidence: "medium" },

        // Frontend
        { name: "React", confidence: "high" },
        { name: "Tailwind CSS", confidence: "medium" },
        { name: "Redux", confidence: "low" },

        // Data / AI
        { name: "Data Analysis", confidence: "high" },
        { name: "Pandas", confidence: "high" },
        { name: "Machine Learning", confidence: "medium" },
        { name: "Scikit-Learn", confidence: "medium" },
        { name: "TensorFlow", confidence: "low" },

        // Tools / DevOps
        { name: "Git", confidence: "high" },
        { name: "Docker", confidence: "medium" },
        { name: "Kubernetes", confidence: "low" },
        { name: "System Design", confidence: "low" }
    ]
};

const ResumeAnalysis = ({ file, onConfirm }) => {
    const [analyzing, setAnalyzing] = useState(true);
    const [skills, setSkills] = useState([]);
    const [summary, setSummary] = useState("");

    useEffect(() => {
        const analyzeFile = async () => {
            if (!file) return;

            try {
                const formData = new FormData();
                formData.append('file', file);

                const response = await fetch('http://localhost:8000/analyze-resume', {
                    method: 'POST',
                    body: formData,
                });

                if (!response.ok) throw new Error("Failed to analyze resume");

                const result = await response.json();

                // Map strings to objects with confidence (default to High for real detection)
                const realSkills = (result.detected_skills || []).map(name => ({
                    name,
                    confidence: "high"
                }));

                setSkills(realSkills);
                setSummary(`Our AI analyzed your resume (${result.filename}) and detected strong signals for the following technologies. Please review them before generating your roadmap.`);

            } catch (error) {
                console.error("Analysis failed", error);
                setSkills([]);
                setSummary("We encountered an error analyzing your file. Please try manual entry or re-upload.");
            } finally {
                setAnalyzing(false);
            }
        };

        analyzeFile();
    }, [file]);

    const removeSkill = (skillName) => {
        setSkills(prev => prev.filter(s => s.name !== skillName));
    };

    if (analyzing) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px] text-center animate-fade-in">
                <div className="relative mb-6">
                    <div className="absolute inset-0 bg-[var(--accent-blue)] blur-xl opacity-20 rounded-full"></div>
                    <Cpu size={64} className="text-[var(--accent-blue)] animate-pulse relative z-10" />
                </div>
                <h2 className="text-2xl font-bold mb-2">Analyzing Resume...</h2>
                <div className="flex items-center gap-2 text-[var(--text-secondary)]">
                    <Loader2 size={16} className="animate-spin" />
                    <span>Extracting skills & experience</span>
                </div>
            </div>
        );
    }

    return (
        <div className="animate-fade-in w-full max-w-2xl mx-auto">
            {/* Summary Card */}
            <div className="glass-panel p-6 mb-8 border-l-4 border-l-[var(--accent-teal)]">
                <div className="flex items-start gap-4">
                    <div className="p-2 rounded-lg bg-[var(--accent-teal)]/10 text-[var(--accent-teal)] mt-1">
                        <ShieldCheck size={24} />
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-1">AI Summary</h3>
                        <p className="text-[var(--text-secondary)] leading-relaxed">
                            {summary}
                        </p>
                    </div>
                </div>
            </div>

            {/* Skills Review */}
            <h3 className="text-md font-semibold text-[var(--text-secondary)] uppercase tracking-wider mb-4">
                Detected Skills ({skills.length})
            </h3>

            <div className="flex flex-wrap gap-3 mb-8">
                {skills.map((skill) => (
                    <div
                        key={skill.name}
                        className={`
                    group relative flex items-center gap-2 px-4 py-2 rounded-full border transition-all
                    ${skill.confidence === 'high'
                                ? 'bg-[var(--accent-blue)]/10 border-[var(--accent-blue)]/30 text-[var(--text-primary)]'
                                : 'bg-[var(--bg-secondary)] border-[var(--accent-violet)]/30 text-[var(--text-secondary)] border-dashed'
                            }
                `}
                    >
                        {skill.confidence === 'low' && (
                            <AlertTriangle size={14} className="text-yellow-500" title="Low Confidence" />
                        )}
                        <span className="font-medium">{skill.name}</span>

                        <button
                            onClick={() => removeSkill(skill.name)}
                            className="ml-1 p-1 rounded-full hover:bg-red-500/20 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100"
                            title="Remove Skill"
                        >
                            <X size={14} />
                        </button>
                    </div>
                ))}
            </div>

            <div className="flex justify-center">
                <button
                    onClick={() => onConfirm(skills)}
                    className="btn-primary w-full md:w-auto flex items-center justify-center gap-2"
                >
                    <Check size={18} /> Confirm & Continue
                </button>
            </div>

        </div>
    );
};

export default ResumeAnalysis;
