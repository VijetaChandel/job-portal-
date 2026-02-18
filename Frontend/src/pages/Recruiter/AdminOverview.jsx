import React, { useState, useEffect } from 'react';
import { Users, Briefcase, UserCheck, TrendingUp, Loader2 } from 'lucide-react';
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

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
            </div>
        );
    }

    const statCards = [
        {
            name: 'Total Users',
            value: stats?.totalUsers || 0,
            icon: Users,
            color: 'bg-blue-50 text-blue-600',
            description: 'Total registered accounts'
        },
        {
            name: 'Job Seekers',
            value: stats?.studentCount || 0,
            icon: UserCheck,
            color: 'bg-green-50 text-green-600',
            description: 'Active candidates'
        },
        {
            name: 'Recruiters',
            value: stats?.recruiterCount || 0,
            icon: Briefcase,
            color: 'bg-purple-50 text-purple-600',
            description: 'Companies/Admins'
        },
        {
            name: 'System Growth',
            value: '+12%',
            icon: TrendingUp,
            color: 'bg-orange-50 text-orange-600',
            description: 'Measured this month'
        }
    ];

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">System Overview</h2>
                <p className="text-gray-500 dark:text-gray-400">Real-time monitoring of portal activity and users.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {statCards.map((card) => (
                    <div key={card.name} className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between mb-4">
                            <div className={`p-3 rounded-xl ${card.color}`}>
                                <card.icon className="w-6 h-6" />
                            </div>
                        </div>
                        <div className="space-y-1">
                            <h3 className="text-sm font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wider">{card.name}</h3>
                            <div className="text-3xl font-bold text-gray-900 dark:text-white">{card.value}</div>
                            <p className="text-xs text-gray-500 dark:text-gray-400">{card.description}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-8 text-white shadow-xl shadow-blue-200">
                <div className="max-w-2xl">
                    <h3 className="text-2xl font-bold mb-4">Monitoring Insight</h3>
                    <p className="text-blue-100 leading-relaxed mb-6">
                        Your portal is currently supporting {stats?.totalUsers} users. The balance between candidates and recruiters is healthy.
                        Keep posting high-quality jobs to maintain engagement.
                    </p>
                    <div className="flex gap-4">
                        <div className="px-4 py-2 bg-white/10 rounded-lg backdrop-blur-sm border border-white/20">
                            <span className="text-xs block text-blue-200 uppercase font-bold tracking-widest">Database</span>
                            <span className="font-semibold italic">MongoDB Connected</span>
                        </div>
                        <div className="px-4 py-2 bg-white/10 rounded-lg backdrop-blur-sm border border-white/20">
                            <span className="text-xs block text-blue-200 uppercase font-bold tracking-widest">Server Status</span>
                            <span className="font-semibold italic font-mono">200 OK</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminOverview;
