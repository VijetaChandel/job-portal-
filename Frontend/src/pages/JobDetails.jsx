import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { MapPin, DollarSign, Clock, Briefcase, Building2, Users, Calendar, Upload, CheckCircle, Sparkles, ChevronLeft, Share2, Bookmark, IndianRupee, X, Mail, User, Star } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { Button } from '../components/ui/Button';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const JobDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();
    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showApplicationModal, setShowApplicationModal] = useState(false);
    const [applicationData, setApplicationData] = useState({
        fullName: '',
        email: '',
        phone: '',
        coverLetter: '',
        resume: null
    });
    const [applying, setApplying] = useState(false);
    const [applicationSuccess, setApplicationSuccess] = useState(false);

    useEffect(() => {
        fetchJobDetails();
    }, [id]);

    const fetchJobDetails = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`/api/v1/job/get/${id}`);
            setJob(response.data.job);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching job:', error);
            setLoading(false);
        }
    };

    const handleApplyClick = () => {
        if (!user) {
            navigate('/login');
            return;
        }
        setShowApplicationModal(true);
        if (user) {
            setApplicationData(prev => ({
                ...prev,
                fullName: user.fullname || '',
                email: user.email || '',
                phone: user.phoneNumber || ''
            }));
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file && (file.type === 'application/pdf' || file.type === 'application/msword' || file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document')) {
            setApplicationData(prev => ({ ...prev, resume: file }));
        } else {
            alert('Please upload a PDF or DOCX file');
        }
    };

    const handleSubmitApplication = async (e) => {
        e.preventDefault();
        if (!applicationData.resume) {
            alert('Please upload your resume');
            return;
        }
        setApplying(true);
        try {
            const formData = new FormData();
            formData.append('resume', applicationData.resume);
            formData.append('coverLetter', applicationData.coverLetter);

            await axios.post(`/api/v1/application/apply/${id}`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
                withCredentials: true
            });

            setApplicationSuccess(true);
            setTimeout(() => {
                setShowApplicationModal(false);
                setApplicationSuccess(false);
            }, 3000);
        } catch (error) {
            console.error('Error submitting application:', error);
            alert(error.response?.data?.message || 'Failed to submit application');
        } finally {
            setApplying(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[#0f1419] flex flex-col">
                <Navbar />
                <div className="flex-grow flex items-center justify-center">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full border-4 border-[#00d9ff]/10 border-t-[#00d9ff] animate-spin"></div>
                </div>
                <Footer />
            </div>
        );
    }

    if (!job) {
        return (
            <div className="min-h-screen bg-[#0f1419] flex flex-col">
                <Navbar />
                <div className="flex-grow flex flex-col items-center justify-center p-6 text-center">
                    <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-6">
                        <Briefcase className="w-10 h-10 text-[#a0aec0]/50" />
                    </div>
                    <h2 className="text-3xl font-bold text-white mb-2">Job Not Found</h2>
                    <p className="text-[#a0aec0] mb-8">The position you are looking for may have been removed or filled.</p>
                    <Button onClick={() => navigate('/jobs')} className="btn-primary px-8 py-3">Browse Other Jobs</Button>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#0f1419] flex flex-col relative overflow-hidden">
            {/* Background Glows */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#00d9ff]/5 rounded-full blur-[140px] -z-10"></div>
            <div className="absolute bottom-[20%] left-[10%] w-[400px] h-[400px] bg-[#7c3aed]/5 rounded-full blur-[120px] -z-10"></div>

            <Navbar />

            <main className="flex-grow pt-32 pb-20">
                <div className="max-w-[1200px] mx-auto px-6">
                    {/* Back Link */}
                    <button 
                        onClick={() => navigate('/jobs')}
                        className="flex items-center gap-2 text-[#a0aec0] hover:text-[#00d9ff] transition-colors mb-10 font-bold group"
                    >
                        <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                        Back to Search
                    </button>

                    {/* Hero Header Card */}
                    <div className="glass-card p-8 lg:p-12 mb-10 animate-fade-in-up">
                        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
                            <div className="flex flex-col sm:flex-row gap-8 items-start sm:items-center">
                                <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-[#00d9ff] to-[#7c3aed] flex items-center justify-center text-4xl font-extrabold text-white shadow-xl shadow-[#00d9ff]/20 shrink-0">
                                    {job.company?.name?.charAt(0) || 'C'}
                                </div>
                                <div className="space-y-3">
                                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00d9ff]/10 border border-[#00d9ff]/20 text-[#00d9ff] text-[10px] font-bold tracking-widest uppercase mb-1">
                                        <Sparkles className="w-3 h-3" />
                                        Featured Position
                                    </div>
                                    <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight">
                                        {job.title}
                                    </h1>
                                    <div className="flex flex-wrap items-center gap-y-4 gap-x-6 text-[#a0aec0] font-medium">
                                        <span className="flex items-center gap-2 hover:text-white transition-colors cursor-default">
                                            <Building2 className="w-5 h-5 text-[#00d9ff]" />
                                            {job.company?.name}
                                        </span>
                                        <span className="flex items-center gap-2 hover:text-white transition-colors cursor-default">
                                            <MapPin className="w-5 h-5 text-[#7c3aed]" />
                                            {job.location}
                                        </span>
                                        <span className="flex items-center gap-2 hover:text-white transition-colors cursor-default">
                                            <Clock className="w-5 h-5 text-[#ec4899]" />
                                            Posted {new Date(job.createdAt).toLocaleDateString()}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="flex flex-col w-full lg:w-auto gap-4 shrink-0">
                                <Button onClick={handleApplyClick} size="lg" className="btn-primary px-12 py-5 h-auto text-lg font-bold shadow-xl shadow-[#00d9ff]/20">
                                    Apply for this Role
                                </Button>
                                <div className="flex gap-3">
                                    <button className="flex-1 py-3 rounded-xl border border-white/10 hover:bg-white/5 transition-all text-[#a0aec0] hover:text-white flex items-center justify-center gap-2 font-bold text-sm">
                                        <Bookmark className="w-4 h-4" /> Save
                                    </button>
                                    <button className="flex-1 py-3 rounded-xl border border-white/10 hover:bg-white/5 transition-all text-[#a0aec0] hover:text-white flex items-center justify-center gap-2 font-bold text-sm">
                                        <Share2 className="w-4 h-4" /> Share
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Quick Stats Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 pt-10 border-t border-white/5">
                            <div className="space-y-1">
                                <p className="text-[10px] font-bold text-[#a0aec0] uppercase tracking-widest">Employment</p>
                                <p className="text-white font-bold flex items-center gap-2">
                                    <Briefcase className="w-4 h-4 text-[#00d9ff]" /> {job.jobType}
                                </p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-[10px] font-bold text-[#a0aec0] uppercase tracking-widest">Experience</p>
                                <p className="text-white font-bold flex items-center gap-2">
                                    <Users className="w-4 h-4 text-[#7c3aed]" /> {job.experienceLevel} Years
                                </p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-[10px] font-bold text-[#a0aec0] uppercase tracking-widest">Compensation</p>
                                <p className="text-white font-bold flex items-center gap-2 truncate">
                                    <IndianRupee className="w-4 h-4 text-[#ec4899]" /> {job.salary ? `₹${job.salary.toLocaleString()}` : 'Negotiable'}
                                </p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-[10px] font-bold text-[#a0aec0] uppercase tracking-widest">Openings</p>
                                <p className="text-white font-bold flex items-center gap-2">
                                    <Star className="w-4 h-4 text-[#00d9ff]" /> {job.position} Available
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Main Content Sections */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                        <div className="lg:col-span-2 space-y-10 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                            {/* Description */}
                            <div className="glass-card p-8 lg:p-10">
                                <h2 className="text-2xl font-extrabold mb-6 flex items-center gap-3">
                                    <div className="w-1.5 h-6 bg-[#00d9ff] rounded-full"></div>
                                    Job Overview
                                </h2>
                                <p className="text-[#a0aec0] text-lg leading-relaxed whitespace-pre-line">
                                    {job.description}
                                </p>
                            </div>

                            {/* Requirements */}
                            <div className="glass-card p-8 lg:p-10">
                                <h2 className="text-2xl font-extrabold mb-8 flex items-center gap-3">
                                    <div className="w-1.5 h-6 bg-[#7c3aed] rounded-full"></div>
                                    Requirements
                                </h2>
                                <div className="space-y-5">
                                    {job.requirements?.map((req, index) => (
                                        <div key={index} className="flex items-start gap-4 group">
                                            <div className="mt-1 w-5 h-5 rounded-full bg-[#7c3aed]/10 border border-[#7c3aed]/30 flex items-center justify-center shrink-0 group-hover:bg-[#7c3aed] group-hover:text-white transition-all">
                                                <CheckCircle className="w-3 h-3" />
                                            </div>
                                            <p className="text-[#a0aec0] group-hover:text-white transition-colors">{req}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-10 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                            <div className="glass-card p-8 bg-gradient-to-br from-white/[0.05] to-transparent">
                                <h2 className="text-xl font-bold mb-6">About Company</h2>
                                <p className="text-[#a0aec0] text-sm leading-relaxed mb-8">
                                    {job.company?.description || 'This company is a forward-thinking leader in their industry, prioritizing innovation and employee growth.'}
                                </p>
                                <button className="w-full py-4 text-[#00d9ff] font-bold text-sm border border-[#00d9ff]/20 rounded-xl hover:bg-[#00d9ff]/5 transition-all">
                                    View Company Profile
                                </button>
                            </div>

                            <div className="glass-card p-8 relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-20 h-20 bg-[#ec4899]/10 rounded-full blur-2xl -z-10"></div>
                                <h2 className="text-xl font-bold mb-6">Ready to Join?</h2>
                                <p className="text-[#a0aec0] text-sm mb-8 leading-relaxed">
                                    Take the next step in your career journey. Apply now to get started with {job.company?.name}.
                                </p>
                                <Button onClick={handleApplyClick} className="w-full btn-primary py-4 font-bold">
                                    Quick Apply
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Application Modal */}
            {showApplicationModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-[#0f1419]/90 backdrop-blur-md" onClick={() => !applying && setShowApplicationModal(false)}></div>
                    
                    <div className="glass-card max-w-2xl w-full max-h-[90vh] overflow-y-auto relative z-10 p-0 shadow-2xl shadow-black/50 animate-fade-in-up">
                        {applicationSuccess ? (
                            <div className="p-20 text-center">
                                <div className="w-24 h-24 bg-[#00d9ff]/10 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
                                    <CheckCircle className="w-12 h-12 text-[#00d9ff] animate-pulse" />
                                </div>
                                <h2 className="text-4xl font-extrabold text-white mb-4">Success!</h2>
                                <p className="text-[#a0aec0] text-lg font-medium">
                                    Your application for <span className="text-white font-bold">{job.title}</span> has been flying through our high-speed systems!
                                </p>
                            </div>
                        ) : (
                            <>
                                <div className="p-8 border-b border-white/5 flex justify-between items-center bg-white/[0.02]">
                                    <h2 className="text-3xl font-extrabold">Apply Now</h2>
                                    <button onClick={() => setShowApplicationModal(false)} className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-white/5 text-[#a0aec0] hover:text-white transition-all">
                                        <X className="w-6 h-6" />
                                    </button>
                                </div>

                                <form onSubmit={handleSubmitApplication} className="p-8 lg:p-12 space-y-8">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <p className="text-[10px] font-bold text-[#a0aec0] uppercase tracking-widest px-1">Full Name</p>
                                            <div className="relative group">
                                                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20" />
                                                <input
                                                    type="text"
                                                    value={applicationData.fullName}
                                                    className="w-full bg-white/5 border border-white/10 text-white pl-12 pr-4 py-4 rounded-xl focus:outline-none opacity-50 cursor-not-allowed"
                                                    disabled
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <p className="text-[10px] font-bold text-[#a0aec0] uppercase tracking-widest px-1">Email</p>
                                            <div className="relative group">
                                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20" />
                                                <input
                                                    type="email"
                                                    value={applicationData.email}
                                                    className="w-full bg-white/5 border border-white/10 text-white pl-12 pr-4 py-4 rounded-xl focus:outline-none opacity-50 cursor-not-allowed"
                                                    disabled
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <p className="text-[10px] font-bold text-[#a0aec0] uppercase tracking-widest px-1">Cover Letter (Optional)</p>
                                        <textarea
                                            value={applicationData.coverLetter}
                                            onChange={(e) => setApplicationData(prev => ({ ...prev, coverLetter: e.target.value }))}
                                            rows={5}
                                            className="w-full bg-white/5 border border-white/10 text-white px-6 py-4 rounded-xl focus:outline-none focus:border-[#00d9ff]/50 transition-all placeholder:text-[#a0aec0]/30 font-medium"
                                            placeholder="Introduce yourself and tell us why you're a great fit..."
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <p className="text-[10px] font-bold text-[#a0aec0] uppercase tracking-widest px-1">Resume <span className="text-[#ec4899]">*</span></p>
                                        <div className="relative group">
                                            <input
                                                type="file"
                                                id="resume-upload"
                                                accept=".pdf,.doc,.docx"
                                                onChange={handleFileChange}
                                                className="hidden"
                                                required
                                            />
                                            <label 
                                                htmlFor="resume-upload" 
                                                className={`flex flex-col items-center justify-center border-2 border-dashed rounded-3xl p-10 cursor-pointer transition-all ${
                                                    applicationData.resume 
                                                        ? 'bg-[#00d9ff]/5 border-[#00d9ff]/50' 
                                                        : 'bg-white/[0.02] border-white/10 hover:border-white/20 hover:bg-white/[0.04]'
                                                }`}
                                            >
                                                {applicationData.resume ? (
                                                    <div className="flex flex-col items-center">
                                                        <div className="w-16 h-16 bg-[#00d9ff]/10 rounded-2xl flex items-center justify-center mb-4">
                                                            <CheckCircle className="w-8 h-8 text-[#00d9ff]" />
                                                        </div>
                                                        <p className="text-white font-bold mb-1">{applicationData.resume.name}</p>
                                                        <p className="text-[#a0aec0] text-xs">{(applicationData.resume.size / 1024 / 1024).toFixed(2)} MB • Click to change</p>
                                                    </div>
                                                ) : (
                                                    <div className="flex flex-col items-center">
                                                        <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mb-4">
                                                            <Upload className="w-8 h-8 text-[#a0aec0]" />
                                                        </div>
                                                        <p className="text-white font-bold mb-1">Click to Upload Resume</p>
                                                        <p className="text-[#a0aec0] text-xs font-medium">PDF, DOC, or DOCX (Max 5MB)</p>
                                                    </div>
                                                )}
                                            </label>
                                        </div>
                                    </div>

                                    <div className="flex gap-4 pt-6">
                                        <button
                                            type="button"
                                            onClick={() => setShowApplicationModal(false)}
                                            className="grow py-4 rounded-xl border border-white/10 text-white font-bold hover:bg-white/5 transition-all"
                                            disabled={applying}
                                        >
                                            Cancel
                                        </button>
                                        <Button
                                            type="submit"
                                            disabled={applying || !applicationData.resume}
                                            className="grow btn-primary py-4 h-auto text-lg font-bold shadow-xl shadow-[#00d9ff]/20"
                                        >
                                            {applying ? (
                                                <span className="flex items-center gap-2">
                                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                                    Submitting...
                                                </span>
                                            ) : (
                                                'Submit Application'
                                            )}
                                        </Button>
                                    </div>
                                </form>
                            </>
                        )}
                    </div>
                </div>
            )}

            <Footer />
        </div>
    );
};

export default JobDetails;
