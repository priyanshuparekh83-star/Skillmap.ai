import React, { useState, useEffect } from 'react';
import SkillGapChart from './SkillGapChart';
import Roadmap from './Roadmap';
import CourseRecommendations from './CourseRecommendations';
import MarketInsights from './MarketInsights';
import ProgressChart from './ProgressChart';
import SkillGraph from './SkillGraph';
import { BookMarked, History, ChevronRight, Plus, Sparkles, X, CheckCircle2 } from 'lucide-react';
import { generateDashboardData, getAvailableRoles, analyzeResumeAPI } from '../services/mockAIService';
import { useAuth } from '../context/AuthContext';
import { useRef } from 'react';

const Dashboard = ({ onReset, theme, initialData }) => {
    const { currentUser } = useAuth();
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(null);
    const [selectedRole, setSelectedRole] = useState(initialData?.targetRole || "AI Engineer");
    const [showHistory, setShowHistory] = useState(false);
    const [availableRoles, setAvailableRoles] = useState([]);

    const fileInputRef = useRef(null);

    // Get username from email (before @) or default to "User"
    const username = currentUser?.email ? currentUser.email.split('@')[0] : "User";
    const displayName = username.charAt(0).toUpperCase() + username.slice(1);

    useEffect(() => {
        // Load available roles on mount
        setAvailableRoles(getAvailableRoles());
    }, []);

    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            try {
                // If we have initial data (from Onboarding), use that first!
                if (initialData && initialData.skills && initialData.targetRole === selectedRole) {
                    // We need a way to just generate roadmap from skills without re-parsing
                    // Since we don't have a dedicated service function for that yet, let's call the API directly here or mock the structure
                    // Ideally, we add generateRoadmapAPI to service. Let's do that inline for now to save a tool call.

                    const roadmapRes = await fetch('http://localhost:8000/generate-roadmap', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            target_role: selectedRole,
                            current_skills: initialData.skills.map(s => s.name) // Extract names from objects
                        })
                    });

                    if (roadmapRes.ok) {
                        const roadmapData = await roadmapRes.json();
                        // Construct dashboard data format
                        const constructedData = {
                            matchScore: roadmapData.match_score,
                            skillAnalysis: {
                                matched: initialData.skills.map(s => ({ ...s, status: "matched", confidence: "high" })),
                                missing: roadmapData.missing_skills.map(s => ({ name: s, status: "missing", reason: "Required for role" })),
                                partial: []
                            },
                            roadmap: roadmapData.roadmap,
                            graphData: roadmapData.graph_data,
                            courses: [],
                            marketInsights: { topic: "Live Market Data", confidence: 98, sections: [] },
                            uploadedFileName: initialData.file ? initialData.file.name : "Onboarding Resume"
                        };
                        setData(constructedData);
                        setLoading(false);
                        return; // Exit early, don't run default generation
                    }
                }

                // Default behavior (fallback or role switch)
                const result = await generateDashboardData(selectedRole);
                setData(result);
            } catch (err) {
                console.error("AI Service Error:", err);
            } finally {
                setLoading(false);
            }
        };

        loadData();
        // Reset initialData usage if role changes (logic could be refined but simple for now)
    }, [selectedRole, initialData]);

    const handleFileUpload = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        setLoading(true);
        // setData(null); // Optional: clear data to show "Consulting Expert..." state fully

        try {
            const dynamicResult = await analyzeResumeAPI(file, selectedRole);
            setData(dynamicResult);
        } catch (error) {
            console.error("Analysis failed", error);
        } finally {
            setLoading(false);
        }
    };

    const triggerUpload = () => {
        fileInputRef.current?.click();
    };

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center h-[60vh] animate-fade-in gap-4">
                <Sparkles className="text-[var(--accent-teal)] animate-spin" size={48} />
                <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-teal-400">
                    Consulting Expert Career Model...
                </h2>
                <p className="text-[var(--text-secondary)] text-sm">Analyzing market for {selectedRole}</p>
            </div>
        );
    }

    if (!data) return null;

    return (
        <div className="animate-fade-in space-y-12">

            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-end gap-4">
                <div>
                    <h1 className="text-3xl md:text-4xl font-bold mb-2">
                        Welcome back, <span className="text-gradient">{displayName}</span>
                    </h1>
                    <p className="text-[var(--text-secondary)]">
                        Targeting <span className="text-white font-medium bg-[var(--bg-secondary)] px-2 py-1 rounded-md border border-[var(--glass-border)]">{selectedRole}</span>
                    </p>
                </div>
                <div className="text-right hidden md:block">
                    <div className="flex flex-col items-end gap-2">
                        <p className="text-sm text-[var(--text-secondary)]">Last updated: Just now</p>
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileUpload}
                            className="hidden"
                            accept=".pdf,.docx"
                        />
                        <button
                            onClick={triggerUpload}
                            className="text-xs text-[var(--accent-blue)] hover:underline flex items-center gap-1"
                        >
                            Upload New Resume
                        </button>
                    </div>
                </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

                {/* Left/Main Column (3 spans) */}
                <div className="lg:col-span-3 space-y-12">

                    {/* Progress Section (New) */}
                    <section className="glass-panel p-6">
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h2 className="text-xl font-bold flex items-center gap-2">
                                    <span className="w-1.5 h-6 rounded-full bg-[var(--accent-teal)]"></span>
                                    Career Readiness Progress
                                </h2>
                                <p className="text-xs text-[var(--text-secondary)] mt-1">Metric based on skills acquired vs market demand for {selectedRole}</p>
                            </div>
                            <span className="text-2xl font-bold text-[var(--accent-teal)]">{data.matchScore}% <span className="text-xs text-gray-400 font-normal">Ready</span></span>
                        </div>
                        <ProgressChart score={data.matchScore} />
                    </section>



                    {/* Skill Gap Section */}
                    <section>
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-bold">Skill Gap Analysis</h2>
                        </div>
                        <div className="flex flex-col gap-8">
                            {/* NEW: Knowledge Graph Visualization */}
                            <SkillGraph data={data.graphData} theme={theme} />

                            <SkillGapChart
                                skills={[...data.skillAnalysis.matched, ...data.skillAnalysis.partial, ...data.skillAnalysis.missing]}
                                marketRequirements={[...data.skillAnalysis.matched, ...data.skillAnalysis.partial, ...data.skillAnalysis.missing]}
                                matchScore={data.matchScore}
                            />
                            <MarketInsights insights={data.marketInsights} />
                        </div>
                    </section>

                    {/* Roadmap Section */}
                    <section>
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-2xl font-bold">Personalized Roadmap</h2>
                            <span className="text-sm text-[var(--text-secondary)]">{data.roadmap.length} Milestones</span>
                        </div>
                        <Roadmap steps={data.roadmap} />
                    </section>

                    {/* Course Recommendations */}
                    <section>
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-2xl font-bold">Recommended Courses</h2>
                            <span className="text-sm text-[var(--text-secondary)]">AI-Curated for You</span>
                        </div>
                        <CourseRecommendations courses={data.courses} />
                    </section>
                </div>

                {/* Right Sidebar (1 span) */}
                <div className="space-y-8">

                    {/* Saved Roadmaps Widget */}
                    <div className="glass-panel p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_30px_-10px_rgba(59,130,246,0.3)]">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-bold flex items-center gap-2 text-sm">
                                <BookMarked size={16} className="text-[var(--accent-blue)]" /> Saved Paths
                            </h3>
                            <button className="p-1 hover:bg-[var(--bg-secondary)] rounded"><Plus size={16} /></button>
                        </div>
                        <div className="space-y-3">
                            {availableRoles.map((role) => (
                                <div
                                    key={role.id}
                                    onClick={() => setSelectedRole(role.name)}
                                    className={`p-3 rounded-lg border cursor-pointer transition-all ${selectedRole === role.name
                                        ? "bg-[var(--bg-secondary)] border-[var(--glass-border)] hover:border-[var(--accent-blue)]"
                                        : "bg-[var(--bg-secondary)]/30 border-transparent hover:bg-[var(--bg-secondary)]"
                                        }`}
                                >
                                    <div className="flex justify-between items-center mb-1">
                                        <span className="font-semibold text-sm">{role.name}</span>
                                        {selectedRole === role.name && <span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-1.5 py-0.5 rounded">Active</span>}
                                    </div>
                                    <div className="w-full h-1 bg-gray-700 rounded-full mt-2">
                                        <div
                                            className={`h-full rounded-full ${role.color || "bg-[var(--accent-blue)]"}`}
                                            style={{ width: `${role.progress}%` }}
                                        ></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Recently Learned Widget */}
                    <div className="glass-panel p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_30px_-10px_rgba(139,92,246,0.3)]">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-bold flex items-center gap-2 text-sm">
                                <History size={16} className="text-[var(--accent-violet)]" /> Recent Activity
                            </h3>
                        </div>
                        <ul className="space-y-4">
                            {(data.skillAnalysis.matched.length > 0 ? data.skillAnalysis.matched : [
                                { name: "Upload Resume", date: "Pending..." },
                                { name: "to see history", date: "..." }
                            ]).slice(0, 5).map((item, idx) => (
                                <li key={idx} className="flex items-start gap-3 text-sm">
                                    <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent-violet)] mt-1.5"></div>
                                    <div>
                                        <p className="font-medium">{item.name}</p>
                                        <p className="text-xs text-[var(--text-secondary)]">Verified Skill</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                        <button
                            onClick={() => setShowHistory(true)}
                            className="w-full mt-4 py-2 text-xs font-medium text-[var(--text-secondary)] hover:text-white flex items-center justify-center gap-1 transition-colors"
                        >
                            View All History <ChevronRight size={12} />
                        </button>
                    </div>

                </div>

            </div>

            {/* History Modal */}
            {showHistory && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
                    <div className="glass-panel w-full max-w-lg p-6 relative">
                        <button
                            onClick={() => setShowHistory(false)}
                            className="absolute top-4 right-4 p-1 hover:bg-[var(--bg-secondary)] rounded-full transition-colors text-[var(--text-secondary)] hover:text-white"
                        >
                            <X size={20} />
                        </button>

                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-3 rounded-full bg-[var(--accent-violet)]/10 text-[var(--accent-violet)]">
                                <History size={24} />
                            </div>
                            <h2 className="text-xl font-bold">Learning History</h2>
                        </div>

                        <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
                            {[
                                { name: "Python Basics", date: "2 days ago", type: "Lesson", status: "Completed" },
                                { name: "Intro to Git", date: "5 days ago", type: "Project", status: "Completed" },
                                { name: "SQL Constraints", date: "1 week ago", type: "Lesson", status: "Completed" },
                                { name: "Data Structures 101", date: "2 weeks ago", type: "Course", status: "Completed" },
                                { name: "React Components", date: "3 weeks ago", type: "Lesson", status: "Completed" },
                                { name: "REST API Design", date: "1 month ago", type: "Article", status: "Read" },
                            ].map((item, idx) => (
                                <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-[var(--bg-secondary)]/30 border border-transparent hover:border-[var(--glass-border)] transition-all">
                                    <div className="flex items-center gap-3">
                                        <CheckCircle2 size={18} className="text-emerald-500" />
                                        <div>
                                            <p className="font-semibold text-sm">{item.name}</p>
                                            <p className="text-xs text-[var(--text-secondary)]">{item.type} • {item.date}</p>
                                        </div>
                                    </div>
                                    <span className="text-[10px] uppercase tracking-wider font-medium text-[var(--text-secondary)]">{item.status}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};

export default Dashboard;
