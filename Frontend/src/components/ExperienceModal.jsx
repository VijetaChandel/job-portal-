import React, { useState } from 'react';
import { X, Star, Sparkles, Send, Briefcase, Building2, User } from 'lucide-react';
import { Button } from './ui/Button';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const ExperienceModal = ({ isOpen, onClose, onSuccess }) => {
    const { user } = useAuth();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        fullname: user?.fullname || '',
        role: '',
        company: '',
        feedback: '',
        stars: 5
    });

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await axios.post('/api/v1/experience/add', formData, {
                withCredentials: true
            });
            if (res.data.success) {
                onSuccess();
                onClose();
            }
        } catch (error) {
            console.error("Error submitting experience:", error);
            alert(error.response?.data?.message || "Failed to share experience");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-[#0f1419]/90 backdrop-blur-md" onClick={() => !loading && onClose()}></div>
            
            <div className="glass-card max-w-2xl w-full max-h-[90vh] overflow-y-auto relative z-10 p-0 shadow-2xl animate-fade-in-up">
                <div className="p-8 border-b border-white/5 flex justify-between items-center bg-white/[0.02]">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-[#00d9ff]/10 flex items-center justify-center">
                            <Sparkles className="w-6 h-6 text-[#00d9ff]" />
                        </div>
                        <h2 className="text-2xl font-black text-white">Share Your Story</h2>
                    </div>
                    <button onClick={onClose} className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-white/5 text-[#a0aec0] hover:text-white transition-all">
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-8 lg:p-12 space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <p className="text-[10px] font-black text-[#a0aec0] uppercase tracking-widest px-1">Identity</p>
                            <div className="relative group">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#00d9ff]" />
                                <input
                                    type="text"
                                    placeholder="Your Full Name"
                                    value={formData.fullname}
                                    onChange={(e) => setFormData({...formData, fullname: e.target.value})}
                                    className="w-full bg-white/5 border border-white/10 text-white pl-12 pr-4 py-4 rounded-xl focus:outline-none focus:border-[#00d9ff]/30 transition-all font-bold placeholder:text-[#a0aec0]/20"
                                    required
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <p className="text-[10px] font-black text-[#a0aec0] uppercase tracking-widest px-1">Designation</p>
                            <div className="relative group">
                                <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#7c3aed]" />
                                <input
                                    type="text"
                                    placeholder="e.g. Senior Software Engineer"
                                    value={formData.role}
                                    onChange={(e) => setFormData({...formData, role: e.target.value})}
                                    className="w-full bg-white/5 border border-white/10 text-white pl-12 pr-4 py-4 rounded-xl focus:outline-none focus:border-[#7c3aed]/30 transition-all font-bold placeholder:text-[#a0aec0]/20"
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <p className="text-[10px] font-black text-[#a0aec0] uppercase tracking-widest px-1">Organization</p>
                        <div className="relative group">
                            <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#ec4899]" />
                            <input
                                type="text"
                                placeholder="Your current or dream company"
                                value={formData.company}
                                onChange={(e) => setFormData({...formData, company: e.target.value})}
                                className="w-full bg-white/5 border border-white/10 text-white pl-12 pr-4 py-4 rounded-xl focus:outline-none focus:border-[#ec4899]/30 transition-all font-bold placeholder:text-[#a0aec0]/20"
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <p className="text-[10px] font-black text-[#a0aec0] uppercase tracking-widest px-1">Rating Experience</p>
                        <div className="flex gap-4 p-4 rounded-2xl bg-white/5 border border-white/5">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    key={star}
                                    type="button"
                                    onClick={() => setFormData({...formData, stars: star})}
                                    className={`transition-all ${formData.stars >= star ? 'scale-110' : 'opacity-20 hover:opacity-100 scale-90'}`}
                                >
                                    <Star className={`w-8 h-8 ${formData.stars >= star ? 'fill-yellow-500 text-yellow-500' : 'text-white'}`} />
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <p className="text-[10px] font-black text-[#a0aec0] uppercase tracking-widest px-1">Your Journey Feedback</p>
                        <textarea
                            value={formData.feedback}
                            onChange={(e) => setFormData({...formData, feedback: e.target.value})}
                            rows={4}
                            className="w-full bg-white/5 border border-white/10 text-white px-6 py-4 rounded-xl focus:outline-none focus:border-[#00d9ff]/30 transition-all placeholder:text-[#a0aec0]/20 font-bold"
                            placeholder="Tell the community how we helped you land your dream job..."
                            required
                        />
                    </div>

                    <div className="flex gap-4 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 py-4 rounded-xl border border-white/10 text-white font-black uppercase text-xs tracking-widest hover:bg-white/5 transition-all"
                            disabled={loading}
                        >
                            Backtrack
                        </button>
                        <Button
                            type="submit"
                            disabled={loading}
                            className="flex-1 btn-primary py-4 h-auto text-xs font-black uppercase tracking-widest shadow-xl shadow-[#00d9ff]/20"
                        >
                            {loading ? (
                                <span className="flex items-center gap-2">
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    Syncing...
                                </span>
                            ) : (
                                <span className="flex items-center gap-2">
                                    <Send className="w-4 h-4" /> Share with World
                                </span>
                            )}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ExperienceModal;
