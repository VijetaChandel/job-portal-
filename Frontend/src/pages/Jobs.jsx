import React, { useState, useEffect } from 'react';
import { Search, MapPin, Filter, X, Briefcase, IndianRupee, Star, Sparkles } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import JobCard from '../components/ui/JobCard';
import { Button } from '../components/ui/Button';
import axios from 'axios';

const Jobs = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchKeyword, setSearchKeyword] = useState('');
    const [searchLocation, setSearchLocation] = useState('');
    const [filterJobType, setFilterJobType] = useState('');
    const [filterExperience, setFilterExperience] = useState('');
    const [filterSalary, setFilterSalary] = useState('');

    useEffect(() => {
        fetchJobs();
    }, []);

    const fetchJobs = async (keyword = '', location = '', jobType = '', experience = '', salary = '') => {
        try {
            setLoading(true);
            const response = await axios.get(`/api/v1/job/get?keyword=${keyword}&location=${location}&jobType=${jobType}&experience=${experience}&salary=${salary}`, {
                withCredentials: true
            });
            setJobs(response.data.jobs || []);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching jobs:', error);
            setLoading(false);
        }
    };

    const handleSearch = () => {
        fetchJobs(searchKeyword, searchLocation, filterJobType, filterExperience, filterSalary);
    };

    // Auto-update when filters change
    useEffect(() => {
        if (filterJobType || filterExperience || filterSalary) {
            handleSearch();
        }
    }, [filterJobType, filterExperience, filterSalary]);

    const resetFilters = () => {
        setSearchKeyword('');
        setSearchLocation('');
        setFilterJobType('');
        setFilterExperience('');
        setFilterSalary('');
        fetchJobs('', '', '', '', '');
    };

    return (
        <div className="min-h-screen bg-[#0f1419] flex flex-col relative overflow-hidden">
            {/* Background Glows */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#00d9ff]/5 rounded-full blur-[120px] -z-10"></div>
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#7c3aed]/5 rounded-full blur-[120px] -z-10"></div>

            <Navbar />

            <main className="flex-grow pt-32 pb-20">
                <div className="max-w-[1400px] mx-auto px-6">
                    {/* Header */}
                    <div className="mb-16 animate-fade-in-up">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00d9ff]/10 border border-[#00d9ff]/30 text-[#00d9ff] text-xs font-bold tracking-widest uppercase mb-6">
                            <Sparkles className="w-3 h-3" />
                            Discover Your Career
                        </div>
                        <h1 className="text-4xl lg:text-7xl font-extrabold mb-6 leading-tight">
                            Find Your Dream <span className="gradient-text">Job Today</span>
                        </h1>
                        <p className="text-[#a0aec0] text-xl max-w-3xl leading-relaxed">
                            Browse through thousands of high-impact roles from industry-leading companies and start-ups.
                        </p>
                    </div>

                    {/* Search & Filter Section */}
                    <div className="glass-card p-6 lg:p-8 mb-16 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                        <div className="flex flex-col lg:flex-row gap-6">
                            {/* Search Title */}
                            <div className="flex-1 relative group">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#a0aec0] group-focus-within:text-[#00d9ff] transition-colors" />
                                <input
                                    type="text"
                                    placeholder="Title, keyword, or company"
                                    value={searchKeyword}
                                    onChange={(e) => setSearchKeyword(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                                    className="w-full bg-white/5 border border-white/10 text-white pl-12 pr-4 py-4 rounded-xl focus:outline-none focus:border-[#00d9ff]/50 transition-all placeholder:text-[#a0aec0]/40 font-medium"
                                />
                            </div>

                            {/* Search Location */}
                            <div className="flex-1 relative group">
                                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#a0aec0] group-focus-within:text-[#00d9ff] transition-colors" />
                                <input
                                    type="text"
                                    placeholder="Location"
                                    value={searchLocation}
                                    onChange={(e) => setSearchLocation(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                                    className="w-full bg-white/5 border border-white/10 text-white pl-12 pr-4 py-4 rounded-xl focus:outline-none focus:border-[#00d9ff]/50 transition-all placeholder:text-[#a0aec0]/40 font-medium"
                                />
                            </div>

                            <Button onClick={handleSearch} className="btn-primary px-10 py-4 h-auto shadow-lg shadow-[#00d9ff]/20">
                                Search Jobs
                            </Button>
                        </div>

                        {/* Filters Row */}
                        <div className="mt-10 flex flex-wrap items-center gap-6 pt-8 border-t border-white/5">
                            <div className="flex items-center gap-2 text-[#a0aec0] font-bold text-sm uppercase tracking-wider mr-4">
                                <Filter className="w-4 h-4" />
                                Filters
                            </div>

                            <div className="flex flex-wrap gap-4 flex-grow">
                                <select
                                    value={filterJobType}
                                    onChange={(e) => setFilterJobType(e.target.value)}
                                    className="bg-white/5 border border-white/10 text-[#f1f5f9] px-4 py-2.5 rounded-xl text-sm font-semibold focus:outline-none focus:border-[#00d9ff]/50 transition-all"
                                >
                                    <option value="" className="bg-[#0f1419]">All Types</option>
                                    <option value="Full-time" className="bg-[#0f1419]">Full-time</option>
                                    <option value="Part-time" className="bg-[#0f1419]">Part-time</option>
                                    <option value="Internship" className="bg-[#0f1419]">Internship</option>
                                    <option value="Contract" className="bg-[#0f1419]">Contract</option>
                                </select>

                                <select
                                    value={filterExperience}
                                    onChange={(e) => setFilterExperience(e.target.value)}
                                    className="bg-white/5 border border-white/10 text-[#f1f5f9] px-4 py-2.5 rounded-xl text-sm font-semibold focus:outline-none focus:border-[#00d9ff]/50 transition-all"
                                >
                                    <option value="" className="bg-[#0f1419]">Experience</option>
                                    <option value="0" className="bg-[#0f1419]">Entry (0y)</option>
                                    <option value="1" className="bg-[#0f1419]">1y+</option>
                                    <option value="3" className="bg-[#0f1419]">3y+</option>
                                    <option value="5" className="bg-[#0f1419]">5y+</option>
                                </select>

                                <select
                                    value={filterSalary}
                                    onChange={(e) => setFilterSalary(e.target.value)}
                                    className="bg-white/5 border border-white/10 text-[#f1f5f9] px-4 py-2.5 rounded-xl text-sm font-semibold focus:outline-none focus:border-[#00d9ff]/50 transition-all"
                                >
                                    <option value="" className="bg-[#0f1419]">Salary</option>
                                    <option value="0-300000" className="bg-[#0f1419]">Below 3L</option>
                                    <option value="300000-600000" className="bg-[#0f1419]">3L - 6L</option>
                                    <option value="600000-1200000" className="bg-[#0f1419]">6L - 12L</option>
                                    <option value="1200000" className="bg-[#0f1419]">12L+</option>
                                </select>
                            </div>

                            <button
                                onClick={resetFilters}
                                className="flex items-center gap-2 text-[#a0aec0] hover:text-[#ec4899] text-sm font-bold transition-colors group"
                            >
                                <X className="w-4 h-4 group-hover:rotate-90 transition-transform" />
                                Reset All
                            </button>
                        </div>
                    </div>

                    {/* Results Count & Sort */}
                    <div className="flex justify-between items-center mb-8 px-2 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                        <p className="text-[#a0aec0]">
                            Showing <span className="text-white font-bold">{jobs.length}</span> opportunities
                        </p>
                    </div>

                    {/* Job Grid */}
                    <div className="animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                        {loading ? (
                            <div className="text-center py-32 glass-card">
                                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full border-4 border-[#00d9ff]/10 border-t-[#00d9ff] animate-spin mb-4"></div>
                                <p className="text-[#a0aec0] font-bold">Scanning database...</p>
                            </div>
                        ) : jobs.length === 0 ? (
                            <div className="text-center py-32 glass-card">
                                <Briefcase className="w-16 h-16 text-[#a0aec0]/20 mx-auto mb-6" />
                                <h3 className="text-2xl font-bold text-white mb-2">No Matches Found</h3>
                                <p className="text-[#a0aec0]">Try refining your search keywords or location.</p>
                                <Button onClick={resetFilters} variant="outline" className="mt-8 border-white/10 hover:bg-white/5">
                                    Clear All Filters
                                </Button>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {jobs.map((job) => (
                                    <JobCard key={job._id} job={job} />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default Jobs;
