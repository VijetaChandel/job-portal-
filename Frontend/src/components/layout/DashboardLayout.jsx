import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Bell, Menu, User } from 'lucide-react';
import Sidebar from './Sidebar';
import { useAuth } from '../../context/AuthContext';

const DashboardLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const { user } = useAuth();

    return (
        <div className="flex h-screen bg-[#0f1419] overflow-hidden font-inter text-white relative">
            {/* Sidebar Component */}
            <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col overflow-hidden relative min-w-0">
                {/* Background Glows */}
                <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#00d9ff]/5 rounded-full blur-[140px] pointer-events-none"></div>
                <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#7c3aed]/5 rounded-full blur-[120px] pointer-events-none"></div>

                {/* Top Navigation Bar */}
                <header className="h-20 border-b border-white/5 flex items-center justify-between px-4 sm:px-10 relative z-40 bg-[#0f1419]/50 backdrop-blur-md shrink-0">
                    <div className="flex items-center gap-4">
                        {/* Hamburger Menu Mobile */}
                        <button 
                            onClick={() => setIsSidebarOpen(true)}
                            className="lg:hidden p-2 rounded-xl bg-white/5 border border-white/10 text-[#a0aec0] hover:text-white transition-all active:scale-95"
                        >
                            <Menu className="w-6 h-6" />
                        </button>
                        
                        <h2 className="text-sm sm:text-lg font-bold text-[#a0aec0] truncate">
                            Workspace / <span className="text-white">Admin Dashboard</span>
                        </h2>
                    </div>

                    <div className="flex items-center gap-3 sm:gap-6">
                        <button className="relative w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#a0aec0] hover:text-white transition-all hidden sm:flex">
                            <Bell className="w-5 h-5" />
                            <span className="absolute top-2 right-2 w-2 h-2 bg-[#ec4899] rounded-full border-2 border-[#0f1419]"></span>
                        </button>
                        
                        {/* Mobile User Avatar Toggle */}
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00d9ff] to-[#7c3aed] flex items-center justify-center p-0.5 sm:hidden">
                            <div className="w-full h-full rounded-[10px] bg-[#0f1419] flex items-center justify-center overflow-hidden">
                                {user?.profile?.profilePhoto ? (
                                    <img src={user.profile.profilePhoto} alt="User" className="w-full h-full object-cover" />
                                ) : (
                                    <User className="w-5 h-5 text-white" />
                                )}
                            </div>
                        </div>
                    </div>
                </header>

                {/* Scrollable Content Viewport */}
                <main className="flex-1 overflow-y-auto p-4 sm:p-10 relative z-10 custom-scrollbar overflow-x-hidden">
                    <div className="max-w-[1400px] mx-auto animate-fade-in-up">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;
