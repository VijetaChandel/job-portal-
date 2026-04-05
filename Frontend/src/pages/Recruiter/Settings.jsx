import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../../components/ui/Button';
import axios from 'axios';
import { User, Mail, Phone, FileText, Code, Save, Loader2, Settings as SettingsIcon, ShieldCheck, Sparkles, CheckCircle, AlertCircle } from 'lucide-react';

const Settings = () => {
    const { user, setUser } = useAuth();
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });
    const [formData, setFormData] = useState({
        fullname: '',
        email: '',
        phoneNumber: '',
        bio: '',
        skills: ''
    });

    useEffect(() => {
        if (user) {
            setFormData({
                fullname: user.fullname || '',
                email: user.email || '',
                phoneNumber: user.phoneNumber || '',
                bio: user.profile?.bio || '',
                skills: user.profile?.skills?.join(', ') || ''
            });
        }
    }, [user]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage({ type: '', text: '' });

        try {
            const res = await axios.post('/api/v1/user/profile/update', formData, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });

            if (res.data.success) {
                setMessage({ type: 'success', text: 'Operational profile synchronized successfully.' });

                const updatedUser = res.data.user;
                if (typeof setUser === 'function') {
                    setUser(updatedUser);
                }
                localStorage.setItem('user', JSON.stringify(updatedUser));
                
                // Clear success message after 5s
                setTimeout(() => setMessage({ type: '', text: '' }), 5000);
            }
        } catch (error) {
            setMessage({
                type: 'error',
                text: error.response?.data?.message || 'Failed to synchronize profile records.'
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-5xl mx-auto space-y-10 animate-fade-in pb-20">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00d9ff]/10 border border-[#00d9ff]/20 text-[#00d9ff] text-[10px] font-bold tracking-widest uppercase mb-4">
                        <SettingsIcon className="w-3 h-3" />
                        System Configuration
                    </div>
                    <h2 className="text-4xl font-extrabold text-white tracking-tight">Account Settings</h2>
                    <p className="text-[#a0aec0] mt-2 font-medium">Refine your professional presence and administrative preferences.</p>
                </div>
                <div className="hidden lg:flex items-center gap-3 glass-card px-5 py-3 border-[#7c3aed]/20">
                    <ShieldCheck className="w-5 h-5 text-[#7c3aed]" />
                    <div className="text-left">
                        <p className="text-[10px] font-black text-[#a0aec0] uppercase tracking-widest leading-none">Security Status</p>
                        <p className="text-xs font-bold text-white mt-1">Verified Admin Access</p>
                    </div>
                </div>
            </div>

            {/* Notification Area */}
            {message.text && (
                <div className={`p-5 rounded-2xl flex items-center gap-4 animate-slide-up border ${
                    message.type === 'success' 
                        ? 'bg-[#00d9ff]/5 text-[#00d9ff] border-[#00d9ff]/20' 
                        : 'bg-[#ec4899]/5 text-[#ec4899] border-[#ec4899]/20'
                }`}>
                    <div className="shrink-0">
                        {message.type === 'success' ? <CheckCircle className="w-6 h-6" /> : <AlertCircle className="w-6 h-6" />}
                    </div>
                    <p className="font-bold text-sm tracking-wide">{message.text}</p>
                    <button onClick={() => setMessage({ type: '', text: '' })} className="ml-auto opacity-50 hover:opacity-100 transition-opacity">
                        <X className="w-4 h-4" />
                    </button>
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-10">
                {/* Identity & Contact Section */}
                <div className="glass-card overflow-hidden">
                    <div className="p-8 border-b border-white/5 bg-white/[0.02] flex justify-between items-center">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00d9ff]/10 to-transparent border border-[#00d9ff]/20 flex items-center justify-center">
                                <User className="w-5 h-5 text-[#00d9ff]" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-white">Identity & Reach</h3>
                                <p className="text-[#a0aec0] text-xs font-medium">Your primary contact and identification vectors.</p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-[#a0aec0] uppercase tracking-widest px-1">Full Legal Name</label>
                            <div className="relative group">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-focus-within:text-[#00d9ff] transition-colors" />
                                <input
                                    type="text"
                                    name="fullname"
                                    value={formData.fullname}
                                    onChange={handleChange}
                                    className="w-full bg-white/5 border border-white/5 text-white pl-12 pr-4 py-4 rounded-xl focus:outline-none focus:border-[#00d9ff]/30 transition-all font-medium"
                                    placeholder="Enter your full name"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-[#a0aec0] uppercase tracking-widest px-1">Professional Email</label>
                            <div className="relative group">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-focus-within:text-[#00d9ff] transition-colors" />
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full bg-white/5 border border-white/5 text-white pl-12 pr-4 py-4 rounded-xl focus:outline-none focus:border-[#00d9ff]/30 transition-all font-medium"
                                    placeholder="admin@jobportal.io"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-[#a0aec0] uppercase tracking-widest px-1">Official Phone Vector</label>
                            <div className="relative group">
                                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-focus-within:text-[#00d9ff] transition-colors" />
                                <input
                                    type="tel"
                                    name="phoneNumber"
                                    value={formData.phoneNumber}
                                    onChange={handleChange}
                                    className="w-full bg-white/5 border border-white/5 text-white pl-12 pr-4 py-4 rounded-xl focus:outline-none focus:border-[#00d9ff]/30 transition-all font-medium"
                                    placeholder="+91 00000 00000"
                                    required
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Professional Signature Section */}
                <div className="glass-card overflow-hidden">
                    <div className="p-8 border-b border-white/5 bg-white/[0.02] flex justify-between items-center">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#7c3aed]/10 to-transparent border border-[#7c3aed]/20 flex items-center justify-center">
                                <FileText className="w-5 h-5 text-[#7c3aed]" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-white">Professional Signature</h3>
                                <p className="text-[#a0aec0] text-xs font-medium">Define your industry bio and core expertise.</p>
                            </div>
                        </div>
                        <Sparkles className="w-6 h-6 text-[#7c3aed]/30" />
                    </div>

                    <div className="p-8 space-y-8">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-[#a0aec0] uppercase tracking-widest px-1">Executive Summary (Bio)</label>
                            <div className="relative group">
                                <FileText className="absolute left-4 top-5 w-4 h-4 text-white/20 group-focus-within:text-[#00d9ff] transition-colors" />
                                <textarea
                                    name="bio"
                                    value={formData.bio}
                                    onChange={handleChange}
                                    rows="5"
                                    className="w-full bg-white/5 border border-white/5 text-white pl-12 pr-6 py-4 rounded-2xl focus:outline-none focus:border-[#00d9ff]/30 transition-all font-medium resize-none leading-relaxed"
                                    placeholder="Briefly describe your professional journey and recruitment philosophy..."
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-[#a0aec0] uppercase tracking-widest px-1">Core Expertise (Comma separated)</label>
                            <div className="relative group">
                                <Code className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-focus-within:text-[#00d9ff] transition-colors" />
                                <input
                                    type="text"
                                    name="skills"
                                    value={formData.skills}
                                    onChange={handleChange}
                                    className="w-full bg-white/5 border border-white/5 text-white pl-12 pr-4 py-4 rounded-xl focus:outline-none focus:border-[#00d9ff]/30 transition-all font-medium"
                                    placeholder="Technical Hiring, Talent Sourcing, HR Tech"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer Actions */}
                <div className="flex flex-col sm:flex-row justify-between items-center gap-6 pt-4">
                    <p className="text-[#a0aec0] text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
                        <AlertCircle className="w-3 h-3" /> All changes are reflected in real-time across the portal.
                    </p>
                    <Button
                        type="submit"
                        disabled={loading}
                        className="w-full sm:w-auto px-12 py-4 btn-primary h-auto flex items-center justify-center gap-3 shadow-xl shadow-[#00d9ff]/20 font-bold tracking-tight text-lg group"
                    >
                        {loading ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin" />
                                Analyzing & Persisting...
                            </>
                        ) : (
                            <>
                                <Save className="w-5 h-5 group-hover:scale-110 transition-transform" />
                                Synchronize Records
                            </>
                        )}
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default Settings;
