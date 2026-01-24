import React from 'react';
import { ArrowRight, CheckCircle, Brain, Target, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
    return (
        <div className="min-h-screen bg-white">
            {/* Navigation */}
            <nav className="flex justify-between items-center p-6 max-w-7xl mx-auto">
                <div className="flex items-center gap-2">
                    <div className="bg-mint-100 p-2 rounded-lg">
                        <Brain className="w-6 h-6 text-mint-700" />
                    </div>
                    <span className="text-xl font-bold text-gray-800">Skill Path AI</span>
                </div>
                <div className="flex gap-4">
                    <Link to="/login" className="px-4 py-2 text-gray-600 hover:text-mint-700 font-medium">Log In</Link>
                    <Link to="/signup" className="px-6 py-2 bg-mint-700 text-white rounded-full font-medium hover:bg-mint-800 transition-colors">
                        Get Started
                    </Link>
                </div>
            </nav>

            {/* Hero Section */}
            <div className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-8 animate-in slide-in-from-left-10 duration-700">
                    <div className="inline-block px-4 py-1.5 bg-mint-50 text-mint-700 rounded-full text-sm font-semibold tracking-wide border border-mint-100">
                        🚀 AI-Powered Career Guidance
                    </div>
                    <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
                        Design Your <span className="text-mint-600">Dream Career</span> with AI
                    </h1>
                    <p className="text-xl text-gray-500 max-w-lg">
                        Personalized learning paths, job matching, and resume analysis tailored to your unique skills and goals.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <Link to="/signup" className="px-8 py-4 bg-mint-700 text-white rounded-xl font-bold text-lg hover:bg-mint-800 transition-all shadow-lg shadow-mint-200 flex items-center justify-center gap-2">
                            Start Your Journey <ArrowRight className="w-5 h-5" />
                        </Link>
                        <button className="px-8 py-4 bg-white border border-gray-200 text-gray-700 rounded-xl font-bold text-lg hover:bg-gray-50 transition-colors">
                            How It Works
                        </button>
                    </div>

                    <div className="flex items-center gap-6 pt-4 text-sm text-gray-500">
                        <div className="flex items-center gap-2">
                            <CheckCircle className="w-5 h-5 text-mint-500" /> 10k+ Courses
                        </div>
                        <div className="flex items-center gap-2">
                            <CheckCircle className="w-5 h-5 text-mint-500" /> AI Resume Review
                        </div>
                        <div className="flex items-center gap-2">
                            <CheckCircle className="w-5 h-5 text-mint-500" /> Smart Job Match
                        </div>
                    </div>
                </div>

                <div className="relative animate-in slide-in-from-right-10 duration-700">
                    <div className="absolute inset-0 bg-mint-200 rounded-full filter blur-3xl opacity-30 transform translate-x-10 translate-y-10"></div>
                    <img
                        src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1471&q=80"
                        alt="Students learning"
                        className="relative rounded-2xl shadow-2xl border-4 border-white z-10"
                    />
                    {/* Floating Cards */}
                    <div className="absolute -bottom-10 -left-10 bg-white p-4 rounded-xl shadow-xl z-20 flex items-center gap-3 animate-bounce-slow">
                        <div className="bg-yellow-100 p-2 rounded-lg">
                            <Target className="w-6 h-6 text-yellow-600" />
                        </div>
                        <div>
                            <p className="text-xs text-gray-500 font-bold">Goal Reached</p>
                            <p className="text-sm font-bold text-gray-800">Senior Developer</p>
                        </div>
                    </div>
                    <div className="absolute -top-10 -right-5 bg-white p-4 rounded-xl shadow-xl z-20 flex items-center gap-3 animate-bounce-slow delay-100">
                        <div className="bg-green-100 p-2 rounded-lg">
                            <TrendingUp className="w-6 h-6 text-green-600" />
                        </div>
                        <div>
                            <p className="text-xs text-gray-500 font-bold">Skill Growth</p>
                            <p className="text-sm font-bold text-gray-800">+45% this month</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;
