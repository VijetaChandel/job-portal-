import React from 'react';
import JobCard from '../ui/JobCard';
import { Button } from '../ui/Button';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const MOCK_JOBS = [
    {
        id: 1,
        title: 'Senior Designer',
        company: 'Google',
        location: 'Mountain View, CA',
        type: 'Full-time',
        salary: '$150k - $210k',
        level: 'Senior',
        isFeatured: true,
    },
    {
        id: 2,
        title: 'ML Engineer',
        company: 'Meta',
        location: 'Remote',
        type: 'Full-time',
        salary: '$140k - $200k',
        level: 'Mid-Level',
        isNew: true,
    },
    {
        id: 3,
        title: 'Frontend Lead',
        company: 'Netflix',
        location: 'Los Gatos, CA',
        type: 'Full-time',
        salary: '$180k - $240k',
        level: 'Lead',
    },
    {
        id: 4,
        title: 'Backend Dev',
        company: 'Amazon',
        location: 'Seattle, WA',
        type: 'Contract',
        salary: '$120 - $160 / hr',
        level: 'Senior',
    },
];

const FeaturedJobs = () => {
    return (
        <section className="py-24 relative">
            <div className="max-w-[1400px] mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                    <div className="animate-fade-in-up">
                        <h2 className="text-4xl lg:text-6xl font-extrabold mb-6">
                            Featured <span className="gradient-text">Opportunities</span>
                        </h2>
                        <p className="text-[#a0aec0] text-xl max-w-2xl">
                            Hand-picked roles from top companies. Your next career milestone is just one click away.
                        </p>
                    </div>
                    <Link to="/jobs" className="group">
                        <Button variant="ghost" className="text-[#00d9ff] hover:text-[#7c3aed] text-lg font-bold flex items-center gap-2 group-hover:translate-x-2 transition-all">
                            View All Jobs <ArrowRight className="w-5 h-5" />
                        </Button>
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {MOCK_JOBS.map((job) => (
                        <JobCard key={job.id} job={job} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturedJobs;

