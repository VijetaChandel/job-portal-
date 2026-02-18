import { useState, useEffect } from 'react';
import { Edit, Trash2, Users, Eye } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import axios from 'axios';

const MyJobs = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetchMyJobs();
    }, []);

    const fetchMyJobs = async () => {
        try {
            console.log('Fetching my jobs...');
            const response = await axios.get('/api/v1/job/getadminjobs', {
                withCredentials: true
            });
            console.log('Jobs fetched:', response.data);
            setJobs(response.data.jobs || []);
        } catch (error) {
            console.error('Error fetching jobs:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (jobId) => {
        if (!confirm('Are you sure you want to delete this job?')) return;

        try {
            await axios.delete(`/api/v1/job/delete/${jobId}`, {
                withCredentials: true
            });
            // Refresh the jobs list
            fetchMyJobs();
            alert('Job deleted successfully');
        } catch (error) {
            console.error('Error deleting job:', error);
            alert(error.response?.data?.message || 'Failed to delete job');
        }
    };

    const handleEdit = (jobId) => {
        navigate(`/recruiter/edit-job/${jobId}`);
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
            <div className="flex items-center justify-center h-64">
                <div className="text-gray-500">Loading jobs...</div>
            </div>
        );
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">My Jobs</h2>
                <Link to="/recruiter/post-job">
                    <Button>Post New Job</Button>
                </Link>
            </div>

            {jobs.length === 0 ? (
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
                    <p className="text-gray-500 mb-4">You haven't posted any jobs yet.</p>
                    <Link to="/recruiter/post-job">
                        <Button>Post Your First Job</Button>
                    </Link>
                </div>
            ) : (
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-x-auto">
                    <table className="w-full min-w-max">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Job Title</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Posted Date</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Applicants</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {jobs.map((job) => (
                                <tr key={job._id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="font-medium text-gray-900">{job.title}</div>
                                        <div className="text-gray-500 text-sm">{job.jobType} • {job.position} {job.position === 1 ? 'position' : 'positions'}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {job.location}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {formatDate(job.createdAt)}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <Link
                                            to={`/recruiter/jobs/${job._id}/applicants`}
                                            className="text-blue-600 hover:text-blue-900 flex items-center gap-1 hover:underline"
                                        >
                                            <Users className="w-4 h-4" />
                                            {job.applications?.length || 0} Applicants
                                        </Link>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <div className="flex justify-end gap-2">
                                            <Link to={`/jobs/${job._id}`}>
                                                <button
                                                    className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
                                                    title="View Job"
                                                >
                                                    <Eye className="w-5 h-5" />
                                                </button>
                                            </Link>
                                            <button
                                                onClick={() => handleEdit(job._id)}
                                                className="p-1 text-gray-400 hover:text-indigo-600 transition-colors"
                                                title="Edit Job"
                                            >
                                                <Edit className="w-5 h-5" />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(job._id)}
                                                className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                                                title="Delete Job"
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
            )
            }
        </div >
    );
};

export default MyJobs;
