import React, { useState } from 'react';
import { Search, Briefcase } from 'lucide-react';

const POPULAR_ROLES = [
    "Frontend Engineer",
    "Backend Developer",
    "Data Scientist",
    "Machine Learning Engineer",
    "Product Manager",
    "UX Designer",
    "DevOps Engineer"
];

const TargetRoleSelector = ({ onSelect, selectedRole }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredRoles = POPULAR_ROLES.filter(role =>
        role.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="w-full max-w-md mx-auto flex flex-col gap-6 animate-fade-in">

            {/* Search Input */}
            <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-secondary)]" size={20} />
                <input
                    type="text"
                    placeholder="Search for a role (e.g. AI Engineer)"
                    className="w-full pl-12 pr-4 py-4 rounded-xl bg-[var(--bg-secondary)] border border-[var(--glass-border)] focus:border-[var(--accent-blue)] focus:ring-1 focus:ring-[var(--accent-blue)] outline-none transition-all placeholder-[var(--text-secondary)]"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {/* Popular Pills */}
            <div>
                <h4 className="text-sm font-semibold text-[var(--text-secondary)] uppercase tracking-wider mb-3">Popular Roles</h4>
                <div className="flex flex-wrap gap-3">
                    {filteredRoles.map(role => (
                        <button
                            key={role}
                            onClick={() => onSelect(role)}
                            className={`
                px-4 py-2 rounded-full text-sm font-medium border transition-all duration-200
                flex items-center gap-2
                ${selectedRole === role
                                    ? 'bg-[var(--gradient-main)] border-transparent text-white shadow-lg shadow-blue-500/20'
                                    : 'bg-[var(--glass-bg)] border-[var(--glass-border)] hover:border-[var(--text-secondary)] text-[var(--text-primary)] hover:bg-[var(--bg-secondary)]'
                                }
              `}
                        >
                            <Briefcase size={14} />
                            {role}
                        </button>
                    ))}
                    {filteredRoles.length === 0 && (
                        <p className="text-[var(--text-secondary)] text-sm italic">No roles found matching "{searchTerm}"</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TargetRoleSelector;
