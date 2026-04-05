import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Rocket, Facebook, Twitter, Instagram, Linkedin, Mail, Send } from 'lucide-react';
import { Button } from '../ui/Button';

const Footer = () => {
    const [email, setEmail] = useState('');
    const [subscribed, setSubscribed] = useState(false);

    const handleSubscribe = (e) => {
        e.preventDefault();
        if (email) {
            setSubscribed(true);
            setEmail('');
            setTimeout(() => setSubscribed(false), 3000);
        }
    };

    return (
        <footer className="bg-[#0f1419] text-[#f1f5f9] border-t border-white/5 pt-20 pb-10">
            <div className="max-w-[1400px] mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-20 mb-20">
                    {/* Brand Section */}
                    <div className="space-y-8">
                        <Link to="/" className="flex items-center gap-3 group">
                            <div className="bg-gradient-to-br from-[#00d9ff] to-[#7c3aed] p-2 rounded-xl group-hover:rotate-12 transition-transform duration-300">
                                <Rocket className="w-6 h-6 text-white" />
                            </div>
                            <span className="text-2xl font-extrabold gradient-text">JobPortal</span>
                        </Link>
                        <p className="text-[#a0aec0] leading-relaxed">
                            Connecting exceptional talent with world-class employers. Building the future of work through innovation and opportunity.
                        </p>
                        <div className="flex gap-4">
                            {[Facebook, Twitter, Instagram, Linkedin].map((Icon, idx) => (
                                <a key={idx} href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-[#a0aec0] hover:text-[#00d9ff] hover:bg-white/10 transition-all">
                                    <Icon className="w-5 h-5" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-bold mb-8 text-white">For Candidates</h3>
                        <ul className="space-y-4">
                            {['Browse Jobs', 'Companies', 'Dashboard', 'Career Advice'].map((item) => (
                                <li key={item}>
                                    <Link to="#" className="text-[#a0aec0] hover:text-[#00d9ff] transition-colors flex items-center gap-2 group">
                                        <div className="w-1.5 h-1.5 rounded-full bg-[#00d9ff] opacity-0 group-hover:opacity-100 transition-opacity" />
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-lg font-bold mb-8 text-white">For Employers</h3>
                        <ul className="space-y-4">
                            {['Post a Job', 'Recruiting Tips', 'Pricing Plans', 'Job Analytics'].map((item) => (
                                <li key={item}>
                                    <Link to="#" className="text-[#a0aec0] hover:text-[#00d9ff] transition-colors flex items-center gap-2 group">
                                        <div className="w-1.5 h-1.5 rounded-full bg-[#7c3aed] opacity-0 group-hover:opacity-100 transition-opacity" />
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Stay Updated */}
                    <div className="space-y-8">
                        <h3 className="text-lg font-bold text-white">Stay Updated</h3>
                        <p className="text-[#a0aec0]">Get the latest job market insights delivered to your inbox.</p>
                        <form onSubmit={handleSubscribe} className="space-y-4">
                            <div className="relative group">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email"
                                    className="w-full bg-white/5 border border-white/10 text-white px-5 py-4 rounded-xl focus:outline-none focus:border-[#00d9ff]/50 transition-all placeholder:text-[#a0aec0]/50"
                                    required
                                />
                                <button
                                    type="submit"
                                    className="absolute right-2 top-2 bottom-2 bg-gradient-to-r from-[#00d9ff] to-[#7c3aed] text-white px-4 rounded-lg flex items-center justify-center hover:scale-105 transition-transform"
                                >
                                    <Send className="w-4 h-4" />
                                </button>
                            </div>
                            {subscribed && (
                                <p className="text-green-400 text-xs font-medium flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                                    Subscribed successfully!
                                </p>
                            )}
                        </form>
                    </div>
                </div>

                <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-[#a0aec0] text-sm">
                        © 2026 <span className="text-[#00d9ff] font-bold">JobPortal</span>. Built with ❤️ for professionals.
                    </p>
                    <div className="flex gap-8">
                        {['Privacy', 'Terms', 'Cookies', 'Contact'].map((item) => (
                            <Link key={item} to="#" className="text-[#a0aec0] hover:text-[#00d9ff] text-sm transition-colors">
                                {item}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

