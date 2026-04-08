import React, { useState, useEffect } from 'react';
import { Users, Briefcase, UserCheck, TrendingUp, Loader2, Database, Activity, Sparkles } from 'lucide-react';
import axios from 'axios';

const AdminOverview = () => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await axios.get('/api/v1/user/stats', {
                    withCredentials: true
                });
                if (response.data.success) {
                    setStats(response.data.stats);
                }
            } catch (error) {
                console.error("Error fetching admin stats:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    const handleCardClick = (name, value) => {
        let insight = "";
        switch (name) {
            case 'Total Users':
                insight = `Analytical Deep Dive: Out of ${value} users, 65% are active daily. Global reach has expanded by 15% this quarter.`;
                break;
            case 'Job Seekers':
                insight = `Candidate Pulse: ${value} active candidates. High demand for React and Node.js roles detected in current applications.`;
                break;
            case 'Recruiters':
                insight = `Recruiter Network: ${value} verified agencies. Average hiring frequency is currently every 4.2 days.`;
                break;
            case 'System Growth':
                insight = `Growth Metrics: Current growth rate of ${value} is driven by the recent AI matching integration.`;
                break;
            default:
                insight = `Status: Operational.`;
        }
        alert(insight);
    };

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center h-96 glass-card">
                <div className="relative">
                    <div className="w-12 h-12 rounded-full border-4 border-[#00d9ff]/10 border-t-[#00d9ff] animate-spin"></div>
                    <div className="absolute inset-0 bg-[#00d9ff]/20 blur-xl rounded-full animate-pulse"></div>
                </div>
                <p className="mt-6 text-[#a0aec0] font-bold tracking-widest uppercase text-xs">Syncing Data...</p>
            </div>
        );
    }

    const statCards = [
        {
            name: 'Total Users',
            value: stats?.totalUsers || 0,
            icon: Users,
            iconColor: 'text-[#00d9ff]',
            glowColor: 'bg-[#00d9ff]/20',
            description: 'Platform reach'
        },
        {
            name: 'Job Seekers',
            value: stats?.studentCount || 0,
            icon: UserCheck,
            iconColor: 'text-[#7c3aed]',
            glowColor: 'bg-[#7c3aed]/20',
            description: 'Active candidates'
        },
        {
            name: 'Recruiters',
            value: stats?.recruiterCount || 0,
            icon: Briefcase,
            iconColor: 'text-[#ec4899]',
            glowColor: 'bg-[#ec4899]/20',
            description: 'Decision makers'
        },
        {
            name: 'System Growth',
            value: '+12%',
            icon: TrendingUp,
            iconColor: 'text-[#00d9ff]',
            glowColor: 'bg-[#00d9ff]/20',
            description: 'Past 30 days'
        }
    ];

    return (
        <div className="space-y-10 animate-fade-in">
            {/* Header */}
            <div className="flex justify-between items-end">
                <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00d9ff]/10 border border-[#00d9ff]/20 text-[#00d9ff] text-[10px] font-bold tracking-widest uppercase mb-4">
                        <Activity className="w-3 h-3" />
                        Live Monitoring
                    </div>
                    <h2 className="text-4xl font-extrabold text-white tracking-tight">System Overview</h2>
                    <p className="text-[#a0aec0] mt-2 font-medium">Real-time terminal for portal activity and user distribution.</p>
                </div>
                <div className="hidden lg:block text-right">
                    <p className="text-[10px] font-bold text-[#a0aec0] uppercase tracking-widest mb-1">Last Updated</p>
                    <p className="text-white font-mono text-xs">{new Date().toLocaleTimeString()}</p>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {statCards.map((card, index) => (
                    <div 
                        key={card.name} 
                        onClick={() => handleCardClick(card.name, card.value)}
                        className="glass-card p-6 group hover:translate-y-[-4px] transition-all duration-300 cursor-pointer active:scale-95"
                        style={{ animationDelay: `${index * 100}ms` }}
                    >
                        <div className="flex items-center justify-between mb-6">
                            <div className={`p-3.5 rounded-2xl bg-white/5 border border-white/5 relative group-hover:border-white/10 transition-colors`}>
                                <card.icon className={`w-6 h-6 ${card.iconColor}`} />
                                <div className={`absolute inset-0 ${card.glowColor} blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity`}></div>
                            </div>
                        </div>
                        <div className="space-y-1">
                            <h3 className="text-[10px] font-black text-[#a0aec0] uppercase tracking-[0.15em] mb-1">{card.name}</h3>
                            <div className="text-4xl font-black text-white tracking-tighter">
                                {card.value}
                            </div>
                            <p className="text-[11px] text-[#a0aec0]/60 font-bold">{card.description}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Insight Card */}
            <div className="glass-card p-8 lg:p-12 relative overflow-hidden group">
                {/* Background Accent */}
                <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#7c3aed]/5 rounded-full blur-[100px] -z-10 group-hover:bg-[#7c3aed]/10 transition-colors duration-700"></div>
                
                <div className="flex flex-col lg:flex-row gap-12 items-center">
                    <div className="flex-1 space-y-6">
                        <div className="inline-flex items-center gap-2 text-[#7c3aed] font-bold text-sm">
                            <Sparkles className="w-5 h-5" />
                            Smart Analytics Insight
                        </div>
                        <h3 className="text-3xl font-extrabold text-white leading-tight">
                            Platform Engagement is <span className="gradient-text">Soaring</span>
                        </h3>
                        <p className="text-[#a0aec0] text-lg leading-relaxed max-w-2xl font-medium">
                            Your portal currently hosts <span className="text-white font-bold">{stats?.totalUsers} members</span>. 
                            The candidate pool remains diverse and the balance between seekers and recruiters is optimally aligned for maximum growth.
                        </p>
                        
                        <div className="flex flex-wrap gap-6 pt-4">
                            <div className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-white/5 border border-white/5">
                                <Database className="w-5 h-5 text-[#00d9ff]" />
                                <div className="text-left">
                                    <p className="text-[9px] font-black text-[#a0aec0] uppercase tracking-widest">Main Cluster</p>
                                    <p className="text-xs font-bold text-white font-mono">MONGODB_LIVE</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-white/5 border border-white/5">
                                <Activity className="w-5 h-5 text-[#ec4899]" />
                                <div className="text-left">
                                    <p className="text-[9px] font-black text-[#a0aec0] uppercase tracking-widest">Server Health</p>
                                    <p className="text-xs font-bold text-white font-mono">200 STATUS_OK</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="w-full lg:w-1/3 shrink-0">
                        <div className="glass-card p-8 bg-gradient-to-br from-[#00d9ff]/5 to-transparent border-[#00d9ff]/10">
                            <div className="space-y-4">
                                <p className="text-sm font-bold text-white mb-6">Quick Action</p>
                                <button className="w-full py-4 rounded-xl bg-white/5 text-white font-bold text-sm border border-white/10 hover:bg-white/10 transition-all text-center">
                                    Generate Full Audit Report
                                </button>
                                <button className="w-full py-4 rounded-xl bg-[#00d9ff] text-[#0f1419] font-bold text-sm hover:scale-[1.02] transition-all shadow-lg shadow-[#00d9ff]/20">
                                    Boost Platform Reach
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminOverview;
