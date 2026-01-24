import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ChevronRight, ChevronLeft, Briefcase, Code, GraduationCap, Target, User as UserIcon, Plus, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const steps = [
    { id: 1, title: 'Basic Info', icon: UserIcon },
    { id: 2, title: 'Skills', icon: Code },
    { id: 3, title: 'Interests', icon: Briefcase },
    { id: 4, title: 'Experience', icon: GraduationCap },
    { id: 5, title: 'Goals', icon: Target },
];

const Assessment = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const navigate = useNavigate();
    const { user, markAssessmentCompleted } = useAuth();

    // Validation Error State
    const [error, setError] = useState('');

    // Custom Input State
    const [customSkill, setCustomSkill] = useState('');
    const [isAddingSkill, setIsAddingSkill] = useState(false);
    const [customInterest, setCustomInterest] = useState('');
    const [isAddingInterest, setIsAddingInterest] = useState(false);

    const [formData, setFormData] = useState({
        education: '',
        selectedSkills: [],
        careerInterest: '',
        experienceLevel: '',
        goal: ''
    });

    const handleSubmit = async () => {
        try {
            const payload = {
                userId: user.id,
                education: formData.education,
                skills: formData.selectedSkills,
                interests: [formData.careerInterest],
                experienceLevel: formData.experienceLevel,
                goal: formData.goal
            };

            await axios.post('http://localhost:5000/api/assessment', payload);

            markAssessmentCompleted();
            navigate('/');
        } catch (err) {
            console.error("Assessment submit error", err);
            alert("Failed to save assessment. Please try again.");
        }
    };

    const validateStep = () => {
        setError('');
        switch (currentStep) {
            case 1:
                if (!formData.education) return "Please select your education level.";
                return null;
            case 2:
                if (formData.selectedSkills.length === 0) return "Please select at least one skill.";
                return null;
            case 3:
                if (!formData.careerInterest) return "Please select a career interest.";
                return null;
            case 4:
                if (!formData.experienceLevel) return "Please select your experience level.";
                return null;
            case 5:
                if (!formData.goal) return "Please select your primary goal.";
                return null;
            default: return null;
        }
    };

    const handleNext = () => {
        const validationError = validateStep();
        if (validationError) {
            setError(validationError);
            return;
        }

        if (currentStep < 5) setCurrentStep(c => c + 1);
        else handleSubmit();
    };

    const handleBack = () => {
        setError('');
        if (currentStep > 1) setCurrentStep(c => c - 1);
    };

    const addCustomSkill = () => {
        if (customSkill.trim() && !formData.selectedSkills.includes(customSkill.trim())) {
            setFormData({ ...formData, selectedSkills: [...formData.selectedSkills, customSkill.trim()] });
            setCustomSkill('');
            setIsAddingSkill(false);
        }
    };

    const addCustomInterest = () => {
        if (customInterest.trim()) {
            setFormData({ ...formData, careerInterest: customInterest.trim() });
            setCustomInterest('');
            setIsAddingInterest(false);
        }
    };

    const renderStepContent = () => {
        switch (currentStep) {
            case 1:
                return (
                    <div className="space-y-6">
                        <h2 className="text-2xl font-bold text-gray-800">Background Information</h2>
                        <div className="grid gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Current Education Level</label>
                                <select
                                    className="w-full p-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-mint-500 bg-white"
                                    value={formData.education}
                                    onChange={(e) => setFormData({ ...formData, education: e.target.value })}
                                >
                                    <option value="">Select Education</option>
                                    <option value="highschool">High School</option>
                                    <option value="undergrad">Undergraduate</option>
                                    <option value="postgrad">Postgraduate</option>
                                    <option value="working">Working Professional</option>
                                </select>
                            </div>
                        </div>
                    </div>
                );
            case 2:
                const skills = ["HTML", "CSS", "JavaScript", "React", "Node.js", "Python", "SQL", "AWS", "Docker", "Machine Learning"];
                return (
                    <div className="space-y-6">
                        <h2 className="text-2xl font-bold text-gray-800">Select Your Skills</h2>
                        <div className="flex flex-wrap gap-3">
                            {skills.map(skill => (
                                <button
                                    key={skill}
                                    onClick={() => {
                                        const newSkills = formData.selectedSkills.includes(skill)
                                            ? formData.selectedSkills.filter(s => s !== skill)
                                            : [...formData.selectedSkills, skill];
                                        setFormData({ ...formData, selectedSkills: newSkills });
                                    }}
                                    className={`px-4 py-2 rounded-full border transition-all ${formData.selectedSkills.includes(skill)
                                            ? 'bg-mint-100 border-mint-500 text-mint-800 font-medium'
                                            : 'bg-white border-gray-200 text-gray-600 hover:border-mint-300'
                                        }`}
                                >
                                    {skill}
                                </button>
                            ))}
                            {/* Render Custom Skills that aren't in default list */}
                            {formData.selectedSkills.filter(s => !skills.includes(s)).map(skill => (
                                <button
                                    key={skill}
                                    onClick={() => {
                                        const newSkills = formData.selectedSkills.filter(s => s !== skill);
                                        setFormData({ ...formData, selectedSkills: newSkills });
                                    }}
                                    className="px-4 py-2 rounded-full border bg-mint-100 border-mint-500 text-mint-800 font-medium flex items-center gap-1"
                                >
                                    {skill} <X className="w-3 h-3" />
                                </button>
                            ))}

                            {!isAddingSkill ? (
                                <button
                                    onClick={() => setIsAddingSkill(true)}
                                    className="px-4 py-2 rounded-full border border-dashed border-gray-300 text-gray-500 hover:border-mint-500 hover:text-mint-600 transition-all flex items-center gap-1"
                                >
                                    <Plus className="w-4 h-4" /> Other
                                </button>
                            ) : (
                                <div className="flex items-center gap-2 animate-in fade-in zoom-in duration-200">
                                    <input
                                        type="text"
                                        autoFocus
                                        value={customSkill}
                                        onChange={(e) => setCustomSkill(e.target.value)}
                                        onKeyPress={(e) => e.key === 'Enter' && addCustomSkill()}
                                        placeholder="Type skill..."
                                        className="px-4 py-2 rounded-full border border-mint-300 focus:outline-none focus:ring-2 focus:ring-mint-500 w-32"
                                    />
                                    <button onClick={addCustomSkill} className="p-2 bg-mint-600 text-white rounded-full hover:bg-mint-700">
                                        <Check className="w-4 h-4" />
                                    </button>
                                    <button onClick={() => setIsAddingSkill(false)} className="p-2 bg-gray-100 text-gray-500 rounded-full hover:bg-gray-200">
                                        <X className="w-4 h-4" />
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                );
            case 3:
                const roles = ["Full Stack Dev", "Data Scientist", "UI/UX Designer", "DevOps Engineer", "Product Manager"];
                return (
                    <div className="space-y-6">
                        <h2 className="text-2xl font-bold text-gray-800">Career Interests</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {roles.map(role => (
                                <div
                                    key={role}
                                    onClick={() => setFormData({ ...formData, careerInterest: role })}
                                    className={`p-4 border rounded-xl cursor-pointer transition-all flex items-center justify-between ${formData.careerInterest === role
                                            ? 'bg-mint-50 border-mint-500 ring-1 ring-mint-500'
                                            : 'hover:border-mint-200 hover:bg-gray-50'
                                        }`}
                                >
                                    <span className="font-medium text-gray-800">{role}</span>
                                    {formData.careerInterest === role && <Check className="w-5 h-5 text-mint-600" />}
                                </div>
                            ))}
                            {/* Render Custom Interest if selected and not in default list */}
                            {!roles.includes(formData.careerInterest) && formData.careerInterest && (
                                <div
                                    className="p-4 border rounded-xl cursor-pointer transition-all flex items-center justify-between bg-mint-50 border-mint-500 ring-1 ring-mint-500"
                                >
                                    <span className="font-medium text-gray-800">{formData.careerInterest}</span>
                                    <Check className="w-5 h-5 text-mint-600" />
                                </div>
                            )}

                            {!isAddingInterest ? (
                                <button
                                    onClick={() => setIsAddingInterest(true)}
                                    className="p-4 border border-dashed border-gray-300 rounded-xl text-gray-500 hover:border-mint-500 hover:text-mint-600 hover:bg-gray-50 transition-all flex items-center justify-center gap-2"
                                >
                                    <Plus className="w-5 h-5" /> Add Other Interest
                                </button>
                            ) : (
                                <div className="p-4 border rounded-xl flex items-center gap-3 animate-in fade-in slide-in-from-bottom-2">
                                    <input
                                        type="text"
                                        autoFocus
                                        value={customInterest}
                                        onChange={(e) => setCustomInterest(e.target.value)}
                                        onKeyPress={(e) => e.key === 'Enter' && addCustomInterest()}
                                        placeholder="Type custom role..."
                                        className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-mint-500"
                                    />
                                    <button onClick={addCustomInterest} className="px-4 py-2 bg-mint-600 text-white rounded-lg hover:bg-mint-700 text-sm font-medium">
                                        Add
                                    </button>
                                    <button onClick={() => setIsAddingInterest(false)} className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg">
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                );
            case 4:
                return (
                    <div className="space-y-6">
                        <h2 className="text-2xl font-bold text-gray-800">Experience Level</h2>
                        <div className="space-y-4">
                            {['Beginner', 'Intermediate', 'Advanced'].map(level => (
                                <label key={level} className="flex items-center gap-3 p-4 border border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50 transition-colors">
                                    <input
                                        type="radio"
                                        name="experience"
                                        className="w-5 h-5 text-mint-600 focus:ring-mint-500"
                                        checked={formData.experienceLevel === level}
                                        onChange={() => setFormData({ ...formData, experienceLevel: level })}
                                    />
                                    <span className="font-medium text-gray-700">{level}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                );
            case 5:
                return (
                    <div className="space-y-6">
                        <h2 className="text-2xl font-bold text-gray-800">Primary Goal</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {['Get a Job', 'Upskill', 'Career Switch', 'Internship'].map(goal => (
                                <div
                                    key={goal}
                                    onClick={() => setFormData({ ...formData, goal })}
                                    className={`p-6 border rounded-xl cursor-pointer text-center transition-all ${formData.goal === goal
                                            ? 'bg-mint-600 text-white border-mint-600 shadow-md transform scale-105'
                                            : 'hover:border-mint-200 hover:bg-gray-50 text-gray-600'
                                        }`}
                                >
                                    <span className="font-bold text-lg">{goal}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                );
            default: return null;
        }
    };

    return (
        <div className="max-w-4xl mx-auto py-10 px-4">
            {/* Progress Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-6">Skill Assessment</h1>
                <div className="relative flex justify-between">
                    <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-200 -z-10 -translate-y-1/2 rounded-full"></div>
                    <div
                        className="absolute top-1/2 left-0 h-1 bg-mint-500 -z-10 -translate-y-1/2 rounded-full transition-all duration-500"
                        style={{ width: `${((currentStep - 1) / 4) * 100}%` }}
                    ></div>

                    {steps.map((step) => {
                        const isActive = step.id <= currentStep;
                        const isCurrent = step.id === currentStep;
                        return (
                            <div key={step.id} className="flex flex-col items-center gap-2 bg-mint-50 px-2 rounded">
                                <div
                                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 border-2 ${isActive ? 'bg-mint-600 border-mint-600 text-white' : 'bg-white border-gray-300 text-gray-400'
                                        } ${isCurrent ? 'ring-4 ring-mint-200 scale-110' : ''}`}
                                >
                                    <step.icon className="w-5 h-5" />
                                </div>
                                <span className={`text-xs font-medium ${isActive ? 'text-mint-800' : 'text-gray-400'}`}>
                                    {step.title}
                                </span>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Error Message */}
            {error && (
                <div className="mb-4 bg-red-50 border border-red-100 text-red-600 px-4 py-3 rounded-xl flex items-center gap-2 animate-in slide-in-from-top-2">
                    <X className="w-5 h-5" />
                    {error}
                </div>
            )}

            {/* Wizard Content */}
            <div className="card min-h-[400px] flex flex-col justify-between">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentStep}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                        className="flex-1"
                    >
                        {renderStepContent()}
                    </motion.div>
                </AnimatePresence>

                <div className="flex justify-between mt-8 pt-6 border-t border-gray-100">
                    <button
                        onClick={handleBack}
                        disabled={currentStep === 1}
                        className={`px-6 py-2 rounded-xl font-medium flex items-center gap-2 transition-colors ${currentStep === 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-600 hover:bg-gray-100'
                            }`}
                    >
                        <ChevronLeft className="w-4 h-4" /> Back
                    </button>
                    <button
                        onClick={handleNext}
                        className="px-8 py-2 bg-mint-700 text-white rounded-xl font-medium hover:bg-mint-800 transition-all shadow-md shadow-mint-200 flex items-center gap-2"
                    >
                        {currentStep === 5 ? 'Finish Profile' : 'Next Step'}
                        <ChevronRight className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Assessment;
