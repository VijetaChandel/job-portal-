import React from 'react';
import JobCard from '../ui/JobCard';
import { Button } from '../ui/Button';
import { Link } from 'react-router-dom';

const MOCK_JOBS = [
    {
        id: 1,
        title: 'Senior Frontend Engineer',
        company: 'TechCorp',
        location: 'Remote',
        type: 'Full-time',
        salary: '$120k - $160k',
        level: 'Senior',
    },
    {
        id: 2,
        title: 'Product Designer',
        company: 'Creative Studio',
        location: 'San Francisco, CA',
        type: 'Full-time',
        salary: '$100k - $140k',
        level: 'Mid-Level',
    },
    {
        id: 3,
        title: 'Backend Developer',
        company: 'DataSystems',
        location: 'New York, NY',
        type: 'Contract',
        salary: '$80 - $120 / hr',
        level: 'Senior',
    },
    {
        id: 4,
        title: 'Marketing Manager',
        company: 'Growth.io',
        location: 'Austin, TX',
        type: 'Full-time',
        salary: '$90k - $120k',
        level: 'Mid-Level',
    },
];

const FeaturedJobs = () => {
    return (
        <section className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-end mb-12">
                    <div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Jobs</h2>
                        <p className="text-gray-600 max-w-2xl">
                            Discover your next career move with our curated list of top positions from industry-leading companies.
                        </p>
                    </div>
                    <Link to="/jobs" className="hidden md:block">
                        <Button variant="link">View All Jobs &rarr;</Button>
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {MOCK_JOBS.map((job) => (
                        <JobCard key={job.id} job={job} />
                    ))}
                </div>

                <div className="mt-12 text-center md:hidden">
                    <Link to="/jobs">
                        <Button variant="outline" className="w-full">View All Jobs</Button>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default FeaturedJobs;
