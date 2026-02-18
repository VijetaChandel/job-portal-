import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Download, Check, X, FileText, Mail, Phone, Calendar } from 'lucide-react';
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
        // Open resume in new tab
        const resumeUrl = `http://localhost:8000/${resumePath}`;
        window.open(resumeUrl, '_blank');
    };

    const handleUpdateStatus = async (applicationId, status) => {
        try {
            await axios.post(`/api/v1/application/status/${applicationId}/update`,
                { status },
                { withCredentials: true }
            );
            // Refresh applicants list
            fetchApplicants();
            alert(`Application ${status.toLowerCase()} successfully`);
        } catch (error) {
            console.error('Error updating status:', error);
            alert(error.response?.data?.message || 'Failed to update status');
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
            <div className="flex items-center justify-center h-64">
                <div className="text-gray-500">Loading applicants...</div>
            </div>
        );
    }

    return (
        <div>
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Applicants for {jobTitle}</h2>
                <p className="text-gray-500 mt-1">{applicants.length} total applicants</p>
            </div>

            {applicants.length === 0 ? (
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
                    <p className="text-gray-500">No applicants yet for this job.</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {applicants.map((application) => (
                        <div
                            key={application._id}
                            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
                        >
                            <div className="flex justify-between items-start">
                                <div className="flex-1">
                                    <div className="flex items-start justify-between mb-4">
                                        <div>
                                            <h3 className="text-lg font-bold text-gray-900">
                                                {application.applicant?.fullname || 'Applicant'}
                                            </h3>
                                            <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-600">
                                                <span className="flex items-center gap-1">
                                                    <Mail className="w-4 h-4" />
                                                    {application.applicant?.email}
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <Phone className="w-4 h-4" />
                                                    {application.applicant?.phoneNumber || 'N/A'}
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <Calendar className="w-4 h-4" />
                                                    Applied {formatDate(application.createdAt)}
                                                </span>
                                            </div>
                                        </div>
                                        <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${application.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                            application.status === 'accepted' ? 'bg-green-100 text-green-800' :
                                                application.status === 'rejected' ? 'bg-red-100 text-red-800' :
                                                    'bg-blue-100 text-blue-800'
                                            }`}>
                                            {application.status?.charAt(0).toUpperCase() + application.status?.slice(1)}
                                        </span>
                                    </div>

                                    {application.coverLetter && (
                                        <div className="mb-4 p-4 bg-gray-50 rounded-lg">
                                            <p className="text-sm font-medium text-gray-700 mb-1">Cover Letter:</p>
                                            <p className="text-sm text-gray-600">{application.coverLetter}</p>
                                        </div>
                                    )}

                                    <div className="flex gap-3">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => handleDownloadResume(application.resume)}
                                            className="flex items-center gap-2"
                                        >
                                            <FileText className="w-4 h-4" />
                                            View Resume
                                        </Button>

                                        {application.status === 'pending' && (
                                            <>
                                                <Button
                                                    size="sm"
                                                    onClick={() => handleUpdateStatus(application._id, 'accepted')}
                                                    className="flex items-center gap-2 bg-green-600 hover:bg-green-700"
                                                >
                                                    <Check className="w-4 h-4" />
                                                    Accept
                                                </Button>
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => handleUpdateStatus(application._id, 'rejected')}
                                                    className="flex items-center gap-2 text-red-600 border-red-200 hover:bg-red-50"
                                                >
                                                    <X className="w-4 h-4" />
                                                    Reject
                                                </Button>
                                            </>
                                        )}
                                    </div>
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
