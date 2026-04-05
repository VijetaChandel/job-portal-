import React, { useState, useEffect } from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Phone, Code, Briefcase, Calendar, Download, ExternalLink, Loader2, Sparkles, ShieldCheck, MapPin, Target, CheckCircle, Clock, XCircle } from 'lucide-react';
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
        <div className="min-h-screen bg-[#0f1419] text-[#f1f5f9] font-sans selection:bg-[#00d9ff]/30">
            <Navbar />

            <main className="pt-32 pb-24 px-6">
                <div className="max-w-[1400px] mx-auto space-y-10 animate-fade-in">
                    {/* Header/Info Card */}
                    <div className="glass-card overflow-hidden group">
                        <div className="h-48 bg-gradient-to-r from-[#00d9ff] via-[#7c3aed] to-[#ec4899] opacity-20 group-hover:opacity-30 transition-opacity duration-700" />
                        <div className="px-10 pb-10">
                            <div className="relative flex flex-col lg:flex-row items-end gap-8 -mt-20 mb-12">
                                <div className="w-40 h-40 bg-[#0f1419] rounded-[2.5rem] border-[6px] border-[#0f1419] shadow-2xl overflow-hidden relative group/avatar">
                                    {user.profile?.profilePhoto ? (
                                        <img src={user.profile.profilePhoto} alt="Profile" className="w-full h-full object-cover group-hover/avatar:scale-110 transition-transform duration-500" />
                                    ) : (
                                        <div className="w-full h-full bg-gradient-to-br from-[#00d9ff]/20 to-[#7c3aed]/20 flex items-center justify-center text-5xl font-black text-white">
                                            {user.fullname?.charAt(0)}
                                        </div>
                                    )}
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/avatar:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
                                        <Sparkles className="w-8 h-8 text-white animate-pulse" />
                                    </div>
                                </div>
                                <div className="flex-1 pb-2">
                                    <div className="flex items-center gap-3 mb-2">
                                        <h1 className="text-4xl lg:text-5xl font-black text-white tracking-tight">{user.fullname}</h1>
                                        <ShieldCheck className="w-6 h-6 text-[#00d9ff]" />
                                    </div>
                                    <p className="text-[#a0aec0] text-xl font-medium tracking-tight">
                                        Elite Talent | <span className="text-white/80">{user.profile?.bio || 'Strategic Professional eyeing future zenith.'}</span>
                                    </p>
                                </div>
                                <div className="pb-2">
                                    <button className="btn-primary px-8 py-4 font-black tracking-widest uppercase text-xs shadow-xl shadow-[#00d9ff]/20">
                                        Refine Profile
                                    </button>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                                <div className="space-y-6">
                                    <h3 className="text-[10px] font-black text-[#a0aec0] uppercase tracking-widest flex items-center gap-2">
                                        <Target className="w-3 h-3" /> Communication Vectors
                                    </h3>
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-4 group/item">
                                            <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover/item:border-[#00d9ff]/50 transition-colors">
                                                <Mail className="w-4 h-4 text-[#00d9ff]" />
                                            </div>
                                            <span className="text-sm font-bold text-[#f1f5f9] tracking-tight">{user.email}</span>
                                        </div>
                                        <div className="flex items-center gap-4 group/item">
                                            <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover/item:border-[#00d9ff]/50 transition-colors">
                                                <Phone className="w-4 h-4 text-[#00d9ff]" />
                                            </div>
                                            <span className="text-sm font-bold text-[#f1f5f9] tracking-tight">{user.phoneNumber}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <h3 className="text-[10px] font-black text-[#a0aec0] uppercase tracking-widest flex items-center gap-2">
                                        <Code className="w-3 h-3" /> Technical Arsenal
                                    </h3>
                                    <div className="flex flex-wrap gap-3">
                                        {user.profile?.skills?.length > 0 ? (
                                            user.profile.skills.map((skill, index) => (
                                                <span key={index} className="px-4 py-2 bg-[#00d9ff]/5 text-[#00d9ff] text-[10px] font-black uppercase tracking-widest rounded-xl border border-[#00d9ff]/20 hover:bg-[#00d9ff]/10 transition-colors cursor-default">
                                                    {skill}
                                                </span>
                                            ))
                                        ) : (
                                            <span className="text-[#a0aec0] text-sm italic font-medium">Arsenal is currently empty.</span>
                                        )}
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <h3 className="text-[10px] font-black text-[#a0aec0] uppercase tracking-widest flex items-center gap-2">
                                        <Briefcase className="w-3 h-3" /> Credentials Case
                                    </h3>
                                    {user.profile?.resume ? (
                                        <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center justify-between group/resume hover:border-[#ec4899]/30 transition-all">
                                            <div className="flex items-center gap-4 overflow-hidden">
                                                <div className="w-12 h-12 rounded-xl bg-[#ec4899]/10 flex items-center justify-center shrink-0">
                                                    <Download className="w-5 h-5 text-[#ec4899]" />
                                                </div>
                                                <div className="overflow-hidden">
                                                    <p className="text-xs font-black text-white uppercase tracking-widest truncate">{user.profile.resumeOriginalName || 'CURRICULUM_VITAE.PDF'}</p>
                                                    <p className="text-[10px] font-bold text-[#a0aec0] uppercase tracking-tighter mt-0.5">Verified Asset</p>
                                                </div>
                                            </div>
                                            <a
                                                href={`http://localhost:8000/${user.profile.resume}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="p-3 bg-white/5 rounded-xl hover:bg-white/10 text-white transition-colors"
                                            >
                                                <ExternalLink className="w-5 h-5" />
                                            </a>
                                        </div>
                                    ) : (
                                        <p className="text-[#ec4899] text-sm italic font-bold tracking-tight">No credentials uploaded for verification.</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Applied Jobs Section */}
                    <div className="glass-card overflow-hidden">
                        <div className="px-10 py-8 border-b border-white/5 bg-white/[0.02] flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-xl bg-[#7c3aed]/10 border border-[#7c3aed]/20 flex items-center justify-center">
                                    <Briefcase className="w-5 h-5 text-[#7c3aed]" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-black text-white tracking-tight">Application Pipeline</h2>
                                    <p className="text-[#a0aec0] text-xs font-bold uppercase tracking-widest mt-0.5">Real-time engagement tracking</p>
                                </div>
                            </div>
                            <div className="glass-card px-4 py-2 border-white/10 text-[#a0aec0] text-[10px] font-black uppercase tracking-widest">
                                {appliedJobs.length} Active Nodes
                            </div>
                        </div>

                        {loading ? (
                            <div className="p-24 text-center">
                                <div className="w-12 h-12 border-4 border-[#00d9ff]/10 border-t-[#00d9ff] rounded-full animate-spin mx-auto mb-6" />
                                <p className="text-[#a0aec0] font-black uppercase tracking-widest text-[10px]">Scanning Pipeline...</p>
                            </div>
                        ) : appliedJobs.length === 0 ? (
                            <div className="p-24 text-center">
                                <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-8 border border-dashed border-white/10">
                                    <Clock className="w-10 h-10 text-white/10" />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-3">No engagement detected</h3>
                                <p className="text-[#a0aec0] mb-8 font-medium">Your career nodes are currently dormant. Initiate applications to see data.</p>
                                <button onClick={() => window.location.href = '/jobs'} className="btn-primary px-10 py-4 font-black tracking-widest uppercase text-xs">
                                    Browse Opportunities
                                </button>
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead className="bg-white/[0.03]">
                                        <tr>
                                            <th className="px-10 py-6 text-[10px] font-black text-[#a0aec0] uppercase tracking-widest">Organization</th>
                                            <th className="px-10 py-6 text-[10px] font-black text-[#a0aec0] uppercase tracking-widest">Position</th>
                                            <th className="px-10 py-6 text-[10px] font-black text-[#a0aec0] uppercase tracking-widest">Initiated Date</th>
                                            <th className="px-10 py-6 text-[10px] font-black text-[#a0aec0] uppercase tracking-widest text-right">Node Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-white/5">
                                        {appliedJobs.map((app) => (
                                            <tr key={app._id} className="hover:bg-white/[0.02] transition-colors group">
                                                <td className="px-10 py-7">
                                                    <div className="flex items-center gap-4">
                                                        <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center font-black text-white group-hover:border-[#00d9ff]/30 transition-all">
                                                            {app.job?.company?.name?.charAt(0)}
                                                        </div>
                                                        <span className="font-bold text-white tracking-tight">{app.job?.company?.name || 'Vanguard Corp'}</span>
                                                    </div>
                                                </td>
                                                <td className="px-10 py-7">
                                                    <div className="font-bold text-[#f1f5f9] tracking-tight">{app.job?.title}</div>
                                                    <div className="text-[10px] text-[#a0aec0] font-bold uppercase tracking-tighter mt-1">Full-Time Direct Hire</div>
                                                </td>
                                                <td className="px-10 py-7">
                                                    <div className="flex items-center gap-3 text-[#a0aec0]">
                                                        <Calendar className="w-4 h-4 text-[#7c3aed]" />
                                                        <span className="text-sm font-bold tracking-tight">{formatDate(app.createdAt)}</span>
                                                    </div>
                                                </td>
                                                <td className="px-10 py-7 text-right">
                                                    <span className={`px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border shadow-lg ${
                                                        app.status === 'accepted' ? 'bg-[#00d9ff]/10 text-[#00d9ff] border-[#00d9ff]/20 shadow-[#00d9ff]/5' :
                                                        app.status === 'rejected' ? 'bg-[#ec4899]/10 text-[#ec4899] border-[#ec4899]/20 shadow-[#ec4899]/5' :
                                                        'bg-yellow-500/10 text-yellow-500 border-yellow-500/20 shadow-yellow-500/5'
                                                    }`}>
                                                        {app.status === 'accepted' ? <CheckCircle className="w-3 h-3 inline mr-2" /> : 
                                                         app.status === 'rejected' ? <XCircle className="w-3 h-3 inline mr-2" /> : 
                                                         <Clock className="w-3 h-3 inline mr-2" />}
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
