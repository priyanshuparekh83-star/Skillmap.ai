import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Clock, BookOpen, CheckCircle, Circle, ArrowRight } from 'lucide-react';

const Roadmap = ({ steps }) => {
    const [expandedStep, setExpandedStep] = useState(null);
    const [completedSteps, setCompletedSteps] = useState([]);

    const toggleExpand = (id) => {
        setExpandedStep(prev => prev === id ? null : id);
    };

    const toggleComplete = (e, id) => {
        e.stopPropagation();
        setCompletedSteps(prev =>
            prev.includes(id) ? prev.filter(stepId => stepId !== id) : [...prev, id]
        );
    };

    return (
        <div className="w-full animate-fade-in relative pl-4 md:pl-0">

            {/* Vertical Line */}
            <div className="absolute left-6 md:left-1/2 top-4 bottom-0 w-0.5 bg-[var(--glass-border)] -translate-x-1/2 hidden md:block"></div>
            <div className="absolute left-6 top-4 bottom-0 w-0.5 bg-[var(--glass-border)] -translate-x-1/2 block md:hidden"></div>

            <div className="flex flex-col gap-8 md:gap-12 relative">
                {steps.map((step, index) => {
                    const isLeft = index % 2 === 0;
                    const isExpanded = expandedStep === step.id;
                    const isCompleted = completedSteps.includes(step.id);

                    return (
                        <div
                            key={step.id}
                            className={`relative flex items-center md:items-start w-full ${isLeft ? 'md:justify-start' : 'md:justify-end'}`}
                        >
                            {/* Timeline Dot */}
                            <div className={`
                  absolute left-6 md:left-1/2 -translate-x-1/2 z-10 w-8 h-8 rounded-full border-4 border-[var(--bg-primary)] 
                  flex items-center justify-center transition-all duration-300
                  ${isCompleted ? 'bg-emerald-500 scale-110 shadow-[0_0_15px_rgba(16,185,129,0.5)]' : 'bg-[var(--bg-secondary)]'}
               `}>
                                {isCompleted && <CheckCircle size={14} className="text-white" />}
                            </div>

                            {/* Content Card */}
                            <div
                                onClick={() => toggleExpand(step.id)}
                                className={`
                    ml-16 md:ml-0 w-full md:w-[45%] cursor-pointer group
                    glass-panel transition-all duration-300 border-l-4
                    ${isExpanded ? 'shadow-lg bg-[var(--bg-secondary)]' : 'hover:bg-[var(--bg-secondary)]'}
                    ${isCompleted ? 'border-l-emerald-500 opacity-75' : 'border-l-[var(--accent-blue)]'}
                 `}
                            >
                                <div className="p-5">
                                    <div className="flex justify-between items-start mb-2">
                                        <div>
                                            <span className="text-xs font-bold text-[var(--accent-blue)] uppercase tracking-wider block mb-1">
                                                {step.timeline}
                                            </span>
                                            <h3 className={`text-lg font-bold ${isCompleted ? 'line-through text-[var(--text-secondary)]' : 'text-[var(--text-primary)]'}`}>
                                                {step.title}
                                            </h3>
                                        </div>
                                        <button
                                            onClick={(e) => toggleComplete(e, step.id)}
                                            className={`p-2 rounded-full hover:bg-[var(--bg-primary)] transition-colors ${isCompleted ? 'text-emerald-500' : 'text-[var(--text-secondary)]'}`}
                                            title={isCompleted ? "Mark as Incomplete" : "Mark as Complete"}
                                        >
                                            {isCompleted ? <CheckCircle size={20} /> : <Circle size={20} />}
                                        </button>
                                    </div>

                                    {/* Snippet (Always visible) */}
                                    <div className="flex items-center gap-4 text-sm text-[var(--text-secondary)] mt-2">
                                        <span className="flex items-center gap-1"><Clock size={14} /> {step.duration}</span>
                                        <span className={`px-2 py-0.5 rounded text-xs border ${step.difficulty === 'Hard' ? 'border-red-500/30 text-red-400' : 'border-yellow-500/30 text-yellow-400'}`}>
                                            {step.difficulty}
                                        </span>
                                    </div>
                                </div>

                                {/* Expanded Details */}
                                <div className={`grid transition-all duration-300 ease-in-out overflow-hidden ${isExpanded ? 'grid-rows-[1fr] opacity-100 border-t border-[var(--glass-border)]' : 'grid-rows-[0fr] opacity-0'}`}>
                                    <div className="min-h-0 bg-[var(--bg-primary)]/30 p-5 pt-0">
                                        <div className="mt-4 pt-4">
                                            <h4 className="flex items-center gap-2 font-semibold text-sm mb-2 text-[var(--accent-violet)]">
                                                <BookOpen size={16} /> Why this matters (AI Insight)
                                            </h4>
                                            <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-4">
                                                {step.reason}
                                            </p>

                                            <button className="text-sm font-medium text-[var(--accent-blue)] flex items-center gap-1 hover:gap-2 transition-all">
                                                View Recommended Course <ArrowRight size={14} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    );
                })}
            </div>

            {/* Milestone End */}
            <div className="flex justify-center mt-12 mb-8">
                <div className="px-6 py-2 rounded-full glass-panel border border-[var(--accent-teal)] text-[var(--accent-teal)] font-bold tracking-widest uppercase text-sm animate-pulse">
                    Goal: Job Ready
                </div>
            </div>
        </div>
    );
};

export default Roadmap;
