import React, { useState, useEffect } from 'react';
import { Moon, Sun, Map, LogIn, LogOut, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import UserProfileModal from './UserProfileModal';

const Layout = ({ children, theme, toggleTheme, onNavigate }) => {
    const { currentUser, logout } = useAuth();
    const [showProfile, setShowProfile] = useState(false);

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

    const handleLogout = async () => {
        try {
            await logout();
            setShowProfile(false);
            if (onNavigate) onNavigate('LANDING');
        } catch (error) {
            console.error("Failed to log out", error);
        }
    };

    return (
        <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] transition-colors duration-300 relative overflow-hidden">
            {/* Liquid Background Blobs */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                <div className="blob blob-1"></div>
                <div className="blob blob-2"></div>
                <div className="blob blob-3"></div>
            </div>

            {/* Navigation Bar */}
            <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4">
                <div className="max-w-7xl mx-auto glass-panel px-6 py-3 flex justify-between items-center">

                    {/* Logo */}
                    <div
                        className="flex items-center gap-2 group cursor-pointer"
                        onClick={() => onNavigate && onNavigate('LANDING')}
                    >
                        <div className="p-2 rounded-lg bg-[var(--bg-secondary)] group-hover:bg-[var(--accent-blue)] transition-colors">
                            <Map size={24} className="text-[var(--accent-blue)] group-hover:text-white" />
                        </div>
                        <span className="font-bold text-xl tracking-tight">
                            Skill<span className="text-gradient">Map</span>.ai
                        </span>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-4">
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-full hover:bg-[var(--bg-secondary)] transition-colors text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                            aria-label="Toggle Theme"
                        >
                            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                        </button>

                        <div className="h-6 w-px bg-[var(--glass-border)] mx-1"></div>

                        {currentUser ? (
                            <>
                                <div
                                    className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity"
                                    onClick={() => setShowProfile(!showProfile)}
                                >
                                    <div className="text-right hidden sm:block">
                                        <p className="text-sm font-medium">
                                            {currentUser.email.split('@')[0].charAt(0).toUpperCase() + currentUser.email.split('@')[0].slice(1)}
                                        </p>
                                        <p className="text-xs text-[var(--text-secondary)]">Student</p>
                                    </div>
                                    <div className={`w-10 h-10 rounded-full bg-gradient-to-tr from-[var(--accent-blue)] to-[var(--accent-violet)] p-[2px] ${showProfile ? 'ring-2 ring-white/20' : ''}`}>
                                        <div className="w-full h-full rounded-full bg-[var(--bg-primary)] flex items-center justify-center overflow-hidden">
                                            <span className="font-bold text-sm text-white">
                                                {currentUser.email.charAt(0).toUpperCase()}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <button
                                    onClick={handleLogout}
                                    className="p-2 rounded-lg bg-[var(--bg-secondary)] hover:bg-red-500/10 text-[var(--text-secondary)] hover:text-red-400 transition-colors"
                                    title="Sign Out"
                                >
                                    <LogOut size={20} />
                                </button>
                            </>
                        ) : (
                            <button
                                onClick={() => onNavigate && onNavigate('LOGIN')}
                                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--bg-secondary)] hover:bg-[var(--accent-blue)] hover:text-white transition-all border border-[var(--glass-border)] text-sm font-medium"
                            >
                                <LogIn size={18} />
                                Sign In
                            </button>
                        )}
                    </div>
                </div>
            </nav>

            {/* Profile Modal */}
            {showProfile && <UserProfileModal onClose={() => setShowProfile(false)} />}

            {/* Main Content */}
            <main className="pt-24 pb-12 px-4 max-w-7xl mx-auto">
                {children}
            </main>
        </div>
    );
};

export default Layout;
