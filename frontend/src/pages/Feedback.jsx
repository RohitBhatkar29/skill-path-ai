import React, { useState } from 'react';
import { Star, MessageSquare, Send } from 'lucide-react';

const Feedback = () => {
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);

    return (
        <div className="max-w-2xl mx-auto space-y-8">
            <div className="text-center">
                <h1 className="text-3xl font-bold text-gray-800">We Value Your Feedback</h1>
                <p className="text-gray-500 mt-2">Help us improve your learning experience</p>
            </div>

            <div className="card space-y-8 p-8">
                {/* Star Rating */}
                <div className="flex flex-col items-center gap-4">
                    <label className="font-medium text-gray-700">How would you rate your experience?</label>
                    <div className="flex gap-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <button
                                key={star}
                                className="focus:outline-none transition-transform hover:scale-110"
                                onClick={() => setRating(star)}
                                onMouseEnter={() => setHover(star)}
                                onMouseLeave={() => setHover(rating)}
                            >
                                <Star
                                    className={`w-10 h-10 ${star <= (hover || rating)
                                            ? 'fill-yellow-400 text-yellow-400'
                                            : 'text-gray-300'
                                        }`}
                                />
                            </button>
                        ))}
                    </div>
                    {rating > 0 && (
                        <span className="text-sm font-medium text-mint-700 animate-fade-in">
                            {rating === 5 ? '🎉 Amazing!' : rating >= 4 ? '😊 Thanks!' : '🙏 We will improve.'}
                        </span>
                    )}
                </div>

                {/* Form */}
                <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                            <select className="w-full p-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-mint-500 bg-white">
                                <option>General Feedback</option>
                                <option>Bug Report</option>
                                <option>Feature Request</option>
                                <option>Content Quality</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                            <input
                                type="text"
                                placeholder="Brief summary"
                                className="w-full p-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-mint-500"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                        <textarea
                            rows="4"
                            placeholder="Tell us what you think..."
                            className="w-full p-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-mint-500 resize-none"
                        ></textarea>
                    </div>

                    <button className="w-full bg-mint-700 text-white py-3 rounded-xl font-medium hover:bg-mint-800 transition-all shadow-lg shadow-mint-200 flex items-center justify-center gap-2 group">
                        <Send className="w-4 h-4 group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
                        Submit Feedback
                    </button>
                </form>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-center">
                <div className="bg-white p-4 rounded-xl border border-gray-100">
                    <p className="text-sm text-gray-500">Average Response Time</p>
                    <p className="font-bold text-mint-700">~ 24 Hours</p>
                </div>
                <div className="bg-white p-4 rounded-xl border border-gray-100">
                    <p className="text-sm text-gray-500">Direct Contact</p>
                    <p className="font-bold text-mint-700">support@skillpath.ai</p>
                </div>
            </div>
        </div>
    );
};

export default Feedback;
