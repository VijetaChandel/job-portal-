import React from 'react';
import { Search, Star, Briefcase, Globe, Zap, Users, TrendingUp, Cpu } from 'lucide-react';
import { Button } from '../ui/Button';

const Hero = () => {
    const jobCards = [
        {
            company: 'Google',
            role: 'Senior Product Designer',
            logo: <Star className="text-[#00d9ff]" />,
            tags: ['Full-time', 'Senior', 'Design Systems'],
            salary: '$180k - $240k',
            color: 'from-[#00d9ff]/20 to-[#00d9ff]/5'
        },
        {
            company: 'Meta',
            role: 'Machine Learning Engineer',
            logo: <Cpu className="text-[#7c3aed]" />,
            tags: ['Hybrid', 'Niche', 'AI/ML'],
            salary: '$190k - $260k',
            color: 'from-[#7c3aed]/20 to-[#7c3aed]/5'
        },
        {
            company: 'Netflix',
            role: 'Full Stack Developer',
            logo: <Zap className="text-[#ec4899]" />,
            tags: ['Remote', 'L5', 'Streaming'],
            salary: '$170k - $230k',
            color: 'from-[#ec4899]/20 to-[#ec4899]/5'
        }
    ];

    // Double the cards for seamless infinite scroll
    const scrollingCards = [...jobCards, ...jobCards, ...jobCards];

    return (
        <section className="relative pt-32 pb-20 overflow-hidden bg-[#0f1419]">
            {/* Background Glows */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-[#00d9ff]/5 blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-[#7c3aed]/5 blur-[120px]" />
            </div>

            <div className="max-w-[1600px] mx-auto px-8 relative z-10">
                {/* 1. FIXED GLOBAL HEADER Section */}
                <div className="flex flex-col lg:flex-row items-center justify-between gap-12 border-b border-white/5 pb-16 mb-16 px-4">
                    
                    {/* Left: Description Block */}
                    <div className="lg:w-1/4 space-y-4 animate-fade-in-up">
                        <div className="flex items-center gap-2 text-[#00d9ff] font-black text-xs uppercase tracking-widest">
                            <TrendingUp className="w-4 h-4" />
                            <span>Trending Platform</span>
                        </div>
                        <h3 className="text-white text-xl font-black leading-tight">
                            50k+ Active Job <br />
                            <span className="text-[#a0aec0]">Opportunities Today.</span>
                        </h3>
                        <p className="text-[#a0aec0] text-sm leading-relaxed max-w-[280px]">
                            Leverage AI-driven matching to land your dream role in tech, design, or engineering.
                        </p>
                    </div>

                    {/* Center: Headline Section */}
                    <div className="lg:w-1/2 text-center animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                        <h1 className="text-4xl md:text-5xl lg:text-7xl font-black mb-6 leading-none tracking-tighter">
                            Find Your Dream <br />
                            <span className="gradient-text bg-gradient-to-r from-[#00d9ff] to-[#7c3aed]">🌟 Job Today</span>
                        </h1>
                        <p className="text-[#a0aec0] text-sm md:text-lg font-bold tracking-tight uppercase opacity-50 px-4">
                            The Elite AI-Powered Career Platform for Top Tier Talent.
                        </p>
                    </div>

                    {/* Far-Right: Search & Stats */}
                    <div className="lg:w-1/4 space-y-8 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                        <div className="relative group">
                            <div className="absolute inset-0 bg-gradient-to-r from-[#00d9ff] to-[#7c3aed] rounded-xl blur opacity-20 group-focus-within:opacity-40 transition-opacity" />
                            <div className="relative flex items-center bg-white/5 border border-white/10 rounded-xl p-1.5 pl-4 backdrop-blur-xl">
                                <Search className="w-5 h-5 text-[#a0aec0]" />
                                <input 
                                    type="text" 
                                    placeholder="Search Role..." 
                                    className="bg-transparent border-none focus:ring-0 text-white placeholder-[#a0aec0]/40 flex-1 px-3 text-sm font-bold uppercase tracking-widest"
                                />
                                <Button className="btn-primary py-2 px-6 text-xs font-black uppercase tracking-widest">
                                    Go
                                </Button>
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-2 md:gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/5 shadow-inner">
                            <div className="text-center">
                                <p className="text-white font-black text-base md:text-lg uppercase">50k+</p>
                                <p className="text-[8px] font-black text-[#a0aec0] uppercase tracking-tighter">Jobs</p>
                            </div>
                            <div className="text-center border-x border-white/5">
                                <p className="text-white font-black text-base md:text-lg uppercase">12k+</p>
                                <p className="text-[8px] font-black text-[#a0aec0] uppercase tracking-tighter">Brands</p>
                            </div>
                            <div className="text-center">
                                <p className="text-white font-black text-base md:text-lg uppercase">2k+</p>
                                <p className="text-[8px] font-black text-[#a0aec0] uppercase tracking-tighter">Hires</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 2. SCROLLING/GRID CONTENT AREA Section */}
                <div className="relative mx-auto max-w-[1400px] overflow-visible py-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {jobCards.map((job, idx) => (
                            <div key={idx} className={`glass-card p-5 md:p-10 flex flex-col items-stretch justify-between gap-6 border-white/5 hover:border-[#00d9ff]/30 transition-all group w-full max-w-[380px] md:max-w-none mx-auto h-full`}>
                                <div className="flex items-center gap-4 md:gap-8">
                                    <div className={`w-14 h-14 md:w-20 md:h-20 rounded-2xl bg-gradient-to-br ${job.color} flex items-center justify-center p-3 md:p-5 shadow-xl shrink-0`}>
                                        <div className="scale-75 md:scale-100">{job.logo}</div>
                                    </div>
                                    <div className="min-w-0">
                                        <h4 className="text-white text-[1.2rem] md:text-2xl font-black mb-1 md:mb-2 group-hover:text-[#00d9ff] transition-colors truncate whitespace-nowrap">{job.role}</h4>
                                        <div className="flex items-center gap-2 md:gap-3 overflow-hidden">
                                            <span className="text-[#a0aec0] font-bold text-[0.85rem] md:text-base truncate">{job.company}</span>
                                            <span className="w-1 h-1 rounded-full bg-white/20 shrink-0" />
                                            <span className="text-[#a0aec0] text-[0.75rem] md:text-sm truncate opacity-60">Worldwide</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <div className="flex flex-wrap gap-2">
                                        {job.tags.map((tag, i) => (
                                            <span key={i} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[9px] md:text-[10px] font-black text-white/50 uppercase tracking-widest leading-none">{tag}</span>
                                        ))}
                                    </div>
                                    
                                    <div className="flex items-end justify-between gap-4 border-t border-white/5 pt-6 mt-auto">
                                        <div className="text-left">
                                            <p className="text-[#a0aec0] text-[9px] md:text-[10px] font-black uppercase tracking-widest mb-1 opacity-50">Annual Salary</p>
                                            <p className="text-white text-xl md:text-2xl font-black tracking-tight">{job.salary}</p>
                                        </div>
                                        <Button className="btn-primary py-3 md:py-4 px-6 md:px-10 text-[10px] md:text-xs font-black uppercase tracking-widest h-auto shadow-lg shadow-[#00d9ff]/10">Quick Apply</Button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
