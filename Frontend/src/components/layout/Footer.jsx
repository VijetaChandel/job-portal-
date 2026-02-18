import React from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, Facebook, Twitter, Instagram, Linkedin, Mail } from 'lucide-react';
import { Button } from '../ui/Button';

const Footer = () => {
    return (
        <footer className="bg-gray-900 dark:bg-gray-950 text-white pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    {/* Brand */}
                    <div className="space-y-4">
                        <Link to="/" className="flex items-center gap-2">
                            <div className="bg-blue-600 p-1.5 rounded-lg">
                                <Briefcase className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-xl font-bold">JobPortal</span>
                        </Link>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            Connecting exceptional talent with world-class employers. Your future starts here.
                        </p>
                        <div className="flex gap-4 pt-2">
                            <a href="#" className="text-gray-400 hover:text-white transition-colors"><Facebook className="w-5 h-5" /></a>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors"><Twitter className="w-5 h-5" /></a>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors"><Instagram className="w-5 h-5" /></a>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors"><Linkedin className="w-5 h-5" /></a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="font-semibold text-lg mb-4">For Candidates</h3>
                        <ul className="space-y-3 text-gray-400 text-sm">
                            <li><Link to="/jobs" className="hover:text-white transition-colors">Browse Jobs</Link></li>
                            <li><Link to="/companies" className="hover:text-white transition-colors">Browse Companies</Link></li>
                            <li><Link to="/dashboard" className="hover:text-white transition-colors">Candidate Dashboard</Link></li>
                            <li><Link to="/saved-jobs" className="hover:text-white transition-colors">Saved Jobs</Link></li>
                        </ul>
                    </div>

                    {/* For Employers */}
                    <div>
                        <h3 className="font-semibold text-lg mb-4">For Employers</h3>
                        <ul className="space-y-3 text-gray-400 text-sm">
                            <li><Link to="/post-job" className="hover:text-white transition-colors">Post a Job</Link></li>
                            <li><Link to="/employer/dashboard" className="hover:text-white transition-colors">Employer Dashboard</Link></li>
                            <li><Link to="/pricing" className="hover:text-white transition-colors">Pricing Plans</Link></li>
                            <li><Link to="/resources" className="hover:text-white transition-colors">Recruiting Resources</Link></li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h3 className="font-semibold text-lg mb-4">Stay Updated</h3>
                        <p className="text-gray-400 text-sm mb-4">Subscribe to our newsletter for the latest job market updates.</p>
                        <div className="flex gap-2">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="bg-gray-800 text-white px-4 py-2 rounded-md w-full focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                            <Button size="sm" className="px-3">
                                <Mail className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
                    <p>© 2026 JobPortal. All rights reserved.</p>
                    <div className="flex gap-6">
                        <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
                        <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
                        <Link to="/cookies" className="hover:text-white transition-colors">Cookie Policy</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
