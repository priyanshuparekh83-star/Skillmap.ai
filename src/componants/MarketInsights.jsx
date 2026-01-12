import React from 'react';
import { Sparkles, TrendingUp, Users, RefreshCw, BarChart3, Globe } from 'lucide-react';

const MarketInsights = ({ insights }) => {
    if (!insights) return null;

    return (
        <div className="w-full animate-fade-in">

            <div className="relative glass-panel overflow-hidden border-t-4 border-t-[var(--accent-teal)]">

                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
                    <Sparkles size={120} className="text-[var(--accent-teal)]" />
                </div>

                <div className="p-6 md:p-8 relative z-10">

                    {/* Header */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                        <div className="flex items-center gap-3">
                            <div className="p-3 rounded-full bg-[var(--accent-teal)]/10 text-[var(--accent-teal)]">
                                <Sparkles size={24} />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold flex items-center gap-2">
                                    AI Market Intelligence
                                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-[var(--bg-primary)] border border-[var(--glass-border)] text-[var(--text-secondary)] uppercase tracking-wide">
                                        RAG Powered
                                    </span>
                                </h3>
                                <p className="text-sm text-[var(--text-secondary)]">Analyzing live trends for <span className="text-white font-medium">Vector Databases</span></p>
                            </div>
                        </div>

                        {/* Confidence Badge */}
                        <div className="flex items-center gap-4 text-xs font-medium">
                            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></div>
                                {insights.confidence}% Data Confidence
                            </div>
                            <div className="flex items-center gap-1 text-[var(--text-secondary)]">
                                <RefreshCw size={12} /> {insights.lastUpdated}
                            </div>
                        </div>
                    </div>

                    {/* Insight Blocks */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {insights.sections.map((section, idx) => {
                            // Map index to icon to prevent "undefined" error since JSON doesn't carry components
                            const Icon = [TrendingUp, Users, Globe][idx] || Sparkles;

                            return (
                                <div key={section.id} className="relative group">
                                    <div className="absolute inset-0 bg-gradient-to-b from-[var(--bg-secondary)]/50 to-transparent rounded-xl -z-10 opacity-0 group-hover:opacity-100 transition-opacity"></div>

                                    <div className="mb-3 flex items-center gap-2 font-semibold text-sm uppercase tracking-wide">
                                        <Icon size={16} className={section.color} />
                                        <span className={section.color}>{section.title}</span>
                                    </div>

                                    <div className="p-4 rounded-xl bg-[var(--bg-secondary)]/30 border border-[var(--glass-border)] text-sm leading-relaxed text-gray-300 relative">
                                        {/* Chat Bubble Tail (Visual flair) */}
                                        <div className="absolute -top-1.5 left-6 w-3 h-3 bg-[var(--bg-secondary)]/30 border-t border-l border-[var(--glass-border)] transform rotate-45"></div>

                                        {section.content}
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Source Footer */}
                    <div className="mt-8 pt-4 border-t border-[var(--glass-border)] flex items-center justify-between text-xs text-[var(--text-secondary)]">
                        <div className="flex gap-2">
                            <span>Sources:</span>
                            <span className="underline decoration-dotted cursor-help">LinkedIn Jobs</span> •
                            <span className="underline decoration-dotted cursor-help">StackOverflow Trends</span> •
                            <span className="underline decoration-dotted cursor-help">2025 Tech Radar</span>
                        </div>
                        <a
                            href={insights.sourceUrl || "#"}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 hover:text-[var(--accent-blue)] transition-colors"
                            title="View Source Data"
                        >
                            <BarChart3 size={12} /> View Underlying Data
                        </a>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default MarketInsights;
