import React from 'react';
import { Info, CheckCircle2, AlertTriangle, XCircle } from 'lucide-react';

const SkillGapChart = ({ skills, marketRequirements, matchScore }) => {
    // Combine and categorize skills
    const categorizedSkills = marketRequirements.map(req => {
        const userSkill = skills.find(s => s.name.toLowerCase() === req.name.toLowerCase());
        if (userSkill) {
            // Logic: If confidence is high, it's a match. If medium/low, it's partial.
            return { ...req, status: userSkill.confidence === 'high' ? 'matched' : 'partial', userConfidence: userSkill.confidence };
        }
        return { ...req, status: 'missing' };
    });

    const matched = categorizedSkills.filter(s => s.status === 'matched');
    const partial = categorizedSkills.filter(s => s.status === 'partial');
    const missing = categorizedSkills.filter(s => s.status === 'missing');

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 w-full animate-fade-in">

            {/* Overall Score Card */}
            <div className="glass-panel p-8 flex flex-col items-center justify-center text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[var(--accent-blue)] to-[var(--accent-teal)]"></div>

                <div className="relative w-40 h-40 mb-6 flex items-center justify-center">
                    {/* SVG Circle Chart */}
                    <svg className="w-full h-full transform -rotate-90">
                        <circle cx="80" cy="80" r="70" stroke="var(--bg-secondary)" strokeWidth="12" fill="transparent" />
                        <circle
                            cx="80" cy="80" r="70"
                            stroke="url(#gradient-score)"
                            strokeWidth="12"
                            fill="transparent"
                            strokeDasharray="440"
                            strokeDashoffset={440 - (440 * matchScore / 100)}
                            strokeLinecap="round"
                            className="transition-all duration-1000 ease-out"
                        />
                        <defs>
                            <linearGradient id="gradient-score" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="var(--accent-blue)" />
                                <stop offset="100%" stopColor="var(--accent-teal)" />
                            </linearGradient>
                        </defs>
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-4xl font-bold">{matchScore}%</span>
                        <span className="text-xs text-[var(--text-secondary)] uppercase tracking-wide">Match</span>
                    </div>
                </div>

                <h3 className="text-xl font-bold mb-2">Market Ready?</h3>
                <p className="text-[var(--text-secondary)]">
                    You meet <strong className="text-white">{matchScore}%</strong> of the core requirements for this role.
                </p>
            </div>

            {/* Skill Gap Analysis (2 Columns Span) */}
            <div className="glass-panel p-8 lg:col-span-2 flex flex-col gap-6">
                <div className="flex justify-between items-center mb-2">
                    <h3 className="text-xl font-bold flex items-center gap-2">
                        <span className="w-2 h-8 rounded-full bg-[var(--accent-violet)]"></span>
                        Skill Gap Analysis
                    </h3>
                    <div className="flex gap-4 text-xs font-medium">
                        <span className="flex items-center gap-1 text-emerald-400"><CheckCircle2 size={14} /> Matched</span>
                        <span className="flex items-center gap-1 text-yellow-400"><AlertTriangle size={14} /> Partial</span>
                        <span className="flex items-center gap-1 text-red-400"><XCircle size={14} /> Missing</span>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-full">

                    {/* Left Col: Strengths */}
                    <div>
                        <h4 className="text-sm text-[var(--text-secondary)] uppercase tracking-wider mb-4 border-b border-[var(--glass-border)] pb-2">Your Strengths</h4>
                        <div className="flex flex-col gap-3">
                            {[...matched, ...partial].map((skill, idx) => (
                                <div key={idx} className="group relative p-3 rounded-xl bg-[var(--bg-secondary)]/50 border border-[var(--glass-border)] flex items-center justify-between hover:bg-[var(--bg-secondary)] transition-colors">
                                    <div className="flex items-center gap-3">
                                        <div className={`p-1.5 rounded-lg ${skill.status === 'matched' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-yellow-500/10 text-yellow-400'}`}>
                                            {skill.status === 'matched' ? <CheckCircle2 size={16} /> : <AlertTriangle size={16} />}
                                        </div>
                                        <div>
                                            <p className="font-medium text-sm">{skill.name}</p>
                                            <p className="text-xs text-[var(--text-secondary)]">{skill.status === 'matched' ? 'High Proficiency' : 'Foundational Usage'}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Col: Missing / Market Needs */}
                    <div>
                        <h4 className="text-sm text-[var(--text-secondary)] uppercase tracking-wider mb-4 border-b border-[var(--glass-border)] pb-2 text-red-400">Critical Gaps</h4>
                        <div className="flex flex-col gap-3">
                            {missing.map((skill, idx) => (
                                <div key={idx} className="group relative p-3 rounded-xl bg-[var(--bg-secondary)]/50 border border-red-500/20 flex items-center justify-between hover:border-red-500/40 transition-colors cursor-help">
                                    <div className="flex items-center gap-3">
                                        <div className="p-1.5 rounded-lg bg-red-500/10 text-red-400">
                                            <XCircle size={16} />
                                        </div>
                                        <div>
                                            <p className="font-medium text-sm">{skill.name}</p>
                                            <p className="text-xs text-[var(--text-secondary)]">Required by 85% of jobs</p>
                                        </div>
                                    </div>
                                    <Info size={16} className="text-[var(--text-secondary)] opacity-0 group-hover:opacity-100 transition-opacity" />

                                    {/* Tooltip */}
                                    <div className="absolute bottom-full right-0 mb-2 w-48 p-3 rounded-lg bg-black/90 backdrop-blur-md text-xs border border-[var(--glass-border)] invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all z-20">
                                        <p className="font-semibold text-white mb-1">Why it matters:</p>
                                        <p className="text-gray-300">{skill.reason}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>

        </div>
    );
};

export default SkillGapChart;
