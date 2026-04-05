import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Clock, DollarSign, Bookmark, Building2, Briefcase } from 'lucide-react';
import { Button } from '../ui/Button';

const JobCard = ({ job }) => {
    const companyName = typeof job.company === 'object' && job.company?.name
        ? job.company.name
        : (job.company || 'Company');

    const jobId = job._id || job.id;

    return (
        <div className="glass-card p-6 flex flex-col h-full hover:border-[#00d9ff] hover:-translate-y-2.5 transition-all duration-300 group hover:shadow-[0_25px_50px_rgba(0,217,255,0.2)]">
            {/* Badge */}
            <div className="flex justify-between items-start mb-6">
                <div className="flex gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#00d9ff] to-[#7c3aed] flex items-center justify-center text-white text-xl font-bold shadow-lg shadow-[#00d9ff]/20">
                        {companyName.charAt(0)}
                    </div>
                    <div>
                        <h3 className="font-bold text-xl text-[#f1f5f9] leading-tight mb-1 group-hover:text-[#00d9ff] transition-colors">
                            {job.title}
                        </h3>
                        <p className="text-[#a0aec0] font-medium text-sm flex items-center gap-1">
                            <Building2 className="w-3.5 h-3.5" />
                            {companyName}
                        </p>
                    </div>
                </div>
                {job.isFeatured && (
                    <span className="px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase bg-[#00d9ff]/10 text-[#00d9ff] border border-[#00d9ff]/30">
                        Featured
                    </span>
                )}
                {job.isNew && (
                    <span className="px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase bg-[#7c3aed]/10 text-[#7c3aed] border border-[#7c3aed]/30">
                        New
                    </span>
                )}
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
                <span className="inline-flex items-center px-3 py-1 rounded-lg text-xs font-semibold bg-white/5 text-[#00d9ff] border border-white/10">
                    {job.type || job.jobType}
                </span>
                <span className="inline-flex items-center px-3 py-1 rounded-lg text-xs font-semibold bg-white/5 text-[#7c3aed] border border-white/10">
                    {job.level || job.experienceLevel}
                </span>
            </div>

            {/* Details */}
            <div className="space-y-4 mb-8 flex-grow">
                <div className="flex items-center text-[#a0aec0] text-sm">
                    <MapPin className="w-4 h-4 mr-3 text-[#00d9ff]" />
                    {job.location}
                </div>
                <div className="flex items-center text-[#a0aec0] text-sm">
                    <DollarSign className="w-4 h-4 mr-3 text-[#00d9ff]" />
                    <span className="text-[#f1f5f9] font-bold">{job.salary || 'Competitive'}</span>
                </div>
            </div>

            {/* Footer */}
            <div className="pt-6 border-t border-white/5 mt-auto">
                <div className="flex justify-between items-center gap-4">
                    <Link to={`/jobs/${jobId}`} className="flex-1">
                        <Button className="w-full btn-primary py-3 text-sm">
                            Apply Now
                        </Button>
                    </Link>
                    <button className="text-[#a0aec0] hover:text-[#ec4899] transition-colors p-2">
                        <Bookmark className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default JobCard;

