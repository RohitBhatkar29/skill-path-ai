import React from 'react';
import { Trophy, Clock, BookOpen, Target } from 'lucide-react';

const StatCard = ({ icon: Icon, title, value, color }) => (
    <div className="card flex items-center gap-4">
        <div className={`p-3 rounded-full ${color}`}>
            <Icon className="w-6 h-6 text-white" />
        </div>
        <div>
            <p className="text-sm text-gray-500 font-medium">{title}</p>
            <h3 className="text-2xl font-bold text-gray-800">{value}</h3>
        </div>
    </div>
);

const Dashboard = () => {
    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">Welcome Back, Alex! 👋</h1>
                    <p className="text-gray-500 mt-1">Ready to level up your career today?</p>
                </div>
                <div className="bg-white px-4 py-2 rounded-lg shadow-sm text-sm font-medium text-mint-700 border border-mint-100">
                    Student Plan
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard icon={Trophy} title="Skill Score" value="850" color="bg-yellow-500" />
                <StatCard icon={BookOpen} title="Courses In Progress" value="3" color="bg-blue-500" />
                <StatCard icon={Clock} title="Study Hours" value="12.5" color="bg-mint-500" />
                <StatCard icon={Target} title="Goals Completed" value="8" color="bg-purple-500" />
            </div>

            {/* Main Content Areas */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Learning Progress */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="card">
                        <h2 className="text-xl font-bold text-gray-800 mb-4">Current Progress</h2>
                        <div className="space-y-4">
                            {['React Advanced Patterns', 'Node.js Microservices', 'SaaS Architecture'].map((course, i) => (
                                <div key={i} className="space-y-2">
                                    <div className="flex justify-between text-sm font-medium">
                                        <span>{course}</span>
                                        <span className="text-mint-700">{75 - i * 15}%</span>
                                    </div>
                                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-mint-500 rounded-full transition-all duration-500"
                                            style={{ width: `${75 - i * 15}%` }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* AI Recommendations */}
                <div className="space-y-6">
                    <div className="card bg-gradient-to-br from-mint-700 to-mint-900 text-white border-none">
                        <h2 className="text-xl font-bold mb-2">AI Insight 🤖</h2>
                        <p className="text-mint-100 text-sm leading-relaxed mb-4">
                            "Based on your recent progress in React, you're ready to tackle <b>Next.js</b>. It's in high demand for Full Stack roles!"
                        </p>
                        <button className="w-full py-2 bg-white text-mint-800 rounded-lg font-medium text-sm hover:bg-mint-50 transition-colors">
                            View Roadmap
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
