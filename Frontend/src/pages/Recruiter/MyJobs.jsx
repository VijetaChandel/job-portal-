import { useState, useEffect } from 'react';
import { Edit, Trash2, Users, Eye, Plus, Search, Calendar, MapPin, Briefcase, Sparkles, Filter, MoreHorizontal } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import axios from 'axios';

const MyJobs = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetchMyJobs();
    }, []);

    const fetchMyJobs = async () => {
        try {
            setLoading(true);
            const response = await axios.get('/api/v1/job/getadminjobs', {
                withCredentials: true
            });
            setJobs(response.data.jobs || []);
        } catch (error) {
            console.error('Error fetching jobs:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (jobId) => {
        if (!confirm('Are you sure you want to permanently remove this job posting? This action cannot be undone.')) return;

        try {
            await axios.delete(`/api/v1/job/delete/${jobId}`, {
                withCredentials: true
            });
            fetchMyJobs();
        } catch (error) {
            console.error('Error deleting job:', error);
            alert(error.response?.data?.message || 'Failed to delete job');
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const filteredJobs = jobs.filter(job => 
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.location.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center h-96 glass-card">
                <div className="w-12 h-12 rounded-full border-4 border-[#00d9ff]/10 border-t-[#00d9ff] animate-spin"></div>
                <p className="mt-4 text-[#a0aec0] font-bold text-xs uppercase tracking-widest">Accessing Records...</p>
            </div>
        );
    }

    return (
        <div className="space-y-8 animate-fade-in">
            {/* Header Area */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
                <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00d9ff]/10 border border-[#00d9ff]/20 text-[#00d9ff] text-[10px] font-bold tracking-widest uppercase mb-4">
                        <Briefcase className="w-3 h-3" />
                        Job Management
                    </div>
                    <h2 className="text-4xl font-extrabold text-white tracking-tight">Active Postings</h2>
                    <p className="text-[#a0aec0] mt-2 font-medium">Review and manage your current professional opportunities.</p>
                </div>
                <Link to="/recruiter/post-job">
                    <Button className="btn-primary px-8 py-4 h-auto shadow-xl shadow-[#00d9ff]/20 flex items-center gap-2">
                        <Plus className="w-5 h-5" /> Post New Job
                    </Button>
                </Link>
            </div>

            {/* Filter & Search Bar */}
            <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#a0aec0] group-focus-within:text-[#00d9ff] transition-colors" />
                    <input
                        type="text"
                        placeholder="Search by title or location..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-white/5 border border-white/5 text-white pl-12 pr-4 py-3.5 rounded-xl focus:outline-none focus:border-[#00d9ff]/30 transition-all placeholder:text-[#a0aec0]/30 font-medium"
                    />
                </div>
                <button className="px-6 py-3 rounded-xl bg-white/5 border border-white/5 text-[#a0aec0] hover:text-white transition-all flex items-center gap-2 font-bold text-sm">
                    <Filter className="w-4 h-4" /> Filters
                </button>
            </div>

            {jobs.length === 0 ? (
                <div className="glass-card py-24 text-center">
                    <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Sparkles className="w-10 h-10 text-[#a0aec0]/30" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">No Postings Found</h3>
                    <p className="text-[#a0aec0] max-w-sm mx-auto mb-10 font-medium">You haven't listed any job opportunities yet. Start building your team today.</p>
                    <Link to="/recruiter/post-job">
                        <Button className="btn-primary px-10 py-4 h-auto">Launch Your First Posting</Button>
                    </Link>
                </div>
            ) : (
                <div className="glass-card overflow-hidden border-white/5">
                    <div className="overflow-x-auto overflow-y-hidden">
                        <table className="w-full min-w-[1000px]">
                            <thead>
                                <tr className="border-b border-white/5 bg-white/[0.02]">
                                    <th className="px-8 py-5 text-left text-[10px] font-black text-[#a0aec0] uppercase tracking-[0.2em]">Job Information</th>
                                    <th className="px-8 py-5 text-left text-[10px] font-black text-[#a0aec0] uppercase tracking-[0.2em]">Location</th>
                                    <th className="px-8 py-5 text-left text-[10px] font-black text-[#a0aec0] uppercase tracking-[0.2em]">Posted Date</th>
                                    <th className="px-8 py-5 text-left text-[10px] font-black text-[#a0aec0] uppercase tracking-[0.2em]">Engagement</th>
                                    <th className="px-8 py-5 text-right text-[10px] font-black text-[#a0aec0] uppercase tracking-[0.2em]">Operations</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {filteredJobs.map((job, index) => (
                                    <tr key={job._id} className="group hover:bg-white/[0.02] transition-colors relative">
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#00d9ff]/10 to-transparent border border-[#00d9ff]/20 flex items-center justify-center text-[#00d9ff] font-black">
                                                    {job.title.charAt(0)}
                                                </div>
                                                <div>
                                                    <div className="font-bold text-white text-lg group-hover:text-[#00d9ff] transition-colors">{job.title}</div>
                                                    <div className="text-[#a0aec0] text-xs font-bold uppercase tracking-wider mt-1">{job.jobType} • {job.position} {job.position === 1 ? 'opening' : 'openings'}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-2 text-[#a0aec0] font-medium">
                                                <MapPin className="w-4 h-4 text-[#7c3aed]" />
                                                {job.location}
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-2 text-[#a0aec0] font-medium">
                                                <Calendar className="w-4 h-4 text-[#ec4899]" />
                                                {formatDate(job.createdAt)}
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <Link
                                                to={`/recruiter/jobs/${job._id}/applicants`}
                                                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#00d9ff]/5 border border-[#00d9ff]/10 text-[#00d9ff] hover:bg-[#00d9ff]/10 transition-all font-bold text-xs"
                                            >
                                                <Users className="w-4 h-4" />
                                                {job.applications?.length || 0} Applicants
                                            </Link>
                                        </td>
                                        <td className="px-8 py-6 text-right">
                                            <div className="flex justify-end gap-3 opacity-60 group-hover:opacity-100 transition-opacity">
                                                <Link to={`/jobs/${job._id}`} title="Preview Role">
                                                    <button className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-[#a0aec0] hover:text-[#7c3aed] hover:bg-[#7c3aed]/10 transition-all border border-white/5">
                                                        <Eye className="w-5 h-5" />
                                                    </button>
                                                </Link>
                                                <button 
                                                    onClick={() => navigate(`/recruiter/edit-job/${job._id}`)}
                                                    className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-[#a0aec0] hover:text-[#00d9ff] hover:bg-[#00d9ff]/10 transition-all border border-white/5"
                                                    title="Modify Details"
                                                >
                                                    <Edit className="w-5 h-5" />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(job._id)}
                                                    className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-[#a0aec0] hover:text-[#ec4899] hover:bg-[#ec4899]/10 transition-all border border-white/5"
                                                    title="Remove Posting"
                                                >
                                                    <Trash2 className="w-5 h-5" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyJobs;
