import React, { useState } from 'react';
import { ExternalLink, Star, Award, Clock, DollarSign, Filter } from 'lucide-react';

const CourseRecommendations = ({ courses = [] }) => {
    const [filter, setFilter] = useState('All'); // All | Free | Paid

    const filteredCourses = courses.filter(c => {
        if (filter === 'All') return true;
        return c.price === filter;
    });

    return (
        <div className="animate-fade-in w-full">

            {/* Filters */}
            <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[var(--bg-secondary)] border border-[var(--glass-border)] text-sm text-[var(--text-secondary)]">
                    <Filter size={14} />
                    <span>Filter:</span>
                </div>
                {['All', 'Free', 'Paid'].map(f => (
                    <button
                        key={f}
                        onClick={() => setFilter(f)}
                        className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${filter === f ? 'bg-[var(--accent-blue)] text-white' : 'hover:bg-[var(--bg-secondary)] text-[var(--text-secondary)]'}`}
                    >
                        {f}
                    </button>
                ))}
            </div>

            {/* Course List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCourses.map((course, index) => (
                    <div key={course.id} className="glass-panel group hover:-translate-y-1 transition-transform duration-300 flex flex-col h-full">

                        {/* Header / Image Placeholder */}
                        <div className="h-32 bg-[var(--bg-secondary)] relative overflow-hidden rounded-t-xl group-hover:opacity-90 transition-opacity">
                            {/* "Mock" Image Gradient if real image fails/is just a pattern */}
                            <div className="absolute inset-0 bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center">
                                <span className="text-4xl opacity-20">🎓</span>
                            </div>

                            {/* Match Badge */}
                            <div className="absolute top-3 right-3 px-2 py-1 rounded-md bg-emerald-500/20 backdrop-blur-md border border-emerald-500/50 text-emerald-400 text-xs font-bold flex items-center gap-1">
                                <Award size={12} />
                                {course.matchScore}% Match
                            </div>
                        </div>

                        {/* Content */}
                        <div className="p-5 flex-1 flex flex-col">
                            <div className="flex justify-between items-start mb-2">
                                <span className="text-xs font-semibold text-[var(--accent-violet)] uppercase tracking-wider">{course.platform}</span>
                                <div className="flex items-center gap-1 text-yellow-400 text-xs font-bold">
                                    <Star size={12} fill="currentColor" /> {course.rating}
                                </div>
                            </div>

                            <h3 className="text-lg font-bold mb-1 leading-tight group-hover:text-[var(--accent-blue)] transition-colors line-clamp-2">
                                {course.title}
                            </h3>
                            <p className="text-xs text-[var(--text-secondary)] mb-4">by {course.instructor}</p>

                            {/* AI Reasoning */}
                            <div className="mb-4 p-3 rounded-lg bg-[var(--bg-secondary)]/50 border border-[var(--glass-border)] text-xs relative">
                                <div className="absolute -left-1 top-3 w-1 h-6 bg-[var(--accent-teal)] rounded-r-full"></div>
                                <p className="italic text-gray-300">"{course.reason}"</p>
                            </div>

                            <div className="mt-auto flex items-center justify-between pt-4 border-t border-[var(--glass-border)]">
                                <div className="flex items-center gap-3 text-xs text-[var(--text-secondary)]">
                                    <span className="flex items-center gap-1"><Clock size={12} /> {course.duration}</span>
                                    <span className="flex items-center gap-1"><DollarSign size={12} /> {course.price}</span>
                                </div>
                                <a
                                    href={course.url || "#"}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-2 rounded-full hover:bg-[var(--bg-secondary)] transition-colors text-[var(--text-primary)] hover:text-[var(--accent-blue)]"
                                    title="Go to Course"
                                >
                                    <ExternalLink size={18} />
                                </a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CourseRecommendations;
