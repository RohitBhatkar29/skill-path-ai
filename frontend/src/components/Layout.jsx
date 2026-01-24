import React from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, BookOpen, Briefcase, FileText, User, LogOut, BrainCircuit } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Layout = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/landing');
    };

    const navItems = [
        { path: '/', icon: LayoutDashboard, label: 'Dashboard' },
        { path: '/courses', icon: BookOpen, label: 'Courses' },
        { path: '/jobs', icon: Briefcase, label: 'Jobs' },
        { path: '/resume', icon: FileText, label: 'Resume Analyzer' },
        { path: '/profile', icon: User, label: 'Profile' },
    ];

    return (
        <div className="flex h-screen bg-mint-50">
            {/* Sidebar */}
            <aside className="w-64 bg-white shadow-xl flex flex-col z-10 transition-all duration-300">
                <div className="p-6 flex items-center gap-3 border-b border-gray-100">
                    <div className="bg-mint-100 p-2 rounded-lg">
                        <BrainCircuit className="w-8 h-8 text-mint-700" />
                    </div>
                    <h1 className="text-xl font-bold text-mint-900 tracking-tight">Skill Path AI</h1>
                </div>

                <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${isActive
                                    ? 'bg-mint-700 text-white shadow-md shadow-mint-200'
                                    : 'text-gray-600 hover:bg-mint-50 hover:text-mint-700'
                                }`
                            }
                        >
                            <item.icon className="w-5 h-5" />
                            <span className="font-medium">{item.label}</span>
                        </NavLink>
                    ))}
                </nav>

                <div className="p-4 border-t border-gray-100">
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-red-500 hover:bg-red-50 transition-colors"
                    >
                        <LogOut className="w-5 h-5" />
                        <span className="font-medium">Sign Out</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto p-8 scroll-smooth">
                <div className="max-w-7xl mx-auto">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default Layout;
