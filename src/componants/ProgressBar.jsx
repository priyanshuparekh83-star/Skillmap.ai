import React from 'react';
import { Check } from 'lucide-react';

const ProgressBar = ({ currentStep, totalSteps }) => {
    return (
        <div className="flex items-center justify-center gap-4 mb-10 w-full max-w-md mx-auto">
            {Array.from({ length: totalSteps }).map((_, index) => {
                const stepNum = index + 1;
                const isActive = stepNum === currentStep;
                const isCompleted = stepNum < currentStep;

                return (
                    <React.Fragment key={index}>
                        {/* Circle */}
                        <div
                            className={`
                relative flex items-center justify-center w-10 h-10 rounded-full font-bold text-sm transition-all duration-500
                ${isActive
                                    ? 'bg-[var(--accent-blue)] text-white shadow-[0_0_15px_rgba(59,130,246,0.5)] scale-110 z-10'
                                    : isCompleted
                                        ? 'bg-[var(--accent-teal)] text-transparent'
                                        : 'bg-[var(--bg-secondary)] text-[var(--text-secondary)] border border-[var(--glass-border)]'
                                }
              `}
                        >
                            {isCompleted ? <Check size={18} className="text-white" /> : stepNum}

                            {/* Pulse effect for active */}
                            {isActive && (
                                <span className="absolute w-full h-full rounded-full bg-[var(--accent-blue)] animate-ping opacity-25"></span>
                            )}
                        </div>

                        {/* Connecting Line */}
                        {index < totalSteps - 1 && (
                            <div className="flex-1 h-1 bg-[var(--bg-secondary)] rounded-full overflow-hidden relative min-w-[3rem]">
                                <div
                                    className={`h-full bg-[var(--accent-teal)] transition-all duration-700 ease-out`}
                                    style={{ width: isCompleted ? '100%' : '0%' }}
                                />
                            </div>
                        )}
                    </React.Fragment>
                );
            })}
        </div>
    );
};

export default ProgressBar;
