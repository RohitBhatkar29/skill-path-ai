import React, { useState } from 'react';
import { Search, MapPin, Building, Briefcase, DollarSign } from 'lucide-react';

const Jobs = () => {
    const [activeTab, setActiveTab] = useState('recommended');

    const jobs = [
        {
            id: 1,
            role: 'Frontend Developer',
            company: 'TechFlow',
            location: 'Remote',
            salary: '$80k - $120k',
            type: 'Full-time',
            match: 95,
            skills: ['React', 'TypeScript', 'Tailwind'],
            logo: 'https://ui-avatars.com/api/?name=Tech+Flow&background=0D8ABC&color=fff'
        },
        {
            id: 2,
            role: 'Full Stack Engineer',
            company: 'Innovate AI',
            location: 'San Francisco, CA',
            salary: '$130k - $160k',
            type: 'Full-time',
            match: 88,
            skills: ['Node.js', 'React', 'MongoDB'],
            logo: 'https://ui-avatars.com/api/?name=Innovate+AI&background=6366f1&color=fff'
        },
        {
            id: 3,
            role: 'Junior Web Developer',
            company: 'StartUp Inc',
            location: 'New York, NY',
            salary: '$70k - $90k',
            type: 'Contract',
            match: 82,
            skills: ['HTML', 'CSS', 'JavaScript'],
            logo: 'https://ui-avatars.com/api/?name=Start+Up&background=10b981&color=fff'
        }
    ];

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-gray-800">Career Opportunities</h1>
                <button className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 text-sm font-medium">
                    Upload CV for Better Match
                </button>
            </div>

            {/* Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Filters Sidebar */}
                <div className="lg:col-span-3 space-y-6">
                    <div className="card space-y-4">
                        <h3 className="font-bold text-gray-800">Filters</h3>

                        <div>
                            <label className="text-sm font-medium text-gray-700 block mb-2">Job Type</label>
                            <div className="space-y-2">
                                {['Full-time', 'Part-time', 'Contract', 'Internship'].map(type => (
                                    <label key={type} className="flex items-center gap-2 text-sm text-gray-600">
                                        <input type="checkbox" className="rounded text-mint-600 focus:ring-mint-500" />
                                        {type}
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label className="text-sm font-medium text-gray-700 block mb-2">Experience</label>
                            <div className="space-y-2">
                                {['Entry Level', 'Mid Level', 'Senior'].map(level => (
                                    <label key={level} className="flex items-center gap-2 text-sm text-gray-600">
                                        <input type="checkbox" className="rounded text-mint-600 focus:ring-mint-500" />
                                        {level}
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Job List */}
                <div className="lg:col-span-9 space-y-6">
                    {/* Tabs */}
                    <div className="flex border-b border-gray-200">
                        {['recommended', 'saved', 'applied'].map(tab => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-6 py-3 font-medium text-sm capitalize transition-colors relative ${activeTab === tab ? 'text-mint-700' : 'text-gray-500 hover:text-gray-700'
                                    }`}
                            >
                                {tab}
                                {activeTab === tab && (
                                    <div className="absolute bottom-0 left-0 w-full h-0.5 bg-mint-700"></div>
                                )}
                            </button>
                        ))}
                    </div>

                    <div className="space-y-4">
                        {jobs.map(job => (
                            <div key={job.id} className="card p-6 flex flex-col md:flex-row gap-6 hover:border-mint-200 transition-colors">
                                <img src={job.logo} alt={job.company} className="w-16 h-16 rounded-xl shadow-sm" />

                                <div className="flex-1">
                                    <div className="flex justify-between items-start mb-1">
                                        <div>
                                            <h3 className="text-lg font-bold text-gray-800">{job.role}</h3>
                                            <div className="flex items-center gap-2 text-gray-500 text-sm mt-1">
                                                <Building className="w-4 h-4" />
                                                {job.company}
                                                <span className="mx-1">•</span>
                                                <MapPin className="w-4 h-4" />
                                                {job.location}
                                            </div>
                                        </div>
                                        <span className="bg-mint-50 text-mint-700 px-3 py-1 rounded-full text-xs font-bold ring-1 ring-mint-100">
                                            {job.match}% Match
                                        </span>
                                    </div>

                                    <div className="flex flex-wrap gap-4 my-4">
                                        <div className="flex items-center gap-1 text-sm text-gray-600 bg-gray-50 px-2 py-1 rounded">
                                            <DollarSign className="w-4 h-4" />
                                            {job.salary}
                                        </div>
                                        <div className="flex items-center gap-1 text-sm text-gray-600 bg-gray-50 px-2 py-1 rounded">
                                            <Briefcase className="w-4 h-4" />
                                            {job.type}
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-50">
                                        <div className="flex gap-2">
                                            {job.skills.map(skill => (
                                                <span key={skill} className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>
                                        <div className="flex gap-3">
                                            <button className="text-gray-400 hover:text-mint-600 font-medium text-sm transition-colors">
                                                Save
                                            </button>
                                            <button className="bg-mint-700 text-white px-6 py-2 rounded-lg font-medium text-sm hover:bg-mint-800 transition-colors shadow-sm shadow-mint-100">
                                                Apply Now
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Jobs;
