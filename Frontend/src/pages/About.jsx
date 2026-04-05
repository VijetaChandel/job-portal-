import React, { useEffect, useState } from 'react';
import {
    Target, Users, Shield, Zap, Briefcase, Heart, TrendingUp, Award,
    Code, Database, Cloud, Cpu, Rocket, Globe, Lock, Sparkles,
    CheckCircle, ArrowRight, Star, Hexagon, Layers, Zap as ZapIcon, ShieldCheck
} from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

const About = () => {
    const [activeCard, setActiveCard] = useState(0);

    const techStack = [
        { icon: Code, name: 'React v18', color: 'text-[#00d9ff]' },
        { icon: Database, name: 'Cloud Clusters', color: 'text-[#ec4899]' },
        { icon: Cloud, name: 'Node Engine', color: 'text-[#7c3aed]' },
        { icon: Cpu, name: 'Express Core', color: 'text-white' },
    ];

    const features = [
        {
            icon: Rocket,
            title: 'Supersonic Transit',
            description: 'Hyper-optimized performance layer for instantaneous candidate-job matching.',
            gradient: 'from-[#00d9ff] to-[#7c3aed]'
        },
        {
            icon: ShieldCheck,
            title: 'Quantum Security',
            description: 'Military-grade encryption protocols securing every byte of professional data.',
            gradient: 'from-[#7c3aed] to-[#ec4899]'
        },
        {
            icon: Globe,
            title: 'Universal Network',
            description: 'Collapsing geographic barriers to connect global talent with frontier organizations.',
            gradient: 'from-[#ec4899] to-[#fbbf24]'
        },
        {
            icon: Sparkles,
            title: 'Neural Intelligence',
            description: 'Advanced heuristic algorithms predicting your next career zenith with 99.9% precision.',
            gradient: 'from-[#fbbf24] to-[#00d9ff]'
        }
    ];

    const stats = [
        { icon: Briefcase, value: '25K+', label: 'Active Openings', color: 'blue' },
        { icon: Users, value: '1.2M+', label: 'Verified Talent', color: 'purple' },
        { icon: Award, value: '850+', label: 'Elite Partners', color: 'green' },
        { icon: TrendingUp, value: '98%', label: 'Placement Rate', color: 'orange' }
    ];

    return (
        <div className="min-h-screen bg-[#0f1419] text-[#f1f5f9] font-sans selection:bg-[#00d9ff]/30">
            <Navbar />

            {/* Hero Section */}
            <section className="relative pt-32 pb-24 px-6 overflow-hidden">
                {/* Background Glows */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#00d9ff]/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/4"></div>
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#7c3aed]/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/4"></div>

                <div className="max-w-[1400px] mx-auto relative z-10 text-center">
                    <div className="inline-flex items-center gap-3 px-4 py-2 bg-white/5 border border-white/10 rounded-full mb-8 animate-fade-in">
                        <Sparkles className="w-4 h-4 text-[#00d9ff]" />
                        <span className="text-xs font-black uppercase tracking-widest text-[#a0aec0]">
                            The Vanguard of Recruitment
                        </span>
                    </div>

                    <h1 className="text-3xl lg:text-6xl font-black mb-8 leading-[1.1] tracking-tight animate-slide-up">
                        Engineering the <br />
                        <span className="gradient-text">Future of Work</span>
                    </h1>

                    <p className="text-[#a0aec0] text-base lg:text-lg max-w-4xl mx-auto leading-relaxed mb-16 animate-slide-up animation-delay-200">
                        We don't just find jobs. We architect professional destinies using <span className="text-white font-bold tracking-tight">high-fidelity matching</span> and frontier-grade user experiences.
                    </p>

                    {/* Tech Mosaic */}
                    <div className="flex flex-wrap items-center justify-center gap-6 lg:gap-12 mb-24 animate-slide-up animation-delay-300">
                        {techStack.map((tech, index) => (
                            <div key={index} className="flex flex-col items-center gap-4 group">
                                <div className="w-20 h-20 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 group-hover:border-[#00d9ff]/50 transition-all duration-500 group-hover:shadow-[0_0_30px_rgba(0,217,255,0.15)]">
                                    <tech.icon className={`w-10 h-10 ${tech.color}`} />
                                </div>
                                <span className="text-[10px] font-black text-[#a0aec0] uppercase tracking-widest">{tech.name}</span>
                            </div>
                        ))}
                    </div>

                    {/* Stats Matrix */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 animate-slide-up animation-delay-400">
                        {stats.map((stat, index) => (
                            <div key={index} className="glass-card p-8 group hover:bg-white/[0.03]">
                                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                    <stat.icon className="w-6 h-6 text-[#00d9ff]" />
                                </div>
                                <div className="text-2xl font-black text-white mb-2 tracking-tight">
                                    {stat.value}
                                </div>
                                <div className="text-[10px] font-bold text-[#a0aec0] uppercase tracking-widest">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Core Capabilities */}
            <section className="py-32 bg-white/[0.02] border-y border-white/5 px-6">
                <div className="max-w-[1400px] mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-20 px-4">
                        <div className="max-w-2xl">
                            <h2 className="text-2xl lg:text-4xl font-black text-white mb-6 tracking-tight">
                                Sovereign <span className="gradient-text">Protocol</span>
                            </h2>
                            <p className="text-[#a0aec0] text-base font-medium">
                                A holistic ecosystem designed to empower sovereign professionals and elite organizations.
                            </p>
                        </div>
                        <div className="hidden lg:block h-px flex-1 bg-white/10 mb-8 mx-12"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {features.map((feature, index) => (
                            <div key={index} className="glass-card p-12 group overflow-hidden relative">
                                <div className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 blur-[80px] transition-opacity`}></div>
                                <div className="relative z-10 flex gap-8">
                                    <div className={`shrink-0 w-20 h-20 rounded-3xl bg-gradient-to-br ${feature.gradient} p-[1px] group-hover:scale-110 transition-all duration-500`}>
                                        <div className="w-full h-full bg-[#0f1419] rounded-[22px] flex items-center justify-center">
                                            <feature.icon className="w-10 h-10 text-white" />
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-black text-white mb-4 tracking-tight group-hover:translate-x-2 transition-transform">
                                            {feature.title}
                                        </h3>
                                        <p className="text-sm text-[#a0aec0] leading-relaxed font-regular">
                                            {feature.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Mission Statement */}
            <section className="py-40 relative px-6 overflow-hidden">
                <div className="absolute inset-0 bg-[#7c3aed]/5 pointer-events-none"></div>
                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <div className="w-20 h-20 bg-gradient-to-br from-[#00d9ff] to-[#7c3aed] rounded-3xl flex items-center justify-center mx-auto mb-12 shadow-2xl shadow-[#00d9ff]/20">
                        <Target className="w-10 h-10 text-white" />
                    </div>
                    <h2 className="text-3xl lg:text-5xl font-black text-white mb-10 tracking-tight">
                        Our Manifest.
                    </h2>
                    <p className="text-[#a0aec0] text-lg leading-relaxed font-medium mb-16">
                        "To eliminate career friction and catalyze the next era of industrial expansion by connecting the right nodes in the human capital network."
                    </p>
                    
                    <div className="flex flex-wrap justify-center gap-4">
                        {['Neural Analysis', 'Global Gateway', 'Verified Trust', 'Pro-Grade Tools'].map((tag, i) => (
                            <span key={i} className="px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-xs font-black uppercase tracking-widest">
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            </section>

            {/* Final Call */}
            <section className="pb-32 px-6">
                <div className="max-w-[1400px] mx-auto">
                    <div className="glass-card p-16 lg:p-24 text-center border-[#00d9ff]/20 bg-gradient-to-b from-white/[0.02] to-transparent">
                        <h2 className="text-3xl lg:text-5xl font-black text-white mb-8 tracking-tighter">
                            Ready to <span className="gradient-text">Ascend?</span>
                        </h2>
                        <p className="text-[#a0aec0] text-base mb-12 max-w-xl mx-auto font-medium">
                            Join the upper echelon of professionals already leveraging our ecosystem.
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center gap-6">
                            <button onClick={() => window.location.href='/jobs'} className="btn-primary px-12 py-5 text-lg font-black tracking-widest uppercase">
                                Explore Jobs
                            </button>
                            <button onClick={() => window.location.href='/register'} className="px-12 py-5 rounded-2xl border border-white/10 text-white font-black tracking-widest uppercase hover:bg-white/5 transition-all text-sm">
                                Join Network
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default About;
