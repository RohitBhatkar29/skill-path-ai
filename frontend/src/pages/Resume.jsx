import React, { useState } from 'react';
import { Upload, FileText, CheckCircle, XCircle, AlertCircle, ArrowRight } from 'lucide-react';

const Resume = () => {
    const [analyzing, setAnalyzing] = useState(false);
    const [analyzed, setAnalyzed] = useState(false);

    const handleDragOver = (e) => e.preventDefault();

    const handleDrop = (e) => {
        e.preventDefault();
        startAnalysis();
    };

    const startAnalysis = () => {
        setAnalyzing(true);
        setTimeout(() => {
            setAnalyzing(false);
            setAnalyzed(true);
        }, 2500);
    };

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">Resume Analyzer</h1>
                    <p className="text-gray-500 mt-2">Get AI-powered feedback to improve your ATS score</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Upload Section */}
                <div className="space-y-6">
                    <div
                        className={`border-2 border-dashed rounded-2xl p-10 text-center transition-all ${analyzing
                                ? 'border-mint-500 bg-mint-50'
                                : 'border-gray-300 hover:border-mint-400 hover:bg-gray-50'
                            }`}
                        onDragOver={handleDragOver}
                        onDrop={handleDrop}
                    >
                        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                            {analyzing ? (
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-mint-600"></div>
                            ) : (
                                <Upload className="w-8 h-8 text-mint-600" />
                            )}
                        </div>

                        <h3 className="text-xl font-bold text-gray-800 mb-2">
                            {analyzing ? 'Analyzing your resume...' : 'Upload your resume'}
                        </h3>
                        <p className="text-gray-500 mb-6 max-w-xs mx-auto">
                            Drag and drop your PDF or DOCX file here, or click to browse files
                        </p>

                        <button
                            onClick={startAnalysis}
                            disabled={analyzing}
                            className="px-6 py-2 bg-white border border-gray-200 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                        >
                            Browse Files
                        </button>
                    </div>

                    {/* Tips Card */}
                    <div className="bg-blue-50 border border-blue-100 rounded-xl p-6">
                        <div className="flex gap-3">
                            <AlertCircle className="w-6 h-6 text-blue-600 shrink-0" />
                            <div>
                                <h4 className="font-bold text-blue-800 mb-1">Pro Tip</h4>
                                <p className="text-sm text-blue-700 leading-relaxed">
                                    Tailor your resume for each job descriptions. Our AI can help identify missing keywords for specific roles.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Results Section */}
                <div className="space-y-6">
                    {analyzed ? (
                        <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-700">
                            {/* Score Card */}
                            <div className="card bg-gradient-to-br from-mint-50 to-white border-mint-100">
                                <div className="flex justify-between items-start mb-4">
                                    <h3 className="text-lg font-bold text-gray-800">ATS Compatibility Score</h3>
                                    <span className="bg-mint-100 text-mint-800 px-3 py-1 rounded-full text-xs font-bold">Good</span>
                                </div>

                                <div className="flex items-end gap-2 mb-2">
                                    <span className="text-4xl font-bold text-mint-700">78</span>
                                    <span className="text-gray-400 mb-1">/ 100</span>
                                </div>

                                <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                                    <div className="h-full bg-mint-500 rounded-full w-[78%]"></div>
                                </div>
                            </div>

                            {/* Feedback Points */}
                            <div className="card space-y-4">
                                <h3 className="font-bold text-gray-800 border-b border-gray-100 pb-2">Analysis Breakdown</h3>

                                <div className="flex gap-3 items-start">
                                    <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                                    <div>
                                        <h4 className="font-medium text-gray-800">Strong Action Verbs</h4>
                                        <p className="text-sm text-gray-500">You used 12 unique action verbs. Great job!</p>
                                    </div>
                                </div>

                                <div className="flex gap-3 items-start">
                                    <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                                    <div>
                                        <h4 className="font-medium text-gray-800">Contact Information</h4>
                                        <p className="text-sm text-gray-500">All essential contact details are present.</p>
                                    </div>
                                </div>

                                <div className="flex gap-3 items-start">
                                    <XCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                                    <div>
                                        <h4 className="font-medium text-gray-800">Missing Key Skills</h4>
                                        <p className="text-sm text-gray-500">Consider adding: <b>TypeScript, Redux, AWS</b></p>
                                    </div>
                                </div>
                            </div>

                            <button className="w-full bg-mint-700 text-white py-3 rounded-xl font-medium hover:bg-mint-800 transition-colors shadow-lg shadow-mint-200 flex items-center justify-center gap-2">
                                Download Optimized Resume
                                <ArrowRight className="w-4 h-4" />
                            </button>
                        </div>
                    ) : (
                        <div className="h-full flex flex-col items-center justify-center text-center p-8 border-2 border-dashed border-gray-200 rounded-2xl bg-gray-50/50">
                            <FileText className="w-16 h-16 text-gray-300 mb-4" />
                            <h3 className="text-lg font-bold text-gray-400">No results yet</h3>
                            <p className="text-gray-400 text-sm max-w-xs mx-auto mt-2">
                                Upload your resume to see the AI analysis results here.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Resume;
