import React, { useState } from 'react';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import FileUpload from './FileUpload';
import ResumeAnalysis from './ResumeAnalysis';
import TargetRoleSelector from './TargetRoleSelector';
import ProgressBar from './ProgressBar';

const OnboardingWizard = ({ onComplete }) => {
    const [step, setStep] = useState(1);
    const [data, setData] = useState({
        file: null,
        skills: [],
        targetRole: ''
    });
    const [isGenerating, setIsGenerating] = useState(false);

    // Handlers
    const handleFileSelect = (file) => setData(prev => ({ ...prev, file }));
    const handleSkillsConfirm = (skills) => {
        setData(prev => ({ ...prev, skills }));
        handleNext();
    };
    const handleRoleSelect = (role) => setData(prev => ({ ...prev, targetRole: role }));

    const handleNext = () => {
        if (step === 3) {
            // Start Final Generation
            setIsGenerating(true);
            setTimeout(() => {
                onComplete(data); // Finish onboarding
            }, 3000);
        } else {
            setStep(prev => prev + 1);
        }
    };

    const handleBack = () => setStep(prev => prev - 1);

    // Validation
    const canProceed = () => {
        if (step === 1) return !!data.file;
        if (step === 2) return false; // Handled by ResumeAnalysis component internal button
        if (step === 3) return !!data.targetRole;
        return false;
    };

    // Loading Screen (Final Generation)
    if (isGenerating) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center animate-fade-in">
                <div className="relative w-24 h-24 mb-8">
                    <div className="absolute inset-0 rounded-full border-4 border-[var(--bg-secondary)]"></div>
                    <div className="absolute inset-0 rounded-full border-4 border-t-[var(--accent-blue)] border-r-[var(--accent-violet)] border-b-transparent border-l-transparent animate-spin"></div>
                </div>
                <h2 className="text-2xl font-bold mb-2">Generating Roadmap...</h2>
                <p className="text-[var(--text-secondary)]">Mapping your skills to market demands.</p>
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto py-10 animate-fade-in">
            <ProgressBar currentStep={step} totalSteps={3} />

            <div className="glass-panel p-8 md:p-12 min-h-[400px] flex flex-col justify-between">
                {/* Step Content */}
                <div>
                    <h2 className="text-2xl font-bold text-center mb-2">
                        {step === 1 && 'Upload Your Resume'}
                        {step === 2 && 'Review Detected Skills'}
                        {step === 3 && 'Choose Your Target Role'}
                    </h2>
                    <p className="text-center text-[var(--text-secondary)] mb-8">
                        {step === 1 && 'We support PDF, DOC, and DOCX.'}
                        {step === 2 && 'Our AI extracted the following skills. Verify them below.'}
                        {step === 3 && 'Select the role you are aiming for to calibrate the skill gap.'}
                    </p>

                    <div className="py-4">
                        {step === 1 && <FileUpload onFileSelect={handleFileSelect} />}
                        {step === 2 && <ResumeAnalysis file={data.file} onConfirm={handleSkillsConfirm} />}
                        {step === 3 && <TargetRoleSelector onSelect={handleRoleSelect} selectedRole={data.targetRole} />}
                    </div>
                </div>

                {/* Footer Actions */}
                {step !== 2 && ( // Step 2 has its own confirm button inside the component
                    <div className="flex justify-between items-center mt-8 pt-6 border-t border-[var(--glass-border)]">
                        <button
                            onClick={handleBack}
                            disabled={step === 1}
                            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-colors ${step === 1 ? 'opacity-0 cursor-default' : 'hover:bg-[var(--bg-secondary)]'}`}
                        >
                            <ArrowLeft size={18} /> Back
                        </button>

                        <button
                            onClick={handleNext}
                            disabled={!canProceed()}
                            className={`
                flex items-center gap-2 px-8 py-3 rounded-xl font-bold transition-all
                ${canProceed()
                                    ? 'text-white bg-gradient-to-r from-[var(--accent-blue)] via-[var(--accent-violet)] to-[var(--accent-teal)] shadow-lg hover:shadow-blue-500/25 hover:-translate-y-0.5'
                                    : 'bg-[var(--bg-secondary)] text-[var(--text-secondary)] border border-[var(--glass-border)] cursor-not-allowed opacity-50'
                                }
             `}
                        >
                            {step === 3 ? 'Generate Roadmap' : 'Confirm & Continue'}
                            {step !== 3 && <ArrowRight size={18} />}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default OnboardingWizard;
