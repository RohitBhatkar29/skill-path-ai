import React, { useState } from 'react';
import { Search, Filter, BookOpen, Star, Clock, BarChart } from 'lucide-react';

const Courses = () => {
    const [filter, setFilter] = useState('All');

    const courses = [
        {
            id: 1,
            title: 'Advanced React Patterns',
            provider: 'Frontend Masters',
            level: 'Advanced',
            duration: '6h 30m',
            rating: 4.8,
            tags: ['React', 'Web Dev'],
            image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'
        },
        {
            id: 2,
            title: 'Node.js Microservices',
            provider: 'Udemy',
            level: 'Intermediate',
            duration: '12h',
            rating: 4.6,
            tags: ['Node.js', 'Backend'],
            image: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'
        },
        {
            id: 3,
            title: 'Machine Learning A-Z',
            provider: 'Coursera',
            level: 'Beginner',
            duration: '40h',
            rating: 4.9,
            tags: ['Python', 'ML'],
            image: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'
        }
    ];

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">Recommended Courses</h1>
                    <p className="text-gray-500 mt-2">AI-curated learning path based on your goals</p>
                </div>

                <div className="flex gap-3">
                    <div className="relative">
                        <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search courses..."
                            className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-mint-500 w-64"
                        />
                    </div>
                    <button className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-600">
                        <Filter className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* Filter Tabs */}
            <div className="flex gap-4 border-b border-gray-100 pb-1">
                {['All', 'Web Dev', 'Data Science', 'Cloud'].map(tab => (
                    <button
                        key={tab}
                        onClick={() => setFilter(tab)}
                        className={`pb-3 px-2 font-medium transition-all ${filter === tab
                                ? 'text-mint-700 border-b-2 border-mint-700'
                                : 'text-gray-500 hover:text-gray-700'
                            }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* Course Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses.map(course => (
                    <div key={course.id} className="card p-0 overflow-hidden group hover:-translate-y-1 transition-transform duration-300">
                        <div className="h-48 overflow-hidden relative">
                            <img
                                src={course.image}
                                alt={course.title}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                            <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-bold text-mint-800 shadow-sm">
                                98% Match
                            </div>
                        </div>

                        <div className="p-6">
                            <div className="flex justify-between items-start mb-2">
                                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">{course.provider}</span>
                                <div className="flex items-center gap-1 text-yellow-500 text-sm font-bold">
                                    <Star className="w-4 h-4 fill-current" />
                                    {course.rating}
                                </div>
                            </div>

                            <h3 className="text-lg font-bold text-gray-800 mb-2 leading-tight group-hover:text-mint-700 transition-colors">
                                {course.title}
                            </h3>

                            <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                                <div className="flex items-center gap-1">
                                    <BarChart className="w-4 h-4" />
                                    {course.level}
                                </div>
                                <div className="flex items-center gap-1">
                                    <Clock className="w-4 h-4" />
                                    {course.duration}
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-2 mb-6">
                                {course.tags.map(tag => (
                                    <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs font-medium">
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            <div className="flex gap-3">
                                <button className="flex-1 bg-mint-700 text-white py-2 rounded-lg font-medium hover:bg-mint-800 transition-colors">
                                    View Course
                                </button>
                                <button className="p-2 border border-gray-200 rounded-lg hover:border-mint-500 hover:text-mint-600 transition-colors">
                                    <BookOpen className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Courses;
