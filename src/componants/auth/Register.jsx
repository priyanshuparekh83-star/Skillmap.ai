import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Loader2, AlertCircle } from 'lucide-react';

const Register = ({ onSwitchToLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { signup } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            return setError("Passwords do not match");
        }

        try {
            setError('');
            setLoading(true);
            await signup(email, password);
            // Navigation handled by App state listener
        } catch (err) {
            console.error(err);
            setError('Failed to create an account.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] animate-fade-in px-4">
            <div className="card-3d w-full max-w-md p-8 space-y-6">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gradient">Create Account</h2>
                    <p className="text-[var(--text-secondary)] text-sm">Join the AI Skill Roadmap revolution</p>
                </div>

                {error && (
                    <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded-lg text-sm flex items-center gap-2">
                        <AlertCircle size={16} />
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1">Email</label>
                        <input
                            type="email"
                            required
                            className="w-full bg-[var(--bg-primary)] border border-[var(--glass-border)] rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-[var(--accent-blue)] outline-none transition-all"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1">Password</label>
                        <input
                            type="password"
                            required
                            className="w-full bg-[var(--bg-primary)] border border-[var(--glass-border)] rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-[var(--accent-blue)] outline-none transition-all"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1">Confirm Password</label>
                        <input
                            type="password"
                            required
                            className="w-full bg-[var(--bg-primary)] border border-[var(--glass-border)] rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-[var(--accent-blue)] outline-none transition-all"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="btn-primary w-full flex items-center justify-center gap-2"
                    >
                        {loading ? <Loader2 className="animate-spin" size={20} /> : 'Sign Up'}
                    </button>
                </form>

                <div className="text-center text-sm text-[var(--text-secondary)]">
                    Already have an account?{' '}
                    <button onClick={onSwitchToLogin} className="text-[var(--accent-blue)] hover:underline">
                        Log In
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Register;
