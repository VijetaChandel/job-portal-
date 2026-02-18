import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MapPin, DollarSign, Clock, Briefcase, Building2, Users, Calendar, Upload, CheckCircle } from 'lucide-react';
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
        // Pre-fill user data if available
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

            const response = await axios.post(`/api/v1/application/apply/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
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
            <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
                <Navbar />
                <div className="pt-24 flex items-center justify-center h-96">
                    <div className="text-gray-500">Loading job details...</div>
                </div>
            </div>
        );
    }

    if (!job) {
        return (
            <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
                <Navbar />
                <div className="pt-24 flex items-center justify-center h-96">
                    <div className="text-gray-500">Job not found</div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
            <Navbar />

            <main className="pt-24 pb-16">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-8 mb-6">
                        <div className="flex justify-between items-start mb-6">
                            <div className="flex gap-6">
                                <div className="w-20 h-20 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center text-3xl font-bold">
                                    {job.company?.name?.charAt(0) || 'C'}
                                </div>
                                <div>
                                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{job.title}</h1>
                                    <div className="flex items-center gap-4 text-gray-600 dark:text-gray-400">
                                        <span className="flex items-center gap-1">
                                            <Building2 className="w-4 h-4" />
                                            {job.company?.name || 'Company Name'}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <MapPin className="w-4 h-4" />
                                            {job.location}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <Button onClick={handleApplyClick} size="lg" className="px-8">
                                Apply Now
                            </Button>
                        </div>

                        <div className="flex flex-wrap gap-3">
                            <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-blue-50 text-blue-700 border border-blue-100">
                                <Briefcase className="w-4 h-4 mr-2" />
                                {job.jobType}
                            </span>
                            <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-green-50 text-green-700 border border-green-100">
                                <DollarSign className="w-4 h-4 mr-2" />
                                {job.salary ? `₹${job.salary.toLocaleString()}` : 'Competitive'}
                            </span>
                            <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-purple-50 text-purple-700 border border-purple-100">
                                <Users className="w-4 h-4 mr-2" />
                                {job.experienceLevel} years exp
                            </span>
                            <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border border-gray-100 dark:border-gray-600">
                                <Calendar className="w-4 h-4 mr-2" />
                                {job.position} {job.position === 1 ? 'position' : 'positions'}
                            </span>
                        </div>
                    </div>

                    {/* Job Details */}
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-8">
                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Job Description</h2>
                            <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">{job.description}</p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Requirements</h2>
                            <ul className="space-y-2">
                                {job.requirements?.map((req, index) => (
                                    <li key={index} className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                                        <span className="text-blue-600 mt-1">•</span>
                                        <span>{req}</span>
                                    </li>
                                ))}
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">About the Company</h2>
                            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                                {job.company?.description || 'Join our team and be part of an innovative company that values growth and collaboration.'}
                            </p>
                        </section>

                        <div className="mt-8 pt-8 border-t border-gray-100 dark:border-gray-700">
                            <Button onClick={handleApplyClick} size="lg" className="w-full md:w-auto px-12">
                                Apply for this Position
                            </Button>
                        </div>
                    </div>
                </div>
            </main>

            {/* Application Modal */}
            {showApplicationModal && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        {applicationSuccess ? (
                            <div className="p-12 text-center">
                                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <CheckCircle className="w-12 h-12 text-green-600" />
                                </div>
                                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Application Submitted!</h2>
                                <p className="text-gray-600 dark:text-gray-400 text-lg">
                                    Your application has been successfully submitted. We'll review it and get back to you soon.
                                </p>
                            </div>
                        ) : (
                            <>
                                <div className="p-6 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
                                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Apply for {job.title}</h2>
                                    <button onClick={() => setShowApplicationModal(false)} className="text-gray-400 hover:text-gray-600">
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>

                                <form onSubmit={handleSubmitApplication} className="p-6 space-y-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Full Name</label>
                                        <input
                                            type="text"
                                            value={applicationData.fullName}
                                            onChange={(e) => setApplicationData(prev => ({ ...prev, fullName: e.target.value }))}
                                            className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                            required
                                            disabled
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email</label>
                                        <input
                                            type="email"
                                            value={applicationData.email}
                                            onChange={(e) => setApplicationData(prev => ({ ...prev, email: e.target.value }))}
                                            className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                            required
                                            disabled
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Phone Number</label>
                                        <input
                                            type="tel"
                                            value={applicationData.phone}
                                            onChange={(e) => setApplicationData(prev => ({ ...prev, phone: e.target.value }))}
                                            className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                            required
                                            disabled
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Cover Letter (Optional)</label>
                                        <textarea
                                            value={applicationData.coverLetter}
                                            onChange={(e) => setApplicationData(prev => ({ ...prev, coverLetter: e.target.value }))}
                                            rows={4}
                                            className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                            placeholder="Tell us why you're a great fit for this role..."
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Resume <span className="text-red-500">*</span>
                                        </label>
                                        <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center hover:border-blue-400 transition-colors">
                                            <input
                                                type="file"
                                                id="resume"
                                                accept=".pdf,.doc,.docx"
                                                onChange={handleFileChange}
                                                className="hidden"
                                                required
                                            />
                                            <label htmlFor="resume" className="cursor-pointer">
                                                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                                                <p className="text-gray-600 dark:text-gray-400 font-medium mb-1">
                                                    {applicationData.resume ? applicationData.resume.name : 'Click to upload resume'}
                                                </p>
                                                <p className="text-sm text-gray-500 dark:text-gray-400">PDF or DOCX (Max 5MB)</p>
                                            </label>
                                        </div>
                                    </div>

                                    <div className="flex gap-4 pt-4">
                                        <Button
                                            type="button"
                                            variant="outline"
                                            onClick={() => setShowApplicationModal(false)}
                                            className="flex-1"
                                        >
                                            Cancel
                                        </Button>
                                        <Button
                                            type="submit"
                                            disabled={applying || !applicationData.resume}
                                            className="flex-1"
                                        >
                                            {applying ? 'Submitting...' : 'Submit Application'}
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
