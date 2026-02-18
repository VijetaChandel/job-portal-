import { useState, useEffect } from 'react';
import { Search, MapPin } from 'lucide-react';
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

    return (
        <div className="min-h-screen bg-white dark:bg-gray-950">
            <Navbar />
            <main className="pt-20">
                <section className="py-12 bg-gray-50 dark:bg-gray-900 min-h-[calc(100vh-80px)]">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="mb-8">
                            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Find Your Dream Job</h1>
                            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
                                Browse our curated list of positions from top companies.
                            </p>

                            {/* Search Bar */}
                            <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 mb-8">
                                <div className="flex flex-col md:flex-row gap-4">
                                    <div className="flex-1 flex items-center px-4 h-12 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100 transition-all">
                                        <Search className="w-5 h-5 text-gray-400 mr-3" />
                                        <input
                                            type="text"
                                            placeholder="Job title, keywords, or company"
                                            value={searchKeyword}
                                            onChange={(e) => setSearchKeyword(e.target.value)}
                                            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                                            className="w-full bg-transparent focus:outline-none text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                                        />
                                    </div>
                                    <div className="flex-1 flex items-center px-4 h-12 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100 transition-all">
                                        <MapPin className="w-5 h-5 text-gray-400 mr-3" />
                                        <input
                                            type="text"
                                            placeholder="City, state, or zip code"
                                            value={searchLocation}
                                            onChange={(e) => setSearchLocation(e.target.value)}
                                            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                                            className="w-full bg-transparent focus:outline-none text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                                        />
                                    </div>
                                    <Button onClick={handleSearch} size="lg" className="h-12 w-full md:w-auto px-8">
                                        Search
                                    </Button>
                                </div>

                                {/* Advanced Filters */}
                                <div className="mt-6 flex flex-wrap gap-4 pt-6 border-t border-gray-100 dark:border-gray-700">
                                    <div className="flex-1 min-w-[150px]">
                                        <label className="block text-xs font-bold text-gray-400 dark:text-gray-500 uppercase mb-2 tracking-wider">Job Type</label>
                                        <select
                                            value={filterJobType}
                                            onChange={(e) => setFilterJobType(e.target.value)}
                                            className="w-full h-10 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all font-medium text-gray-700 dark:text-gray-200"
                                        >
                                            <option value="">All Types</option>
                                            <option value="Full-time">Full-time</option>
                                            <option value="Part-time">Part-time</option>
                                            <option value="Internship">Internship</option>
                                            <option value="Contract">Contract</option>
                                        </select>
                                    </div>

                                    <div className="flex-1 min-w-[150px]">
                                        <label className="block text-xs font-bold text-gray-400 dark:text-gray-500 uppercase mb-2 tracking-wider">Experience</label>
                                        <select
                                            value={filterExperience}
                                            onChange={(e) => setFilterExperience(e.target.value)}
                                            className="w-full h-10 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all font-medium text-gray-700 dark:text-gray-200"
                                        >
                                            <option value="">Any Experience</option>
                                            <option value="0">Entry Level (0 years)</option>
                                            <option value="1">1 year</option>
                                            <option value="2">2 years</option>
                                            <option value="3">3+ years</option>
                                            <option value="5">5+ years</option>
                                        </select>
                                    </div>

                                    <div className="flex-1 min-w-[150px]">
                                        <label className="block text-xs font-bold text-gray-400 dark:text-gray-500 uppercase mb-2 tracking-wider">Salary Range</label>
                                        <select
                                            value={filterSalary}
                                            onChange={(e) => setFilterSalary(e.target.value)}
                                            className="w-full h-10 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all font-medium text-gray-700 dark:text-gray-200"
                                        >
                                            <option value="">Any Salary</option>
                                            <option value="0-300000">₹0 - ₹3L</option>
                                            <option value="300000-600000">₹3L - ₹6L</option>
                                            <option value="600000-1200000">₹6L - ₹12L</option>
                                            <option value="1200000">₹12L+</option>
                                        </select>
                                    </div>

                                    <div className="flex items-end">
                                        <button
                                            onClick={() => {
                                                setSearchKeyword('');
                                                setSearchLocation('');
                                                setFilterJobType('');
                                                setFilterExperience('');
                                                setFilterSalary('');
                                                fetchJobs('', '', '', '', '');
                                            }}
                                            className="h-10 px-4 text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-red-500 transition-colors"
                                        >
                                            Reset
                                        </button>
                                    </div>
                                </div>

                                <div className="mt-4 flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 flex-wrap">
                                    <span className="font-medium">Popular:</span>
                                    {['Software Engineer', 'Product Manager', 'Data Scientist', 'Designer'].map((term) => (
                                        <button
                                            key={term}
                                            onClick={() => {
                                                setSearchKeyword(term);
                                                fetchJobs(term);
                                            }}
                                            className="px-3 py-1 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full transition-colors text-gray-700 dark:text-gray-300"
                                        >
                                            {term}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {loading ? (
                            <div className="text-center py-12">
                                <div className="text-gray-500 dark:text-gray-400">Loading jobs...</div>
                            </div>
                        ) : jobs.length === 0 ? (
                            <div className="text-center py-12">
                                <div className="text-gray-500 dark:text-gray-400">No jobs found. Try a different search.</div>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {jobs.map((job) => (
                                    <JobCard key={job._id} job={job} />
                                ))}
                            </div>
                        )}
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default Jobs;
