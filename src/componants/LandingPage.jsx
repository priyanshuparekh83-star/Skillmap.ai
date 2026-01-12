import React from 'react';
import { ArrowRight, Cpu, TrendingUp, ShieldCheck, FileText, AlertCircle, CheckCircle2, UploadCloud, Loader2, RefreshCw } from 'lucide-react';

const JobRequirementsView = ({ job, onBack }) => {
    return (
        <div className="absolute inset-0 bg-[var(--bg-secondary)] rounded-xl border border-[var(--glass-border)] p-5 overflow-hidden flex flex-col animate-fade-in shadow-2xl z-20">
            <div className="flex justify-between items-start mb-4 border-b border-[var(--glass-border)] pb-4">
                <div>
                    <h3 className="text-lg font-bold text-white mb-1">{job.role}</h3>
                    <div className="flex items-center gap-2 text-sm text-[var(--accent-teal)]">
                        <span>@{job.company}</span>
                        <span className="w-1 h-1 rounded-full bg-[var(--text-secondary)]"></span>
                        <span>{job.location}</span>
                    </div>
                </div>
                <div className="text-right">
                    <div className="text-xl font-bold text-green-400">{job.salary}</div>
                    <div className="text-[10px] text-[var(--text-secondary)] uppercase tracking-wider">Comp. Band</div>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar space-y-4 pr-2">
                <div className="space-y-2">
                    <h4 className="text-xs font-bold text-[var(--text-secondary)] uppercase tracking-wider flex items-center gap-2">
                        <ShieldCheck size={12} className="text-[var(--accent-blue)]" />
                        Application Protocols
                    </h4>
                    <ul className="space-y-2">
                        {[
                            "Candidate must have 4+ years of production experience.",
                            "Security Clearance: Level 3 (or willing to obtain).",
                            "Must pass technical assessment (Algorithm + System Design).",
                            "Remote work authorized for US-based residents only."
                        ].map((rule, i) => (
                            <li key={i} className="flex gap-3 text-sm text-[var(--text-primary)] bg-[var(--bg-primary)]/50 p-2 rounded border border-[var(--glass-border)]">
                                <span className="text-[var(--accent-blue)] font-mono">0{i + 1}.</span>
                                {rule}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="space-y-2">
                    <h4 className="text-xs font-bold text-[var(--text-secondary)] uppercase tracking-wider flex items-center gap-2">
                        <Cpu size={12} className="text-[var(--accent-teal)]" />
                        Tech Stack Compatibility
                    </h4>
                    <div className="flex flex-wrap gap-2">
                        {job.skills.map(skill => (
                            <span key={skill} className="px-2 py-1 rounded text-xs bg-[var(--accent-teal)]/10 text-[var(--accent-teal)] border border-[var(--accent-teal)]/20">
                                {skill}
                            </span>
                        ))}
                        <span className="px-2 py-1 rounded text-xs bg-[var(--bg-primary)] text-[var(--text-secondary)] border border-[var(--glass-border)] opacity-60">
                            +3 Optional
                        </span>
                    </div>
                </div>
            </div>

            <button
                onClick={onBack}
                className="mt-4 w-full py-2 bg-[var(--bg-primary)] hover:bg-[var(--glass-border)] text-[var(--text-secondary)] border border-[var(--glass-border)] rounded transition-colors uppercase tracking-widest text-[10px] font-bold"
            >
                Back to Listings
            </button>
        </div>
    );
};

const AptitudeTestView = ({ onComplete }) => {
    // ... preserved for potential future use or reference code ...
    return null;
};

const LandingPage = ({ onStart }) => {
    const [selectedFeature, setSelectedFeature] = React.useState(null);
    const [isLaunching, setIsLaunching] = React.useState(false);
    const [viewingDetails, setViewingDetails] = React.useState(false);
    const [selectedJob, setSelectedJob] = React.useState(null);

    // Resume Analysis State
    const [isUploading, setIsUploading] = React.useState(false);
    const [analysisResult, setAnalysisResult] = React.useState(null);

    const getFeatureDetails = (label) => {
        switch (label) {
            case "AI Resume Parsing":
                return "Our advanced NLP engine scans your uploaded resume (PDF/DOCX) to identify technical skills, experience levels, and project history with 98% accuracy.";
            case "Real-Time Data":
                return "We aggregate live job postings from major platforms (LinkedIn, Indeed, Glassdoor) to determine exactly which skills are in high demand right now.";
            case "Resume Improvement Suggestions":
                return "Upload your resume to get instant AI feedback on missing keywords, weak project descriptions, and formatting issues.";
            default:
                return "";
        }
    };

    const handleResumeUpload = () => {
        setIsUploading(true);
        // Simulate analysis delay
        setTimeout(() => {
            setIsUploading(false);
            setAnalysisResult({
                fileName: "resume_final_v2.pdf",
                detectedRole: "Junior Frontend Developer",
                score: 72,
                missingKeywords: ["TypeScript", "Jest", "CI/CD", "GraphQL"],
                improvements: [
                    {
                        title: "Weak Action Verbs",
                        desc: "Replace 'Worked on' with 'Architected' or 'Optimized' in your Project A description."
                    },
                    {
                        title: "Quantifiable Metrics",
                        desc: "Add specific numbers. E.g., 'Improved load time by 30%' instead of just 'Improved performance'."
                    }
                ]
            });
        }, 2000);
    };

    const resetAnalysis = () => {
        setAnalysisResult(null);
        setIsUploading(false);
    };

    // Reset internal state when modal closes
    React.useEffect(() => {
        if (!selectedFeature) {
            setViewingDetails(false);
            setSelectedJob(null);
            setIsUploading(false);
            setAnalysisResult(null);
        }
    }, [selectedFeature]);

    return (
        <div className={`flex flex-col items-center justify-center min-h-[80vh] text-center animate-fade-in relative transition-all duration-700 ease-in-out ${isLaunching ? 'scale-[3] opacity-0 blur-2xl' : ''}`}>

            {/* Feature Details Modal */}
            {selectedFeature && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in" onClick={() => { setSelectedFeature(null); setIsLaunching(false); }}>
                    <div className="glass-panel w-full max-w-lg p-8 relative flex flex-col items-center text-center max-h-[90vh] overflow-y-auto custom-scrollbar" onClick={e => e.stopPropagation()}>
                        <div className="p-4 rounded-full bg-[var(--accent-blue)]/10 text-[var(--accent-blue)] mb-6">
                            <selectedFeature.icon size={48} />
                        </div>
                        <h2 className="text-2xl font-bold mb-2">{selectedFeature.label}</h2>
                        <p className="text-[var(--accent-teal)] font-medium mb-4">{selectedFeature.desc}</p>

                        {selectedFeature.label === "Rules and Documentation" ? (
                            <div className="mb-8 space-y-4 animate-fade-in w-full text-left">
                                <h3 className="text-xl font-bold text-white mb-4">Parsing Rules & Guidelines</h3>
                                <div className="space-y-4">
                                    <div className="bg-[var(--bg-secondary)]/50 p-4 rounded-xl border border-[var(--glass-border)]">
                                        <h4 className="font-bold text-[var(--accent-teal)] mb-2">Rule #1: Supported Formats</h4>
                                        <p className="text-sm text-[var(--text-secondary)]">We strictly support <strong>PDF</strong> and <strong>DOCX</strong> files. Image-based resumes cannot be parsed.</p>
                                    </div>
                                    <div className="bg-[var(--bg-secondary)]/50 p-4 rounded-xl border border-[var(--glass-border)]">
                                        <h4 className="font-bold text-[var(--accent-teal)] mb-2">Rule #2: Standard Headers</h4>
                                        <p className="text-sm text-[var(--text-secondary)]">Use standard section titles like "Experience", "Education", and "Skills" for best accuracy.</p>
                                    </div>
                                    <div className="bg-[var(--bg-secondary)]/50 p-4 rounded-xl border border-[var(--glass-border)]">
                                        <h4 className="font-bold text-[var(--accent-teal)] mb-2">Rule #3: Single Column Preferred</h4>
                                        <p className="text-sm text-[var(--text-secondary)]">Complex multi-column layouts may cause parsing errors. Keep it simple.</p>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <p className="text-[var(--text-secondary)] mb-8 leading-relaxed">
                                {getFeatureDetails(selectedFeature.label)}
                            </p>
                        )}

                        {/* Live Data Templates View */}
                        {selectedFeature.label === "Real-Time Data" && (
                            <div className="w-full mb-8 text-left space-y-3 animate-fade-in relative min-h-[300px]">
                                {viewingDetails && selectedJob ? (
                                    <JobRequirementsView job={selectedJob} onBack={() => setViewingDetails(false)} />
                                ) : (
                                    <>
                                        <h3 className="text-sm font-bold text-[var(--text-secondary)] uppercase tracking-wider mb-2 flex justify-between items-center">
                                            Select a Role to Analyze
                                            <span className="text-[10px] py-0.5 px-2 rounded-full bg-[var(--accent-teal)]/10 text-[var(--accent-teal)] border border-[var(--accent-teal)]/20 animate-pulse">
                                                ● LIVE
                                            </span>
                                        </h3>
                                        {[
                                            {
                                                role: "Senior React Developer",
                                                company: "TechCorp",
                                                location: "San Francisco, CA (Remote)",
                                                salary: "$145k - $185k",
                                                skills: ["React 18", "TypeScript", "Next.js 14", "Tailwind"],
                                                posted: "2h ago"
                                            },
                                            {
                                                role: "AI Engineer (LLM Focus)",
                                                company: "DataFlow AI",
                                                location: "New York, NY",
                                                salary: "$160k - $220k",
                                                skills: ["Python", "PyTorch", "LangChain", "RAG"],
                                                posted: "15m ago"
                                            },
                                            {
                                                role: "Full Stack Engineer",
                                                company: "StartupX",
                                                location: "Austin, TX",
                                                salary: "$120k - $155k",
                                                skills: ["Node.js", "PostgreSQL", "AWS Lambda", "Redis"],
                                                posted: "5h ago"
                                            }
                                        ].map((job, i) => (
                                            <div
                                                key={i}
                                                className={`group p-4 rounded-xl border transition-all cursor-pointer hover:shadow-lg hover:-translate-y-0.5 ${selectedJob?.role === job.role ? 'bg-[var(--accent-blue)]/10 border-[var(--accent-blue)] shadow-[0_0_20px_rgba(59,130,246,0.3)]' : 'bg-[var(--bg-secondary)] border-[var(--glass-border)] hover:border-[var(--accent-blue)] hover:bg-[var(--bg-secondary)]/80'}`}
                                                onClick={() => setSelectedJob(job)}
                                            >
                                                <div className="flex justify-between items-start mb-1">
                                                    <span className={`font-bold text-sm transition-colors ${selectedJob?.role === job.role ? 'text-[var(--accent-blue)]' : 'text-[var(--text-primary)] group-hover:text-[var(--accent-blue)]'}`}>{job.role}</span>
                                                    <span className="text-xs font-mono text-[var(--accent-teal)] bg-[var(--accent-teal)]/5 px-1.5 py-0.5 rounded">{job.salary}</span>
                                                </div>
                                                <div className="flex justify-between items-center mb-3">
                                                    <div className="text-xs text-[var(--text-secondary)]">{job.company} • {job.location}</div>
                                                    <div className="text-[10px] text-[var(--text-secondary)] opacity-60">{job.posted}</div>
                                                </div>
                                                <div className="flex gap-1.5 flex-wrap">
                                                    {job.skills.map(skill => (
                                                        <span key={skill} className="px-2 py-0.5 rounded text-[10px] bg-[var(--accent-blue)]/10 text-[var(--accent-blue)] border border-[var(--accent-blue)]/10">
                                                            {skill}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </>
                                )}
                            </div>
                        )}

                        <div className="flex gap-4 w-full">
                            <button
                                onClick={() => { setSelectedFeature(null); setIsLaunching(false); }}
                                className="flex-1 py-3 rounded-xl border border-[var(--glass-border)] hover:bg-[var(--bg-secondary)] transition-colors font-medium"
                            >
                                Close
                            </button>

                            {selectedFeature.label === "Resume Improvement Suggestions" ? (
                                null
                            ) : selectedFeature.label === "Real-Time Data" ? (
                                <button
                                    onClick={() => setViewingDetails(true)}
                                    disabled={!selectedJob || viewingDetails}
                                    className={`flex-1 py-3 rounded-xl text-white font-bold shadow-lg transition-all flex items-center justify-center gap-2 ${!selectedJob || viewingDetails ? 'bg-[var(--bg-secondary)] text-[var(--text-secondary)] border border-[var(--glass-border)] cursor-not-allowed opacity-50' : 'bg-[var(--accent-teal)] hover:bg-[var(--accent-teal)]/90 hover:-translate-y-0.5'}`}
                                >
                                    {viewingDetails ? 'Viewing Details' : 'View Requirements'}
                                </button>
                            ) : (
                                <button
                                    onClick={() => {
                                        setIsLaunching(true);
                                        // Trigger warp speed effect logic
                                        setTimeout(() => {
                                            onStart();
                                        }, 800);
                                    }}
                                    className={`flex-1 py-3 rounded-xl bg-[var(--gradient-main)] text-white font-bold shadow-lg hover:shadow-blue-500/25 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 ${isLaunching ? 'scale-[5] opacity-0 blur-xl duration-700' : ''}`}
                                >
                                    {isLaunching ? 'Initiating Jump...' : 'Start Now'} <ArrowRight size={18} />
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Badge */}
            <div className="mb-6 px-4 py-1.5 rounded-full glass-panel border border-[var(--glass-border)] flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--accent-teal)] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--accent-teal)]"></span>
                </span>
                <span className="text-xs font-semibold tracking-wide uppercase text-[var(--accent-teal)]">
                    Live Market Data
                </span>
            </div>

            {/* Hero Headline */}
            <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight max-w-4xl">
                Turn Your Resume Into a <br />
                <span className="text-gradient">Job-Ready Skill Roadmap</span>
            </h1>

            <p className="text-lg md:text-xl text-[var(--text-secondary)] mb-10 max-w-2xl leading-relaxed">
                Stop guessing what to learn. Our AI analyzes live job market data to tell you exactly what skills you're missing for your dream role.
            </p>

            {/* CTA Button */}
            {/* CTA Button */}
            <button
                onClick={onStart}
                className="group relative z-10 inline-flex items-center gap-3 px-8 py-4 bg-[var(--gradient-main)] text-white rounded-full text-lg font-bold transition-all hover:scale-105 hover:shadow-[0_0_40px_-10px_rgba(59,130,246,0.5)]"
            >
                Start Career Map
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>

            {/* Feature Pills */}
            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl px-4">
                {[
                    { icon: Cpu, label: "AI Resume Parsing", desc: "Extracts your skills instantly" },
                    { icon: TrendingUp, label: "Real-Time Data", desc: "Synced with top job boards" },
                    { icon: FileText, label: "Rules and Documentation", desc: "View parsing guidelines and formatting rules" },
                ].map((feature, idx) => (
                    <div
                        key={idx}
                        onClick={() => setSelectedFeature(feature)}
                        className="glass-panel p-6 flex flex-col items-center gap-3 transition-all duration-300 ease-out transform perspective-1000 cursor-pointer"
                        onMouseMove={(e) => {
                            const card = e.currentTarget;
                            const rect = card.getBoundingClientRect();
                            const x = e.clientX - rect.left;
                            const y = e.clientY - rect.top;
                            const centerX = rect.width / 2;
                            const centerY = rect.height / 2;
                            const rotateX = ((y - centerY) / 20) * -1; // Invert axis
                            const rotateY = (x - centerX) / 20;

                            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
                        }}
                        style={{ transformStyle: 'preserve-3d' }}
                    >
                        <div className="p-3 rounded-xl bg-[var(--bg-secondary)] text-[var(--accent-blue)] shadow-[0_0_15px_rgba(59,130,246,0.2)] transition-shadow group-hover:shadow-[0_0_25px_rgba(59,130,246,0.5)]">
                            <feature.icon size={24} />
                        </div>
                        <h3 className="font-semibold text-lg">{feature.label}</h3>
                        <p className="text-sm text-[var(--text-secondary)]">{feature.desc}</p>

                        {/* Shine Effect */}
                        <div className="absolute inset-0 rounded-[inherit] bg-gradient-to-tr from-white/10 to-transparent opacity-0 transition-opacity duration-300 hover:opacity-100 pointer-events-none" />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LandingPage;
