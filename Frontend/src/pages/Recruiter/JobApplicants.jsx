import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Download, Check, X, FileText, Mail, Phone, Calendar, User, ArrowLeft, ExternalLink, Sparkles, AlertCircle } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import axios from 'axios';

const JobApplicants = () => {
    const { jobId } = useParams();
    const [applicants, setApplicants] = useState([]);
    const [jobTitle, setJobTitle] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchApplicants();
    }, [jobId]);

    const fetchApplicants = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`/api/v1/application/${jobId}/applicants`, {
                withCredentials: true
            });
            setApplicants(response.data.job?.applications || []);
            setJobTitle(response.data.job?.title || '');
        } catch (error) {
            console.error('Error fetching applicants:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDownloadResume = (resumePath) => {
        if (!resumePath) {
            alert('Resume not available');
            return;
        }
        const resumeUrl = `${axios.defaults.baseURL}/${resumePath}`;
        window.open(resumeUrl, '_blank');
    };

    const handleUpdateStatus = async (applicationId, status) => {
        try {
            await axios.post(`/api/v1/application/status/${applicationId}/update`,
                { status },
                { withCredentials: true }
            );
            fetchApplicants();
        } catch (error) {
            console.error('Error updating status:', error);
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center h-96 glass-card">
                <div className="w-12 h-12 rounded-full border-4 border-[#00d9ff]/10 border-t-[#00d9ff] animate-spin"></div>
                <p className="mt-4 text-[#a0aec0] font-bold text-xs uppercase tracking-widest">Scanning Candidates...</p>
            </div>
        );
    }

    return (
        <div className="space-y-10 animate-fade-in pb-20">
            {/* Header Area */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                    <Link to="/recruiter/my-jobs" className="inline-flex items-center gap-2 text-[#a0aec0] hover:text-white transition-colors mb-6 font-bold text-sm group">
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to My Jobs
                    </Link>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#7c3aed]/10 border border-[#7c3aed]/20 text-[#7c3aed] text-[10px] font-bold tracking-widest uppercase mb-4">
                        <User className="w-3 h-3" />
                        Application Terminal
                    </div>
                    <h2 className="text-4xl font-extrabold text-white tracking-tight">
                        Applicants for <span className="gradient-text">{jobTitle}</span>
                    </h2>
                    <p className="text-[#a0aec0] mt-2 font-medium">Review talent profiles and manage the recruitment pipeline.</p>
                </div>
                <div className="glass-card px-6 py-4 flex items-center gap-4 border-[#00d9ff]/10">
                    <div className="text-right">
                        <p className="text-[10px] font-black text-[#a0aec0] uppercase tracking-widest leading-none">Total Volume</p>
                        <p className="text-2xl font-black text-white leading-none mt-1">{applicants.length}</p>
                    </div>
                    <div className="w-px h-8 bg-white/10"></div>
                    <div className="w-10 h-10 rounded-xl bg-[#00d9ff]/10 flex items-center justify-center">
                        <Sparkles className="w-5 h-5 text-[#00d9ff]" />
                    </div>
                </div>
            </div>

            {applicants.length === 0 ? (
                <div className="glass-card py-32 text-center border-dashed border-white/10">
                    <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
                        <AlertCircle className="w-10 h-10 text-[#a0aec0]/20" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">Queue is Empty</h3>
                    <p className="text-[#a0aec0] max-w-sm mx-auto font-medium">No one has applied for this position yet. Try boosting your job post.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-6">
                    {applicants.map((application, index) => (
                        <div
                            key={application._id}
                            className="glass-card p-8 group hover:border-white/10 transition-all duration-300"
                            style={{ animationDelay: `${index * 100}ms` }}
                        >
                            <div className="flex flex-col lg:flex-row gap-8">
                                {/* Profile Info */}
                                <div className="flex-1 flex flex-col md:flex-row gap-6">
                                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#00d9ff]/20 to-[#7c3aed]/20 border border-white/10 flex items-center justify-center shrink-0">
                                        <User className="w-8 h-8 text-white/50" />
                                    </div>
                                    <div className="space-y-4 flex-1">
                                        <div>
                                            <div className="flex flex-wrap items-center gap-3 mb-1">
                                                <h3 className="text-2xl font-bold text-white tracking-tight">
                                                    {application.applicant?.fullname}
                                                </h3>
                                                <span className={`px-4 py-1 text-[10px] font-black uppercase tracking-widest rounded-full border ${
                                                    application.status === 'pending' ? 'bg-yellow-500/5 text-yellow-500 border-yellow-500/20' :
                                                    application.status === 'accepted' ? 'bg-[#00d9ff]/5 text-[#00d9ff] border-[#00d9ff]/20' :
                                                    application.status === 'rejected' ? 'bg-[#ec4899]/5 text-[#ec4899] border-[#ec4899]/20' :
                                                    'bg-white/5 text-white border-white/10'
                                                }`}>
                                                    {application.status}
                                                </span>
                                            </div>
                                            <div className="flex flex-wrap gap-x-6 gap-y-2">
                                                <span className="flex items-center gap-2 text-sm text-[#a0aec0] font-medium">
                                                    <Mail className="w-4 h-4 text-[#7c3aed]" />
                                                    {application.applicant?.email}
                                                </span>
                                                <span className="flex items-center gap-2 text-sm text-[#a0aec0] font-medium">
                                                    <Phone className="w-4 h-4 text-[#7c3aed]" />
                                                    {application.applicant?.phoneNumber || 'Not Provided'}
                                                </span>
                                                <span className="flex items-center gap-2 text-sm text-[#a0aec0] font-medium">
                                                    <Calendar className="w-4 h-4 text-[#7c3aed]" />
                                                    Sent {formatDate(application.createdAt)}
                                                </span>
                                            </div>
                                        </div>

                                        {application.coverLetter && (
                                            <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5">
                                                <p className="text-[10px] font-black text-[#a0aec0] uppercase tracking-widest mb-2 flex items-center gap-2">
                                                    <FileText className="w-3 h-3" /> Candidate Note
                                                </p>
                                                <p className="text-sm text-[#a0aec0] leading-relaxed font-medium">
                                                    "{application.coverLetter}"
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="lg:w-72 flex flex-col gap-3 justify-center shrink-0">
                                    <button
                                        onClick={() => handleDownloadResume(application.resume)}
                                        className="w-full py-4 rounded-xl bg-white/5 border border-white/10 text-white font-bold text-sm hover:bg-white/10 flex items-center justify-center gap-2 transition-all group/resume"
                                    >
                                        <ExternalLink className="w-4 h-4 text-[#00d9ff] group-hover/resume:scale-110 transition-transform" /> Inspect Resume
                                    </button>

                                    {application.status === 'pending' && (
                                        <div className="grid grid-cols-2 gap-3 mt-1">
                                            <button
                                                onClick={() => handleUpdateStatus(application._id, 'accepted')}
                                                className="py-4 rounded-xl bg-[#00d9ff] text-[#0f1419] font-black text-xs uppercase tracking-widest hover:scale-[1.02] transition-all shadow-lg shadow-[#00d9ff]/10 flex items-center justify-center gap-2"
                                            >
                                                <Check className="w-4 h-4" /> Accept
                                            </button>
                                            <button
                                                onClick={() => handleUpdateStatus(application._id, 'rejected')}
                                                className="py-4 rounded-xl bg-white/5 border border-[#ec4899]/20 text-[#ec4899] font-black text-xs uppercase tracking-widest hover:bg-[#ec4899]/10 transition-all flex items-center justify-center gap-2"
                                            >
                                                <X className="w-4 h-4" /> Reject
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default JobApplicants;
