import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { Briefcase, Building2, MapPin, IndianRupee, Users, Target, FileText, Sparkles, X, CheckCircle, ChevronRight } from 'lucide-react';
import axios from 'axios';

const PostJob = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        requirements: '',
        salary: '',
        location: '',
        jobType: 'Full-time',
        experienceLevel: '',
        position: '',
        companyName: '' // Using company name directly as per current frontend's expectation or simplified flow
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const requirementsString = formData.requirements
                .split('\n')
                .filter(req => req.trim() !== '')
                .join(',');

            const jobData = {
                title: formData.title,
                description: formData.description,
                requirements: requirementsString,
                salary: Number(formData.salary),
                location: formData.location,
                jobType: formData.jobType,
                experienceLevel: formData.experienceLevel,
                position: Number(formData.position),
                companyId: formData.companyName 
            };

            await axios.post('/api/v1/job/post', jobData, {
                withCredentials: true
            });

            navigate('/recruiter/my-jobs');
        } catch (error) {
            console.error('Error posting job:', error);
            alert(error.response?.data?.message || 'Failed to post job');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-10 animate-fade-in pb-20">
            {/* Header Area */}
            <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00d9ff]/10 border border-[#00d9ff]/20 text-[#00d9ff] text-[10px] font-bold tracking-widest uppercase mb-4">
                    <Plus className="w-3 h-3" />
                    New Opportunity
                </div>
                <h2 className="text-4xl font-extrabold text-white tracking-tight">Post a Position</h2>
                <p className="text-[#a0aec0] mt-2 font-medium">Broadcast your mission and find the perfect talent to join your team.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-10">
                {/* Basic Info Section */}
                <div className="glass-card p-8 lg:p-10">
                    <div className="flex items-center gap-3 mb-10">
                        <div className="w-1.5 h-6 bg-[#00d9ff] rounded-full"></div>
                        <h3 className="text-xl font-bold">Position Details</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-[#a0aec0] uppercase tracking-widest px-1">Job Title</label>
                            <div className="relative group">
                                <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20 group-focus-within:text-[#00d9ff] transition-colors" />
                                <input
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    required
                                    className="w-full bg-white/5 border border-white/5 text-white pl-12 pr-4 py-4 rounded-xl focus:outline-none focus:border-[#00d9ff]/30 transition-all placeholder:text-white/20 font-medium"
                                    placeholder="e.g. Senior Product Designer"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-[#a0aec0] uppercase tracking-widest px-1">Organization</label>
                            <div className="relative group">
                                <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20 group-focus-within:text-[#00d9ff] transition-colors" />
                                <input
                                    type="text"
                                    name="companyName"
                                    value={formData.companyName}
                                    onChange={handleChange}
                                    required
                                    className="w-full bg-white/5 border border-white/5 text-white pl-12 pr-4 py-4 rounded-xl focus:outline-none focus:border-[#00d9ff]/30 transition-all placeholder:text-white/20 font-medium"
                                    placeholder="e.g. SpaceX"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-[#a0aec0] uppercase tracking-widest px-1">Primary Location</label>
                            <div className="relative group">
                                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20 group-focus-within:text-[#00d9ff] transition-colors" />
                                <input
                                    type="text"
                                    name="location"
                                    value={formData.location}
                                    onChange={handleChange}
                                    required
                                    className="w-full bg-white/5 border border-white/5 text-white pl-12 pr-4 py-4 rounded-xl focus:outline-none focus:border-[#00d9ff]/30 transition-all placeholder:text-white/20 font-medium"
                                    placeholder="e.g. Remote / New York, NY"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-[#a0aec0] uppercase tracking-widest px-1">Job Type</label>
                            <div className="relative group">
                                <Target className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20 group-focus-within:text-[#00d9ff] transition-colors" />
                                <select
                                    name="jobType"
                                    value={formData.jobType}
                                    onChange={handleChange}
                                    required
                                    className="w-full bg-white/5 border border-white/5 text-white pl-12 pr-4 py-4 rounded-xl focus:outline-none focus:border-[#00d9ff]/30 transition-all font-medium appearance-none"
                                >
                                    <option value="Full-time" className="bg-[#0f1419]">Full-time</option>
                                    <option value="Part-time" className="bg-[#0f1419]">Part-time</option>
                                    <option value="Contract" className="bg-[#0f1419]">Contract</option>
                                    <option value="Internship" className="bg-[#0f1419]">Internship</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Requirements & Description Section */}
                <div className="glass-card p-8 lg:p-10">
                    <div className="flex items-center gap-3 mb-10">
                        <div className="w-1.5 h-6 bg-[#7c3aed] rounded-full"></div>
                        <h3 className="text-xl font-bold">Requirements & Scope</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-[#a0aec0] uppercase tracking-widest px-1">Annual Salary (₹)</label>
                            <div className="relative group">
                                <IndianRupee className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20 group-focus-within:text-[#00d9ff] transition-colors" />
                                <input
                                    type="number"
                                    name="salary"
                                    value={formData.salary}
                                    onChange={handleChange}
                                    required
                                    className="w-full bg-white/5 border border-white/5 text-white pl-12 pr-4 py-4 rounded-xl focus:outline-none focus:border-[#00d9ff]/30 transition-all font-medium"
                                    placeholder="e.g. 1200000"
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-[#a0aec0] uppercase tracking-widest px-1">Exp. Required (Years)</label>
                            <div className="relative group">
                                <Sparkles className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20 group-focus-within:text-[#00d9ff] transition-colors" />
                                <input
                                    type="number"
                                    name="experienceLevel"
                                    value={formData.experienceLevel}
                                    onChange={handleChange}
                                    required
                                    className="w-full bg-white/5 border border-white/5 text-white pl-12 pr-4 py-4 rounded-xl focus:outline-none focus:border-[#00d9ff]/30 transition-all font-medium"
                                    placeholder="e.g. 3"
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-[#a0aec0] uppercase tracking-widest px-1">Available Openings</label>
                            <div className="relative group">
                                <Users className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20 group-focus-within:text-[#00d9ff] transition-colors" />
                                <input
                                    type="number"
                                    name="position"
                                    value={formData.position}
                                    onChange={handleChange}
                                    required
                                    min="1"
                                    className="w-full bg-white/5 border border-white/5 text-white pl-12 pr-4 py-4 rounded-xl focus:outline-none focus:border-[#00d9ff]/30 transition-all font-medium"
                                    placeholder="e.g. 2"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-10">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-[#a0aec0] uppercase tracking-widest px-1">Role Description</label>
                            <div className="relative group">
                                <FileText className="absolute left-4 top-6 w-5 h-5 text-white/20 group-focus-within:text-[#00d9ff] transition-colors" />
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    required
                                    rows="6"
                                    className="w-full bg-white/5 border border-white/5 text-white pl-12 pr-6 py-5 rounded-2xl focus:outline-none focus:border-[#00d9ff]/30 transition-all font-medium resize-none"
                                    placeholder="Outline the responsibilities, daily workflow, and impact of this role..."
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between items-center px-1">
                                <label className="text-[10px] font-black text-[#a0aec0] uppercase tracking-widest">Key Requirements</label>
                                <span className="text-[10px] text-[#a0aec0]/50 font-bold">One per line</span>
                            </div>
                            <div className="relative group">
                                <CheckCircle className="absolute left-4 top-6 w-5 h-5 text-white/20 group-focus-within:text-[#00d9ff] transition-colors" />
                                <textarea
                                    name="requirements"
                                    value={formData.requirements}
                                    onChange={handleChange}
                                    required
                                    rows="6"
                                    className="w-full bg-white/5 border border-white/5 text-white pl-12 pr-6 py-5 rounded-2xl focus:outline-none focus:border-[#00d9ff]/30 transition-all font-medium resize-none"
                                    placeholder="3+ years of React&#10;System Design proficiency&#10;Team leadership experience"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Form Actions */}
                <div className="flex flex-col sm:flex-row justify-end gap-6 pt-4">
                    <button
                        type="button"
                        onClick={() => navigate('/recruiter/my-jobs')}
                        className="px-10 py-4 rounded-xl border border-white/10 text-white font-bold hover:bg-white/5 transition-all text-sm"
                    >
                        Discard Draft
                    </button>
                    <Button 
                        type="submit" 
                        disabled={loading}
                        className="btn-primary px-12 py-4 h-auto text-lg font-bold shadow-xl shadow-[#00d9ff]/30 flex items-center gap-3"
                    >
                        {loading ? (
                            <>
                                <div className="w-5 h-5 border-2 border-[#0f1419]/30 border-t-[#0f1419] rounded-full animate-spin"></div>
                                Publishing...
                            </>
                        ) : (
                            <>
                                Broadcast Position <ChevronRight className="w-5 h-5" />
                            </>
                        )}
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default PostJob;
