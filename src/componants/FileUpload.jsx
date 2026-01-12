import React, { useCallback, useState } from 'react';
import { UploadCloud, FileText, X } from 'lucide-react';

const FileUpload = ({ onFileSelect }) => {
    const [isDragging, setIsDragging] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);

    const handleDrag = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === 'dragenter' || e.type === 'dragover') {
            setIsDragging(true);
        } else if (e.type === 'dragleave') {
            setIsDragging(false);
        }
    }, []);

    const handleDrop = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            const file = e.dataTransfer.files[0];
            setSelectedFile(file);
            onFileSelect(file); // Parent callback
        }
    }, [onFileSelect]);

    const handleChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setSelectedFile(file);
            onFileSelect(file);
        }
    };

    const removeFile = (e) => {
        e.stopPropagation();
        setSelectedFile(null);
        onFileSelect(null);
    }

    return (
        <div className="w-full max-w-md mx-auto">
            <div
                className={`
          relative group cursor-pointer
          flex flex-col items-center justify-center
          h-64 rounded-2xl border-2 border-dashed
          transition-all duration-300
          ${isDragging
                        ? 'border-[var(--accent-blue)] bg-[var(--accent-blue)]/10 scale-[1.02]'
                        : 'border-[var(--text-secondary)]/30 hover:border-[var(--accent-violet)] hover:bg-[var(--bg-secondary)]'
                    }
          ${selectedFile ? 'border-solid border-[var(--accent-teal)] bg-[var(--accent-teal)]/5' : ''}
        `}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                onClick={() => !selectedFile && document.getElementById('file-upload').click()}
            >
                <input
                    id="file-upload"
                    type="file"
                    className="hidden"
                    accept=".pdf,.doc,.docx"
                    onChange={handleChange}
                    disabled={!!selectedFile}
                />

                {selectedFile ? (
                    <div className="animate-fade-in flex flex-col items-center gap-4">
                        <div className="p-4 rounded-full bg-[var(--accent-teal)]/10 text-[var(--accent-teal)] ring-8 ring-[var(--accent-teal)]/5">
                            <FileText size={40} />
                        </div>
                        <div className="text-center">
                            <p className="font-semibold text-lg">{selectedFile.name}</p>
                            <p className="text-sm text-[var(--text-secondary)]">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                        </div>
                        <button
                            onClick={removeFile}
                            className="mt-2 px-4 py-2 text-sm text-[var(--text-secondary)] hover:text-red-400 flex items-center gap-2 transition-colors"
                        >
                            <X size={16} /> Remove File
                        </button>
                    </div>
                ) : (
                    <>
                        <div className="mb-4 p-4 rounded-full bg-[var(--bg-primary)] shadow-xl group-hover:scale-110 transition-transform duration-300">
                            <UploadCloud size={40} className="text-[var(--accent-blue)]" />
                        </div>
                        <p className="text-lg font-medium mb-2">Click or Drag Resume Here</p>
                        <p className="text-sm text-[var(--text-secondary)]">PDF, DOC, DOCX (Max 10MB)</p>
                    </>
                )}
            </div>
        </div>
    );
};

export default FileUpload;
