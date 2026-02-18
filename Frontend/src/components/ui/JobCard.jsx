import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Clock, DollarSign, Bookmark, Building2, Briefcase } from 'lucide-react';
import { Button } from '../ui/Button';

const JobCard = ({ job }) => {
    // Generate a consistent color based on company name (simple hash)
    const getLogoColor = (name) => {
        const colors = [
            'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400',
            'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400',
            'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400',
            'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400',
            'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400',
            'bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400',
            'bg-pink-100 text-pink-600 dark:bg-pink-900/30 dark:text-pink-400',
            'bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400',
        ];
        let hash = 0;
        for (let i = 0; i < name.length; i++) {
            hash = name.charCodeAt(i) + ((hash << 5) - hash);
        }
        return colors[Math.abs(hash) % colors.length];
    };

    // Extract company name from object or string
    const companyName = typeof job.company === 'object' && job.company?.name
        ? job.company.name
        : (job.company || 'Company');

    const logoColorClass = getLogoColor(companyName);
    const jobId = job._id || job.id;

    return (
        <div className="group bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-6 flex flex-col h-full hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            {/* Header */}
            <div className="flex justify-between items-start mb-6">
                <div className="flex gap-4">
                    <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-2xl font-bold ${logoColorClass}`}>
                        {companyName.charAt(0)}
                    </div>
                    <div>
                        <h3 className="font-bold text-xl text-gray-900 dark:text-white leading-tight group-hover:text-blue-600 transition-colors mb-1">
                            {job.title}
                        </h3>
                        <p className="text-gray-500 dark:text-gray-400 font-medium text-sm flex items-center gap-1">
                            <Building2 className="w-3.5 h-3.5" />
                            {companyName}
                        </p>
                    </div>
                </div>
                <button className="text-gray-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30 p-2 rounded-full transition-all">
                    <Bookmark className="w-5 h-5" />
                </button>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border border-blue-100 dark:border-blue-800">
                    <Briefcase className="w-3 h-3 mr-1" />
                    {job.type || job.jobType}
                </span>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 border border-purple-100 dark:border-purple-800">
                    {job.level || job.experienceLevel + ' years'}
                </span>
            </div>

            {/* Details */}
            <div className="space-y-3 mb-6 flex-grow">
                <div className="flex items-center text-gray-600 dark:text-gray-400 text-sm">
                    <MapPin className="w-4 h-4 mr-3 text-gray-400 dark:text-gray-500" />
                    {job.location}
                </div>
                <div className="flex items-center text-gray-600 dark:text-gray-400 text-sm">
                    <DollarSign className="w-4 h-4 mr-3 text-gray-400 dark:text-gray-500" />
                    {job.salary ? (typeof job.salary === 'number' ? `₹${job.salary.toLocaleString()}` : job.salary) : 'Competitive'}
                </div>
                <div className="flex items-center text-gray-600 dark:text-gray-400 text-sm">
                    <Clock className="w-4 h-4 mr-3 text-gray-400 dark:text-gray-500" />
                    Posted 2 days ago
                </div>
            </div>

            {/* Footer */}
            <div className="pt-4 border-t border-gray-50 dark:border-gray-700 mt-auto">
                <div className="grid grid-cols-2 gap-3">
                    <Link to={`/jobs/${jobId}`} className="w-full">
                        <Button variant="outline" className="w-full hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-blue-900/30 dark:hover:text-blue-300">
                            Details
                        </Button>
                    </Link>
                    <Link to={`/jobs/${jobId}`} className="w-full">
                        <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg transform transition-all active:scale-95">
                            Apply Now
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default JobCard;
