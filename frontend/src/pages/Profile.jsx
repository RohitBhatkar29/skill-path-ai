import React, { useState, useEffect } from 'react';
import { User, Mail, MapPin, Globe, Loader, Camera, Edit2, Save, X, BrainCircuit } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const Profile = () => {
    const { user } = useAuth();
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        name: '',
        jobTitle: '',
        location: '',
        bio: ''
    });

    useEffect(() => {
        const fetchProfile = async () => {
            if (!user) return;
            try {
                const res = await axios.get(`http://localhost:5000/api/user/profile/${user.id}`);
                setProfile(res.data);
                setFormData({
                    name: res.data.name || '',
                    jobTitle: res.data.jobTitle || 'Career Explorer',
                    location: res.data.location || 'Remote',
                    bio: res.data.bio || 'Passionate learner on Skill Path AI.'
                });
            } catch (err) {
                console.error("Error fetching profile", err);
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [user]);

    const handleSave = async () => {
        try {
            const res = await axios.put(`http://localhost:5000/api/user/profile/${user.id}`, formData);
            setProfile({ ...profile, ...res.data });
            setIsEditing(false);
        } catch (err) {
            console.error("Error updating profile", err);
            alert("Failed to update profile");
        }
    };

    if (loading) return (
        <div className="flex justify-center items-center min-h-[60vh]">
            <div className="relative">
                <div className="w-16 h-16 border-4 border-mint-200 border-t-mint-600 rounded-full animate-spin"></div>
                <div className="absolute inset-0 flex items-center justify-center text-mint-600 font-bold text-xs">AI</div>
            </div>
        </div>
    );

    if (!profile) return <div className="text-center p-10 text-gray-500">User not found</div>;

    return (
        <div className="max-w-5xl mx-auto space-y-8 pb-10">
            {/* Hero Header with Glassmorphism */}
            <div className="relative rounded-3xl overflow-hidden bg-white shadow-xl shadow-mint-100 group">
                <div className="absolute top-0 left-0 w-full h-48 bg-gradient-to-br from-mint-600 via-mint-500 to-teal-600">
                    <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                </div>

                <div className="relative pt-24 px-8 pb-8 flex flex-col md:flex-row items-end gap-6 md:gap-10">
                    <div className="relative">
                        <div className="w-36 h-36 rounded-full border-[6px] border-white shadow-lg overflow-hidden bg-white flex items-center justify-center bg-gradient-to-br from-mint-50 to-mint-100 text-5xl font-bold text-mint-600 transform transition-transform group-hover:scale-105 duration-300">
                            {profile.name.charAt(0)}
                        </div>
                        <button className="absolute bottom-2 right-2 p-2 bg-gray-900/80 text-white rounded-full hover:bg-black transition-colors backdrop-blur-sm">
                            <Camera className="w-4 h-4" />
                        </button>
                    </div>

                    <div className="flex-1 text-center md:text-left mb-2">
                        <h1 className="text-4xl font-bold text-gray-900 tracking-tight">{profile.name}</h1>
                        <p className="text-lg text-gray-500 font-medium flex items-center justify-center md:justify-start gap-2 mt-1">
                            {formData.jobTitle}
                            <span className="w-1.5 h-1.5 rounded-full bg-mint-400"></span>
                            AI Enthusiast
                        </p>

                        <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-4 text-sm text-gray-500">
                            <span className="flex items-center gap-1.5 px-3 py-1 bg-gray-50 rounded-full border border-gray-100">
                                <MapPin className="w-4 h-4 text-mint-500" /> {formData.location}
                            </span>
                            <span className="flex items-center gap-1.5 px-3 py-1 bg-gray-50 rounded-full border border-gray-100">
                                <Globe className="w-4 h-4 text-mint-500" /> @{profile.name.replace(/\s+/g, '').toLowerCase()}
                            </span>
                        </div>
                    </div>

                    <button
                        onClick={() => setIsEditing(!isEditing)}
                        className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all shadow-md active:scale-95 ${isEditing
                                ? 'bg-red-50 text-red-600 hover:bg-red-100 border border-red-200'
                                : 'bg-white text-gray-700 hover:text-mint-700 hover:border-mint-200 border border-gray-200'
                            }`}
                    >
                        {isEditing ? <><X className="w-4 h-4" /> Cancel</> : <><Edit2 className="w-4 h-4" /> Edit Profile</>}
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Sidebar Info */}
                <div className="space-y-6">
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 h-fit sticky top-6">
                        <h3 className="font-bold text-gray-900 mb-6 flex items-center gap-2">
                            <User className="w-5 h-5 text-mint-600" />
                            Contact Information
                        </h3>
                        <div className="space-y-4">
                            <div className="group flex items-start gap-4 p-3 rounded-xl hover:bg-mint-50 transition-colors">
                                <div className="p-2 bg-gray-50 rounded-lg group-hover:bg-white transition-colors">
                                    <Mail className="w-5 h-5 text-gray-400 group-hover:text-mint-600" />
                                </div>
                                <div>
                                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Email Address</p>
                                    <p className="text-sm font-medium text-gray-700 break-all">{profile.email}</p>
                                </div>
                            </div>

                            <div className="group flex items-start gap-4 p-3 rounded-xl hover:bg-mint-50 transition-colors">
                                <div className="p-2 bg-gray-50 rounded-lg group-hover:bg-white transition-colors">
                                    <Globe className="w-5 h-5 text-gray-400 group-hover:text-mint-600" />
                                </div>
                                <div>
                                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Portfolio</p>
                                    <p className="text-sm font-medium text-mint-600 hover:underline cursor-pointer">
                                        skillpath.ai/{profile.name.replace(/\s+/g, '').toLowerCase()}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 pt-6 border-t border-gray-100">
                            <a href="/assessment" className="flex items-center justify-center gap-2 w-full py-2.5 bg-mint-50 text-mint-700 hover:bg-mint-100 rounded-xl font-semibold text-sm transition-colors border border-mint-100">
                                <BrainCircuit className="w-4 h-4" /> Update Skill Assessment
                            </a>
                        </div>

                        <div className="mt-8 pt-6 border-t border-gray-100">
                            <h3 className="font-bold text-gray-900 mb-4 text-sm uppercase tracking-wide">Top Skills</h3>
                            <div className="flex flex-wrap gap-2">
                                {profile.skills && profile.skills.length > 0 ? (
                                    profile.skills.map(skill => (
                                        <span key={skill} className="px-3 py-1.5 bg-mint-50 text-mint-700 border border-mint-100 rounded-lg text-sm font-medium shadow-sm">
                                            {skill}
                                        </span>
                                    ))
                                ) : (
                                    <span className="text-sm text-gray-400 italic">No skills added yet</span>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Edit Form / Details */}
                <div className="md:col-span-2 space-y-6">
                    <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                        <div className="flex items-center justify-between mb-8">
                            <h3 className="text-xl font-bold text-gray-900">Personal Details</h3>
                            {!isEditing && (
                                <span className="text-xs font-medium px-3 py-1 bg-green-100 text-green-700 rounded-full">
                                    • Active Now
                                </span>
                            )}
                        </div>

                        <div className="space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-gray-700">Display Name</label>
                                    <input
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        disabled={!isEditing}
                                        className={`w-full p-3 rounded-xl transition-all ${isEditing
                                                ? 'bg-white border-2 border-gray-200 focus:border-mint-500 focus:ring-4 focus:ring-mint-500/10 shadow-sm'
                                                : 'bg-gray-50 border-transparent text-gray-600'
                                            }`}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-gray-700">Current Role</label>
                                    <input
                                        type="text"
                                        value={formData.jobTitle}
                                        onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
                                        disabled={!isEditing}
                                        className={`w-full p-3 rounded-xl transition-all ${isEditing
                                                ? 'bg-white border-2 border-gray-200 focus:border-mint-500 focus:ring-4 focus:ring-mint-500/10 shadow-sm'
                                                : 'bg-gray-50 border-transparent text-gray-600'
                                            }`}
                                    />
                                </div>
                                <div className="space-y-2 md:col-span-2">
                                    <label className="text-sm font-semibold text-gray-700">Location</label>
                                    <div className="relative">
                                        <MapPin className={`absolute left-3 top-3.5 w-5 h-5 ${isEditing ? 'text-gray-400' : 'text-gray-400'} transition-opacity`} />
                                        <input
                                            type="text"
                                            value={formData.location}
                                            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                            disabled={!isEditing}
                                            className={`w-full p-3 pl-10 rounded-xl transition-all ${isEditing
                                                    ? 'bg-white border-2 border-gray-200 focus:border-mint-500 focus:ring-4 focus:ring-mint-500/10 shadow-sm'
                                                    : 'bg-gray-50 border-transparent text-gray-600'
                                                }`}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-700">About Me</label>
                                <textarea
                                    rows="5"
                                    value={formData.bio}
                                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                                    disabled={!isEditing}
                                    className={`w-full p-4 rounded-xl resize-none transition-all ${isEditing
                                            ? 'bg-white border-2 border-gray-200 focus:border-mint-500 focus:ring-4 focus:ring-mint-500/10 shadow-sm'
                                            : 'bg-gray-50 border-transparent text-gray-600 leading-relaxed'
                                        }`}
                                ></textarea>
                            </div>

                            {isEditing && (
                                <div className="flex justify-end pt-4 border-t border-gray-100 animate-in slide-in-from-bottom-2">
                                    <button
                                        onClick={handleSave}
                                        className="bg-mint-700 text-white px-8 py-3 rounded-xl font-bold hover:bg-mint-800 transition-all shadow-lg shadow-mint-200 flex items-center gap-2"
                                    >
                                        <Save className="w-4 h-4" /> Save Changes
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
