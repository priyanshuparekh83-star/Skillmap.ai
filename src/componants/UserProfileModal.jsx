import React, { useRef, useEffect, useState } from 'react';
import { User, Mail, Shield, LogOut, X, Award, Zap } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const UserProfileModal = ({ onClose }) => {
    const { currentUser, logout, updateUserProfile } = useAuth();
    const modalRef = useRef(null);
    const [isEditing, setIsEditing] = useState(false);

    // Derived state or fallback
    const [newName, setNewName] = useState(currentUser?.displayName || (currentUser?.email ? currentUser.email.split('@')[0] : "User"));

    // Dynamic Display Data
    const displayName = currentUser?.displayName || (currentUser?.email ? currentUser.email.split('@')[0] : "User");
    const displayInitial = displayName.charAt(0).toUpperCase();

    // Re-sync if currentUser changes externally
    useEffect(() => {
        if (currentUser?.displayName) {
            setNewName(currentUser.displayName);
        }
    }, [currentUser]);

    // Close on click outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                onClose();
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [onClose]);

    const handleLogout = async () => {
        try {
            await logout();
            onClose();
        } catch (error) {
            console.error("Logout failed", error);
        }
    };

    const handleSave = async () => {
        try {
            await updateUserProfile({ displayName: newName });
            setIsEditing(false);
            // Force reload or just let React state handle it if AuthContext updates currentUser object ref.
            // Firebase Auth listener might not fire immediately for profile updates, so usually safer to reload or manual set.
            window.location.reload(); // Simplest way to ensure all components (Dashboard/Layout) pick up the new name immediately
        } catch (err) {
            console.error("Failed to update profile", err);
        }
    };

    return (
        <div className="fixed inset-0 z-[60] flex items-start justify-end p-4 sm:p-6 mt-16 animate-fade-in">
            {/* Backdrop (invisible but blocks clicks) */}
            <div className="fixed inset-0" onClick={onClose}></div>

            {/* Modal Card */}
            <div
                ref={modalRef}
                className="card-3d w-full max-w-sm p-6 relative z-10 mr-4 mt-2"
                style={{
                    background: 'rgba(30, 41, 59, 0.95)', // Slightly more opaque
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
                }}
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-[var(--text-secondary)] hover:text-white transition-colors"
                >
                    <X size={20} />
                </button>

                {/* Edit Button */}
                {!isEditing && (
                    <button
                        onClick={() => setIsEditing(true)}
                        className="absolute top-4 left-4 text-xs text-[var(--accent-blue)] hover:text-blue-300 font-medium"
                    >
                        Edit
                    </button>
                )}

                {/* Profile Header */}
                <div className="flex flex-col items-center mb-6">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-[var(--accent-blue)] to-[var(--accent-violet)] p-[3px] mb-3 shadow-lg shadow-blue-500/20">
                        <div className="w-full h-full rounded-full bg-[var(--bg-primary)] flex items-center justify-center overflow-hidden">
                            <span className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-violet-400">
                                {displayInitial}
                            </span>
                        </div>
                    </div>

                    {isEditing ? (
                        <div className="flex flex-col gap-2 items-center w-full">
                            <input
                                type="text"
                                value={newName}
                                onChange={(e) => setNewName(e.target.value)}
                                className="bg-[var(--bg-primary)] border border-[var(--accent-blue)] rounded px-2 py-1 text-center text-white font-bold w-3/4 outline-none focus:ring-1 focus:ring-blue-500"
                            />
                            <div className="flex gap-2 text-xs">
                                <button onClick={handleSave} className="text-emerald-400 hover:text-emerald-300">Save</button>
                                <button onClick={() => setIsEditing(false)} className="text-red-400 hover:text-red-300">Cancel</button>
                            </div>
                        </div>
                    ) : (
                        <h2 className="text-xl font-bold text-white">{displayName}</h2>
                    )}

                    <span className="text-xs font-medium px-2 py-1 rounded-full bg-[var(--bg-secondary)] border border-[var(--glass-border)] text-[var(--accent-teal)] mt-1">
                        Student Account
                    </span>
                </div>

                {/* User Details */}
                <div className="space-y-4 mb-6">
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-[var(--bg-secondary)]/50 border border-[var(--glass-border)]">
                        <Mail size={18} className="text-[var(--text-secondary)]" />
                        <div>
                            <p className="text-xs text-[var(--text-secondary)]">Email Address</p>
                            <p className="text-sm font-medium text-white truncate max-w-[200px]">{currentUser.email}</p>
                        </div>
                    </div>

                    {/* General Information */}
                    <div className="space-y-3">
                        <h3 className="text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider">General Information</h3>
                        <div className="p-3 rounded-lg bg-[var(--bg-secondary)]/30 border border-[var(--glass-border)] space-y-3">
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-[var(--text-secondary)]">Account Status</span>
                                <span className={`text-xs px-2 py-0.5 rounded-full border ${currentUser?.emailVerified ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'}`}>
                                    {currentUser?.emailVerified ? 'Verified' : 'Not Verified'}
                                </span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-[var(--text-secondary)]">User ID</span>
                                <span className="text-xs font-mono text-white opacity-70">{currentUser?.uid ? `${currentUser.uid.slice(0, 8)}...` : 'N/A'}</span>
                            </div>
                        </div>
                    </div>

                    {/* Account Stats */}
                    <div className="space-y-3 pt-2">
                        <h3 className="text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider">Account Stats</h3>
                        <div className="grid grid-cols-2 gap-3">
                            <div className="p-3 rounded-lg bg-[var(--bg-secondary)]/30 border border-[var(--glass-border)] text-center">
                                <span className="block text-xs text-[var(--text-secondary)] mb-1">Member Since</span>
                                <span className="font-medium text-white text-sm">
                                    {currentUser?.metadata?.creationTime ? new Date(currentUser.metadata.creationTime).toLocaleDateString() : 'N/A'}
                                </span>
                            </div>
                            <div className="p-3 rounded-lg bg-[var(--bg-secondary)]/30 border border-[var(--glass-border)] text-center">
                                <span className="block text-xs text-[var(--text-secondary)] mb-1">Last Login</span>
                                <span className="font-medium text-white text-sm">
                                    {currentUser?.metadata?.lastSignInTime ? new Date(currentUser.metadata.lastSignInTime).toLocaleDateString() : 'N/A'}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Actions */}
                <div className="pt-4 border-t border-[var(--glass-border)]">
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center justify-center gap-2 p-2 rounded-lg hover:bg-red-500/10 text-red-400 hover:text-red-300 transition-colors font-medium text-sm"
                    >
                        <LogOut size={16} />
                        Sign Out
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UserProfileModal;
