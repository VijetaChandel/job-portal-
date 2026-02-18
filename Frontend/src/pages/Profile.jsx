import React, { useState, useEffect } from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Phone, Code, Briefcase, Calendar, Download, ExternalLink, Loader2 } from 'lucide-react';
import axios from 'axios';

const Profile = () => {
    const { user } = useAuth();
    const [appliedJobs, setAppliedJobs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAppliedJobs = async () => {
            try {
                const res = await axios.get('/api/v1/application/get', {
                    withCredentials: true
                });
                if (res.data.success) {
                    setAppliedJobs(res.data.application || []);
                }
            } catch (error) {
                console.error("Error fetching applied jobs:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchAppliedJobs();
    }, []);

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    if (!user) return null;

    return (
        <div className="min-h-screen bg-gray-50/50 dark:bg-gray-950">
            <Navbar />

            <main className="pt-24 pb-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header/Info Card */}
                    <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden mb-8">
                        <div className="h-32 bg-gradient-to-r from-blue-600 to-indigo-600" />
                        <div className="px-8 pb-8">
                            <div className="relative flex flex-col md:flex-row items-end gap-6 -mt-12 mb-6">
                                <div className="w-32 h-32 bg-white dark:bg-gray-700 rounded-2xl shadow-lg border-4 border-white dark:border-gray-700 flex items-center justify-center text-4xl font-bold text-blue-600 overflow-hidden">
                                    {user.profile?.profilePhoto ? (
                                        <img src={user.profile.profilePhoto} alt="Profile" className="w-full h-full object-cover" />
                                    ) : (
                                        user.fullname?.charAt(0) || 'U'
                                    )}
                                </div>
                                <div className="flex-1 pb-2">
                                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{user.fullname}</h1>
                                    <p className="text-gray-500 dark:text-gray-400 font-medium">Job Seeker | {user.profile?.bio || 'Ready for new opportunities'}</p>
                                </div>
                                <div className="pb-2">
                                    <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-lg shadow-blue-200 transition-all active:scale-95">
                                        Edit Profile
                                    </button>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                <div className="space-y-4">
                                    <h3 className="text-sm font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Contact Details</h3>
                                    <div className="space-y-3">
                                        <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                                            <div className="w-8 h-8 rounded-lg bg-gray-50 dark:bg-gray-700 flex items-center justify-center">
                                                <Mail className="w-4 h-4 text-gray-400" />
                                            </div>
                                            <span>{user.email}</span>
                                        </div>
                                        <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                                            <div className="w-8 h-8 rounded-lg bg-gray-50 dark:bg-gray-700 flex items-center justify-center">
                                                <Phone className="w-4 h-4 text-gray-400" />
                                            </div>
                                            <span>{user.phoneNumber}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <h3 className="text-sm font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Skills</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {user.profile?.skills?.length > 0 ? (
                                            user.profile.skills.map((skill, index) => (
                                                <span key={index} className="px-3 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 text-sm font-medium rounded-lg border border-blue-100 dark:border-blue-800">
                                                    {skill}
                                                </span>
                                            ))
                                        ) : (
                                            <span className="text-gray-500 dark:text-gray-400 text-sm italic">No skills added yet</span>
                                        )}
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <h3 className="text-sm font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Resume</h3>
                                    {user.profile?.resume ? (
                                        <div className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-700 border border-gray-100 dark:border-gray-600 flex items-center justify-between">
                                            <div className="flex items-center gap-3 overflow-hidden">
                                                <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center flex-shrink-0">
                                                    <Download className="w-5 h-5 text-red-600" />
                                                </div>
                                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300 truncate">
                                                    {user.profile.resumeOriginalName || 'resume.pdf'}
                                                </span>
                                            </div>
                                            <a
                                                href={`http://localhost:8000/${user.profile.resume}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                                            >
                                                <ExternalLink className="w-5 h-5" />
                                            </a>
                                        </div>
                                    ) : (
                                        <p className="text-gray-500 dark:text-gray-400 text-sm italic">No resume uploaded</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Applied Jobs Section */}
                    <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
                        <div className="px-8 py-6 border-b border-gray-50 dark:border-gray-700 flex items-center justify-between">
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                                <Briefcase className="w-6 h-6 text-blue-600" />
                                Applied Jobs
                            </h2>
                            <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs font-bold rounded-full uppercase tracking-wider">
                                {appliedJobs.length} Applications
                            </span>
                        </div>

                        {loading ? (
                            <div className="p-12 text-center text-gray-500 dark:text-gray-400">
                                <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-500" />
                                Fetching your status...
                            </div>
                        ) : appliedJobs.length === 0 ? (
                            <div className="p-12 text-center">
                                <p className="text-gray-500 dark:text-gray-400 mb-4">You haven't applied for any jobs yet.</p>
                                <button onClick={() => window.location.href = '/jobs'} className="text-blue-600 font-semibold hover:underline">
                                    Browse jobs now
                                </button>
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead className="bg-gray-50/50 dark:bg-gray-700/50">
                                        <tr>
                                            <th className="px-8 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Company</th>
                                            <th className="px-8 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Job Role</th>
                                            <th className="px-8 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Applied Date</th>
                                            <th className="px-8 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider text-right">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-50 dark:divide-gray-700">
                                        {appliedJobs.map((app) => (
                                            <tr key={app._id} className="hover:bg-gray-50/50 dark:hover:bg-gray-700/50 transition-colors group">
                                                <td className="px-8 py-5">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center font-bold text-gray-400 font-bold group-hover:bg-blue-100 group-hover:text-blue-600 transition-colors">
                                                            {app.job?.company?.name?.charAt(0) || 'C'}
                                                        </div>
                                                        <span className="font-semibold text-gray-900 dark:text-white">{app.job?.company?.name || 'Company'}</span>
                                                    </div>
                                                </td>
                                                <td className="px-8 py-5 font-medium text-gray-700 dark:text-gray-300">{app.job?.title}</td>
                                                <td className="px-8 py-5">
                                                    <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-sm">
                                                        <Calendar className="w-4 h-4" />
                                                        {formatDate(app.createdAt)}
                                                    </div>
                                                </td>
                                                <td className="px-8 py-5 text-right">
                                                    <span className={`px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest ${app.status === 'accepted' ? 'bg-green-50 text-green-700 border border-green-100' :
                                                        app.status === 'rejected' ? 'bg-red-50 text-red-700 border border-red-100' :
                                                            'bg-yellow-50 text-yellow-700 border border-yellow-100'
                                                        }`}>
                                                        {app.status}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default Profile;
