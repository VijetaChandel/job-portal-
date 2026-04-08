import React from 'react';
import Navbar from '../components/layout/Navbar';
import { useAuth } from '../context/AuthContext';
import Hero from '../components/layout/Hero';
import Footer from '../components/layout/Footer';
import FeaturedJobs from '../components/layout/FeaturedJobs';
import ExperienceModal from '../components/ExperienceModal';
import { Zap, Shield, Cpu, TrendingUp, Globe, Users, Check, Star, CheckCircle2, MessageSquarePlus } from 'lucide-react';
import axios from 'axios';
import { Button } from '../components/ui/Button';

const Home = () => {
    const { user } = useAuth();
    const [isExpModalOpen, setIsExpModalOpen] = React.useState(false);
    const [dynamicTestimonials, setDynamicTestimonials] = React.useState([]);

    const fetchExperiences = async () => {
        try {
            const res = await axios.get('/api/v1/experience/getall');
            if (res.data.success) {
                setDynamicTestimonials(res.data.experiences);
            }
        } catch (error) {
            console.error("Error fetching experiences:", error);
        }
    };

    React.useEffect(() => {
        fetchExperiences();
    }, []);

    const features = [
        { icon: <Cpu />, title: 'AI Matching', desc: 'Predictive algorithms that connect you with your perfect career match.' },
        { icon: <Shield />, title: 'Verified 100%', desc: 'Every company and job listing is manually verified for your security.' },
        { icon: <Zap />, title: 'Fast Lightning', desc: 'Apply in seconds and get real-time updates on your application status.' },
        { icon: <TrendingUp />, title: 'Growth Career', desc: 'Personalized career roadmaps and skill gap analysis for your growth.' },
        { icon: <Globe />, title: 'Global Reach', desc: 'Access opportunities from startups to Fortune 500s across the globe.' },
        { icon: <Users />, title: 'Community', desc: 'Join a network of 1M+ professionals and industry experts.' },
    ];

    const defaultTestimonials = [
        {
            fullname: 'Sarah Khan',
            role: 'Product Manager',
            company: 'Google',
            feedback: '"JobPortal changed my career trajectory completely. Found my dream job at Google in just 2 weeks! The AI matching is truly next-level."',
            stars: 5,
            initials: 'SK'
        },
        {
            fullname: 'David Chen',
            role: 'Senior Dev',
            company: 'Meta',
            feedback: '"The glassmorphic UI isn\'t just beautiful—it\'s incredibly intuitive. I\'ve never had a smoother job search experience."',
            stars: 5,
            initials: 'DC'
        }
    ];

    const allTestimonials = [...dynamicTestimonials, ...defaultTestimonials].slice(0, 6);

    return (
        <div className="min-h-screen bg-[#0f1419] text-[#f1f5f9] font-sans selection:bg-[#00d9ff]/30">
            <Navbar />
            <main>
                <Hero />

                {/* Features Section */}
                <section id="features" className="py-24 relative overflow-hidden">
                    <div className="max-w-[1400px] mx-auto px-6">
                        <div className="text-center mb-20 animate-fade-in-up">
                            <h2 className="text-3xl lg:text-5xl font-extrabold mb-6">
                                Powering the <span className="gradient-text">Future of Work</span>
                            </h2>
                            <p className="text-[#a0aec0] text-lg max-w-3xl mx-auto">
                                We combine cutting-edge AI with a premium user experience to help you land the role you deserve.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {features.map((feature, idx) => (
                                <div key={idx} className="glass-card p-10 group hover:border-[#00d9ff]/50 transition-all duration-300 transform hover:-translate-y-2">
                                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#00d9ff] to-[#7c3aed] flex items-center justify-center mb-8 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 shadow-lg shadow-[#00d9ff]/20">
                                        {React.cloneElement(feature.icon, { className: "w-8 h-8 text-white" })}
                                    </div>
                                    <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
                                    <p className="text-[#a0aec0] leading-relaxed text-base">{feature.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {user && <FeaturedJobs />}

                {/* Testimonials */}                <section className="py-24 bg-white/5 border-y border-white/5 relative">
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#00d9ff]/5 rounded-full blur-[120px] pointer-events-none"></div>
                    <div className="max-w-7xl mx-auto px-6 relative z-10">
                        <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16 px-4">
                            <div className="text-left">
                                <h2 className="text-3xl font-extrabold mb-4">Loved by <span className="gradient-text">Thousands</span></h2>
                                <p className="text-[#a0aec0] text-sm">Hear from professionals who found their perfect match.</p>
                            </div>
                            <button 
                                onClick={() => setIsExpModalOpen(true)}
                                className="flex items-center gap-3 px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all group"
                            >
                                <MessageSquarePlus className="w-5 h-5 text-[#00d9ff] group-hover:scale-110 transition-transform" />
                                <span className="text-xs font-black uppercase tracking-widest">Add Experience</span>
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {allTestimonials.map((t, idx) => (
                                <div key={idx} className="glass-card p-10 border-[#7c3aed]/20 hover:border-[#7c3aed]/50 transition-all flex flex-col justify-between">
                                    <div>
                                        <div className="flex gap-1 mb-6">
                                            {[...Array(t.stars)].map((_, i) => (
                                                <Star key={i} className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                                            ))}
                                        </div>
                                        <p className="text-lg italic mb-10 text-[#f1f5f9] leading-relaxed font-medium">
                                            {t.feedback || t.text}
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-4 pt-6 border-t border-white/5">
                                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#00d9ff] to-[#7c3aed] flex items-center justify-center font-black text-white text-base">
                                            {t.initials}
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-base text-white">{t.fullname || t.name}</h4>
                                            <p className="text-[#a0aec0] text-[10px] font-bold uppercase tracking-wider">{t.role} @ {t.company}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Pricing Section */}
                <section id="pricing" className="py-24">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="text-center mb-20">
                            <h2 className="text-3xl lg:text-5xl font-extrabold mb-6">Choose Your <span className="gradient-text">Success Plan</span></h2>
                            <p className="text-[#a0aec0] text-lg">Flexible options for every stage of your career journey.</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
                            {/* Starter */}
                            <div className="glass-card p-8 text-center border-white/5 opacity-80 hover:opacity-100 transition-opacity">
                                <h3 className="text-xl font-bold mb-2">STARTER</h3>
                                <div className="text-3xl font-extrabold mb-2">Free</div>
                                <p className="text-[#a0aec0] mb-8 text-sm">/forever</p>
                                <ul className="text-left space-y-4 mb-10 overflow-hidden">
                                    <li className="flex items-center gap-3 text-[#a0aec0]"><Check className="w-5 h-5 text-[#00d9ff]" /> 5,000 active jobs</li>
                                    <li className="flex items-center gap-3 text-[#a0aec0]"><Check className="w-5 h-5 text-[#00d9ff]" /> Basic profile builder</li>
                                    <li className="flex items-center gap-3 text-[#a0aec0]/50"><X className="w-5 h-5" /> Instant job alerts</li>
                                </ul>
                                <Button className="w-full border border-white/10 text-white hover:bg-white/5 py-6">Get Started</Button>
                            </div>

                            {/* Popular */}
                            <div className="glass-card p-10 text-center border-[#00d9ff] relative lg:scale-105 shadow-[0_0_50px_rgba(0,217,255,0.2)]">
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#00d9ff] text-[#0f1419] px-4 py-1 rounded-full text-xs font-bold tracking-widest uppercase">Popular ✨</div>
                                <h3 className="text-xl font-bold mb-2">GROWTH</h3>
                                <div className="text-3xl font-extrabold mb-2">$9.99</div>
                                <p className="text-[#a0aec0] mb-8 text-sm">/month</p>
                                <ul className="text-left space-y-4 mb-10">
                                    <li className="flex items-center gap-3"><Check className="w-5 h-5 text-[#00d9ff]" /> All 50,000+ jobs</li>
                                    <li className="flex items-center gap-3"><Check className="w-5 h-5 text-[#00d9ff]" /> Unlimited applications</li>
                                    <li className="flex items-center gap-3"><Check className="w-5 h-5 text-[#00d9ff]" /> Real-time job alerts</li>
                                    <li className="flex items-center gap-3"><Check className="w-5 h-5 text-[#00d9ff]" /> Profile optimization</li>
                                </ul>
                                <Button className="btn-primary w-full py-6">Start Free Trial</Button>
                            </div>

                            {/* Enterprise */}
                            <div className="glass-card p-8 text-center border-white/5 opacity-80 hover:opacity-100 transition-opacity">
                                <h3 className="text-xl font-bold mb-2">PRO</h3>
                                <div className="text-3xl font-extrabold mb-2">$24.99</div>
                                <p className="text-[#a0aec0] mb-8 text-sm">/month</p>
                                <ul className="text-left space-y-4 mb-10">
                                    <li className="flex items-center gap-3"><Check className="w-5 h-5 text-[#00d9ff]" /> Everything in Growth</li>
                                    <li className="flex items-center gap-3"><Check className="w-5 h-5 text-[#00d9ff]" /> AI Career Coach</li>
                                    <li className="flex items-center gap-3"><Check className="w-5 h-5 text-[#00d9ff]" /> Interview Preparation</li>
                                    <li className="flex items-center gap-3"><Check className="w-5 h-5 text-[#00d9ff]" /> 24/7 Priority Support</li>
                                </ul>
                                <Button className="w-full border border-white/10 text-white hover:bg-white/5 py-6">Go Pro</Button>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
            <ExperienceModal 
                isOpen={isExpModalOpen} 
                onClose={() => setIsExpModalOpen(false)} 
                onSuccess={fetchExperiences}
            />
        </div>
    );
};

const X = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
);

export default Home;


