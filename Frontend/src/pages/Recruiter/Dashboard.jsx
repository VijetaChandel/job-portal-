import React from 'react';
import { NavLink, Outlet, useNavigate, Link } from 'react-router-dom';
import { LayoutDashboard, PlusCircle, Briefcase, Settings, LogOut, Sparkles, User, Bell } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Dashboard = () => {
    const navigate = useNavigate();
    const { logout, user } = useAuth();

    const navItems = [
        { name: 'Overview', path: '/recruiter/dashboard', icon: LayoutDashboard },
        { name: 'Post a Job', path: '/recruiter/post-job', icon: PlusCircle },
        { name: 'My Jobs', path: '/recruiter/my-jobs', icon: Briefcase },
        { name: 'Settings', path: '/recruiter/settings', icon: Settings },
    ];

    const handleLogout = async () => {
        await logout();
        navigate('/');
    };

    return (
        <div className="flex h-screen bg-[#0f1419] overflow-hidden font-inter text-white">
            {/* Sidebar */}
            <aside className="w-72 bg-white/[0.02] backdrop-blur-2xl border-r border-white/5 flex flex-col relative z-20">
                <div className="p-8 mb-4">
                    <Link to="/" className="flex items-center gap-3 group">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00d9ff] to-[#7c3aed] flex items-center justify-center shadow-lg shadow-[#00d9ff]/20 group-hover:scale-110 transition-transform">
                            <Sparkles className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-2xl font-black tracking-tighter">
                            JOB<span className="gradient-text">PORTAL</span>
                        </span>
                    </Link>
                </div>

                <div className="px-6 mb-8">
                    <div className="p-4 rounded-2xl bg-white/5 border border-white/5 flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center border border-white/10 overflow-hidden">
                            {user?.profile?.profilePhoto ? (
                                <img src={user.profile.profilePhoto} alt="Profile" className="w-full h-full object-cover" />
                            ) : (
                                <User className="w-5 h-5 text-[#a0aec0]" />
                            )}
                        </div>
                        <div className="overflow-hidden">
                            <p className="text-sm font-bold truncate">{user?.fullname || 'Admin User'}</p>
                            <p className="text-[10px] text-[#a0aec0] font-bold uppercase tracking-widest">Recruiter</p>
                        </div>
                    </div>
                </div>

                <nav className="flex-1 px-4 space-y-2 overflow-y-auto custom-scrollbar">
                    <p className="px-4 text-[10px] font-bold text-[#a0aec0] uppercase tracking-[0.2em] mb-4">Main Menu</p>
                    {navItems.map((item) => (
                        <NavLink
                            key={item.name}
                            to={item.path}
                            end={item.path === '/recruiter/dashboard'}
                            className={({ isActive }) =>
                                `flex items-center px-4 py-3.5 rounded-xl transition-all group relative overflow-hidden ${
                                    isActive
                                        ? 'text-white'
                                        : 'text-[#a0aec0] hover:text-white hover:bg-white/5'
                                }`
                            }
                        >
                            {({ isActive }) => (
                                <>
                                    {isActive && (
                                        <div className="absolute inset-0 bg-gradient-to-r from-[#00d9ff]/10 to-[#7c3aed]/10 border-r-2 border-[#00d9ff]"></div>
                                    )}
                                    <item.icon className={`w-5 h-5 mr-3 transition-colors ${isActive ? 'text-[#00d9ff]' : 'group-hover:text-white'}`} />
                                    <span className="text-sm font-bold">{item.name}</span>
                                </>
                            )}
                        </NavLink>
                    ))}
                </nav>

                <div className="p-4 border-t border-white/5">
                    <button
                        onClick={handleLogout}
                        className="flex items-center px-4 py-4 w-full text-[#a0aec0] hover:text-white hover:bg-red-500/10 rounded-xl transition-all group"
                    >
                        <LogOut className="w-5 h-5 mr-3 group-hover:text-red-400" />
                        <span className="text-sm font-bold">Logout Session</span>
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col overflow-hidden relative">
                {/* Background Glow */}
                <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#00d9ff]/5 rounded-full blur-[140px] pointer-events-none"></div>

                {/* Top Header */}
                <header className="h-20 border-b border-white/5 flex items-center justify-between px-10 relative z-10 bg-[#0f1419]/50 backdrop-blur-md">
                    <h2 className="text-lg font-bold text-[#a0aec0]">
                        Workspace / <span className="text-white">Admin Dashboard</span>
                    </h2>
                    <div className="flex items-center gap-6">
                        <button className="relative w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#a0aec0] hover:text-white transition-all">
                            <Bell className="w-5 h-5" />
                            <span className="absolute top-2 right-2 w-2 h-2 bg-[#ec4899] rounded-full border-2 border-[#0f1419]"></span>
                        </button>
                    </div>
                </header>

                {/* Content Viewport */}
                <main className="flex-1 overflow-y-auto p-10 relative z-10 custom-scrollbar">
                    <div className="animate-fade-in">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Dashboard;
