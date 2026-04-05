import React, { useState, useEffect, useRef } from 'react';
import { 
    Rocket, Cpu, Zap, ShieldCheck, 
    PieChart, Target, Lock, BarChart3, 
    Repeat, Palette, Globe, Layers, 
    Database, Server, Cloud, Cpu as NodeIcon, 
    Check, Play, ArrowRight, Menu, X, Star, Users
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { Button } from '../components/ui/Button';
import { cn } from '../utils/cn';

const FeatureCard = ({ icon: Icon, title, description, delay }) => {
    const cardRef = useRef(null);
    const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) setIsVisible(true);
        }, { threshold: 0.1 });
        if (cardRef.current) observer.observe(cardRef.current);
        return () => observer.disconnect();
    }, []);

    const handleMouseMove = (e) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        setMousePos({ x, y });
    };

    return (
        <div 
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={() => setMousePos({ x: 50, y: 50 })}
            className={cn(
                "group relative p-8 bg-[#121824] border border-white/5 rounded-3xl overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)]",
                "hover:-translate-y-5 hover:rotate-x-5 hover:border-[#00d9ff]/50 hover:shadow-[0_0_40px_rgba(0,217,255,0.2)]",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            )}
            style={{ 
                transitionDelay: `${delay}ms`,
                transformStyle: 'preserve-3d',
                '--mouse-x': `${mousePos.x}%`,
                '--mouse-y': `${mousePos.y}%`
            }}
        >
            {/* Spotlight Effect */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                 style={{ background: `radial-gradient(circle at var(--mouse-x) var(--mouse-y), rgba(0,217,255,0.15) 0%, transparent 80%)` }} />
            
            <div className="relative z-10 space-y-4 font-main">
                <div className="w-12 h-12 rounded-2xl bg-[#00d9ff]/10 flex items-center justify-center text-[#00d9ff] group-hover:scale-110 transition-transform duration-500 shadow-[0_0_20px_rgba(0,217,255,0.2)]">
                    <Icon size={24} />
                </div>
                <h3 className="text-lg font-heading font-bold text-[#FFFFFF] tracking-tight group-hover:text-[#00d9ff] transition-colors">{title}</h3>
                <p className="text-sm text-[#CBD5E1] leading-relaxed opacity-90">{description}</p>
            </div>
        </div>
    );
};

const PricingCard = ({ plan, price, features, isFeatured, delay }) => {
    const cardRef = useRef(null);
    const [rotate, setRotate] = useState({ x: 0, y: 0 });
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) setIsVisible(true);
        }, { threshold: 0.1 });
        if (cardRef.current) observer.observe(cardRef.current);
        return () => observer.disconnect();
    }, []);

    const handleMouseMove = (e) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const rotateX = (centerY - e.clientY) / 10;
        const rotateY = (e.clientX - centerX) / 10;
        setRotate({ x: rotateX, y: rotateY });
    };

    return (
        <div 
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={() => setRotate({ x: 0, y: 0 })}
            className={cn(
                "group relative p-8 bg-[#121824] border border-white/5 rounded-[40px] transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] overflow-hidden",
                isFeatured ? "scale-105 border-[#00d9ff]/30 shadow-[0_30px_60px_-15px_rgba(0,217,255,0.2)] z-10" : "hover:scale-[1.02] hover:z-20",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            )}
            style={{ 
                transitionDelay: `${delay}ms`,
                transform: `
                    perspective(1000px) 
                    rotateX(${rotate.x}deg) 
                    rotateY(${rotate.y}deg)
                    translateY(${rotate.x !== 0 ? (isFeatured ? -30 : -25) : 0}px)
                `,
                transformStyle: 'preserve-3d'
            }}
        >
            {/* Spotlight Effect Magenta */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                 style={{ background: `radial-gradient(circle at 50% 50%, rgba(255,0,255,0.1) 0%, transparent 80%)` }} />

            {isFeatured && (
                <div className="absolute top-8 -right-12 rotate-45 bg-[#00d9ff] px-12 py-1.5 text-[10px] font-black text-[#0a0e15] uppercase tracking-widest shadow-[0_0_20px_rgba(0,217,255,0.4)]">
                    Most Popular
                </div>
            )}

            <div className="relative z-10 space-y-8 font-main h-full flex flex-col">
                <div>
                    <h4 className={cn("text-[9px] font-black uppercase tracking-[0.4em] mb-3", isFeatured ? "text-[#00d9ff]" : "text-[#ff00ff]")}>{plan}</h4>
                    <div className="flex items-baseline gap-1">
                        <span className="text-sm font-medium text-[#a0aec0] -translate-y-1">₹</span>
                        <span className="text-2xl font-heading font-black text-white">{price.replace('₹', '')}</span>
                        <span className="text-[#a0aec0] text-[10px] ml-1">/mo</span>
                    </div>
                </div>

                <ul className="space-y-3.5 flex-1">
                    {features.map((f, i) => (
                        <li key={i} className="flex items-start gap-4 group/item">
                            <span className={cn("mt-1 p-0.5 rounded-full", isFeatured ? "bg-[#00d9ff]/20 text-[#00d9ff]" : "bg-white/5 text-[#a0aec0]")}>
                                <Check size={12} />
                            </span>
                            <span className="text-sm text-[#CBD5E1] group-hover/item:text-white transition-colors leading-[1.6] tracking-wide font-medium">{f}</span>
                        </li>
                    ))}
                </ul>

                <Button className={cn(
                    "w-full py-4 rounded-2xl font-black uppercase tracking-widest text-xs h-auto transition-all duration-300",
                    isFeatured 
                        ? "bg-[#00d9ff] text-[#0a0e15] shadow-[0_0_20px_#00d9ff] hover:scale-105 active:scale-95 animate-pulse-slow" 
                        : "bg-white/5 border border-white/10 text-white hover:bg-[#ff00ff]/10 hover:border-[#ff00ff]/50"
                )}>
                    Get Activated
                </Button>
            </div>
        </div>
    );
};

const FloatingNeuralNode = ({ className, icon: Icon, color, delay }) => (
    <div className={cn(
        "absolute flex items-center justify-center animate-neural-float pointer-events-none z-0",
        className
    )} style={{ animationDelay: delay }}>
        {/* Graphical Core Container */}
        <div className="relative flex items-center justify-center w-64 h-64">
            
            {/* 1. Outer Rotating Hexagon Grid */}
            <div className="absolute inset-0 animate-hexa-rotate opacity-20 transition-opacity duration-1000">
                <svg viewBox="0 0 100 100" className="w-full h-full" style={{ stroke: color }}>
                    <path 
                        d="M50 5 L90 25 L90 75 L50 95 L10 75 L10 25 Z" 
                        fill="none" 
                        strokeWidth="0.5" 
                        className="animate-circuit-scan"
                    />
                    <circle cx="50" cy="5" r="1.5" fill={color} />
                    <circle cx="90" cy="25" r="1.5" fill={color} />
                    <circle cx="90" cy="75" r="1.5" fill={color} />
                    <circle cx="50" cy="95" r="1.5" fill={color} />
                    <circle cx="10" cy="75" r="1.5" fill={color} />
                    <circle cx="10" cy="25" r="1.5" fill={color} />
                </svg>
            </div>

            {/* 2. Middle Scanning Circuitry */}
            <div className="absolute w-[80%] h-[80%] opacity-15">
                <svg viewBox="0 0 100 100" className="w-full h-full" style={{ stroke: color }}>
                    <path d="M50 20 L50 80 M20 50 L80 50" fill="none" strokeWidth="1" strokeDasharray="10 5" className="animate-circuit-scan" />
                    <circle cx="50" cy="50" r="30" fill="none" strokeWidth="0.5" />
                </svg>
            </div>

            {/* 3. Central Glowing Power Core */}
            <div className="relative p-7 rounded-full bg-[#0a0e15]/80 backdrop-blur-3xl border border-white/10 shadow-[0_0_50px_rgba(0,0,217,0.1)] z-10">
                {/* Aura Glow */}
                <div className="absolute inset-0 rounded-full blur-2xl opacity-40 bg-gradient-to-tr from-transparent" style={{ backgroundColor: color }} />
                
                <div className="relative z-20 flex items-center justify-center group">
                    <Icon size={48} className="transition-all duration-1000" style={{ color }} />
                </div>
            </div>

            {/* 4. Peripheral Data Particles */}
            <div className="absolute inset-0 pointer-events-none">
                {[...Array(6)].map((_, i) => (
                    <div 
                        key={i}
                        className="absolute w-1 h-1 rounded-full animate-ping opacity-30"
                        style={{ 
                            backgroundColor: color, 
                            top: `${Math.random() * 100}%`, 
                            left: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 5}s`
                        }}
                    />
                ))}
            </div>
        </div>
    </div>
);

const FeaturesPricing = () => {
    return (
        <div className="min-h-screen bg-[#0a0e15] text-[#f1f5f9] overflow-x-hidden selection:bg-[#00d9ff]/30">
            <Navbar />
            
            {/* Hero Section */}
            <section className="relative pt-40 pb-24 overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none">
                    <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] rounded-full bg-[#00d9ff]/10 blur-[150px] animate-pulse" />
                    <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full bg-[#ff00ff]/5 blur-[150px] animate-pulse" style={{ animationDelay: '2s' }} />
                </div>

                <div className="max-w-[1400px] mx-auto px-6 relative z-10 text-center">
                    {/* Left Animation Node */}
                    <FloatingNeuralNode 
                        className="hidden lg:flex left-[-5%] xl:left-[10%] top-1/4" 
                        icon={Cpu} 
                        color="#00d9ff" 
                        delay="0s" 
                    />
                    
                    {/* Right Animation Node */}
                    <FloatingNeuralNode 
                        className="hidden lg:flex right-[-5%] xl:right-[10%] top-1/3" 
                        icon={Zap} 
                        color="#ff00ff" 
                        delay="2s" 
                    />

                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00d9ff]/10 border border-[#00d9ff]/20 mb-8 animate-fade-in relative z-10">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#00d9ff] animate-ping" />
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#00d9ff]">Premium Features & Flexible Pricing</span>
                    </div>
                    <h1 className="text-3xl md:text-6xl lg:text-7xl font-heading font-black mb-8 leading-[1.1] tracking-tighter animate-fade-in-up text-[#FFFFFF] relative z-10">
                        Power Your Career with <br />
                        <span className="gradient-text bg-gradient-to-r from-[#00d9ff] to-[#ff00ff]">Next-Gen Tools</span>
                    </h1>
                    <p className="max-w-2xl mx-auto text-base md:text-lg text-[#CBD5E1] font-main leading-[1.6] animate-fade-in-up opacity-90 relative z-10" style={{ animationDelay: '200ms' }}>
                        Experience the fusion of intelligent AI matching and high-performance carrier analytics designed for the global talent elite.
                    </p>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="py-32 relative">
                <div className="max-w-[1400px] mx-auto px-6 relative z-10">
                    <div className="mb-20">
                        <p className="text-[10px] font-black uppercase tracking-[0.5em] text-[#00d9ff] mb-4">Feature Showcase</p>
                        <h2 className="text-3xl md:text-5xl font-heading font-black text-[#FFFFFF] leading-tight tracking-tight">
                            Built for <span className="gradient-text bg-gradient-to-r from-[#00d9ff] to-[#ff00ff]">Tomorrow</span>
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <FeatureCard 
                            icon={Target} 
                            title="AI-Powered Matching" 
                            description="Our neural algorithm analyzes 50+ data points to find your perfect professional synchronicity." 
                            delay={100}
                        />
                        <FeatureCard 
                            icon={Lock} 
                            title="Enterprise Security" 
                            description="Sovereign-grade data encryption ensuring your profile remains invisible to unwanted entities." 
                            delay={200}
                        />
                        <FeatureCard 
                            icon={BarChart3} 
                            title="Real-Time Analytics" 
                            description="Stream live data on application flows and market competitiveness straight to your deck." 
                            delay={300}
                        />
                        <FeatureCard 
                            icon={Zap} 
                            title="Lightning Performance" 
                            description="Zero-latency platform architecture optimized for the most intensive job hunting cycles." 
                            delay={400}
                        />
                        <FeatureCard 
                            icon={Repeat} 
                            title="Seamless Integration" 
                            description="Force-link your professional presence with Github, LinkedIn, and Portfolio modules." 
                            delay={500}
                        />
                        <FeatureCard 
                            icon={Palette} 
                            title="White-Label Ready" 
                            description="Custom appearance nodes for recruiters to brand their hiring ecosystem dynamically." 
                            delay={600}
                        />
                    </div>
                </div>
            </section>

            {/* Tech Stack Horizontal Showcase */}
            <section className="py-24 border-y border-white/5 bg-[#060911]/80 backdrop-blur-3xl overflow-hidden relative group/marquee">
                <div className="flex animate-marquee-horizontal pause-on-hover gap-8 py-4">
                    {[...Array(2)].map((_, idx) => (
                        <div key={idx} className="flex gap-8 px-4">
                            {[
                                { name: "React V18", icon: <Layers size={22} />, color: "#61dafb" },
                                { name: "Cloud Clusters", icon: <Cloud size={22} />, color: "#00d9ff" },
                                { name: "Node Engine", icon: <NodeIcon size={22} />, color: "#339933" },
                                { name: "Express Core", icon: <Server size={22} />, color: "#ffffff" },
                                { name: "Redis Cache", icon: <Zap size={22} />, color: "#d82c20" },
                                { name: "PostgreSQL", icon: <Database size={22} />, color: "#336791" }
                            ].map((tech, i) => (
                                <div 
                                    key={i} 
                                    className="flex flex-col items-center justify-center gap-5 p-10 min-w-[220px] rounded-[32px] glass-morphism group-hover:border-white/20 transition-all duration-700 cursor-crosshair hover:scale-105 hover:border-[#00d9ff]/40 hover:shadow-[0_0_40px_rgba(0,217,255,0.15)] group/card"
                                    style={{ '--glow-color': tech.color }}
                                >
                                    <div className="text-[#a0aec0] group-hover/card:text-[#00d9ff] group-hover/card:scale-125 transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)]">
                                        {tech.icon}
                                    </div>
                                    <span className="text-[11px] font-bold uppercase tracking-[0.4em] text-[#a0aec0] group-hover/card:text-white transition-colors duration-500">{tech.name}</span>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
                
                {/* Side Fade Overlays */}
                <div className="absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-[#0a0e15] to-transparent z-10 pointer-events-none" />
                <div className="absolute inset-y-0 right-0 w-40 bg-gradient-to-l from-[#0a0e15] to-transparent z-10 pointer-events-none" />
            </section>

            {/* Stats Section */}
            <section className="py-20 md:py-32 bg-[#060911]">
                <div className="max-w-[1400px] mx-auto px-6">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-12">
                        {[
                            { label: "Companies", value: "25K+", icon: <Globe size={20} /> },
                            { label: "Users", value: "1.2M+", icon: <Users size={20} /> },
                            { label: "Partners", value: "850+", icon: <ShieldCheck size={20} /> },
                            { label: "Success Rate", value: "98%", icon: <Star size={20} /> }
                        ].map((stat, i) => (
                            <div key={i} className="text-center space-y-4">
                                <div className="inline-flex p-3 md:p-4 rounded-xl md:rounded-2xl bg-white/5 text-[#00d9ff] mb-2">
                                    {React.cloneElement(stat.icon, { size: 18 })}
                                </div>
                                <h3 className="text-2xl md:text-4xl font-heading font-black text-[#FFFFFF]">{stat.value}</h3>
                                <p className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.3em] md:tracking-[0.5em] text-[#CBD5E1] opacity-70">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Pricing Section */}
            <section id="pricing" className="py-32 relative">
                <div className="max-w-[1400px] mx-auto px-6">
                    <div className="text-center mb-24">
                        <p className="text-[10px] font-black uppercase tracking-[0.5em] text-[#ff00ff] mb-4">Pricing Plans</p>
                        <h2 className="text-4xl md:text-6xl font-heading font-black text-[#FFFFFF] tracking-tighter">
                            Choose Your <span className="gradient-text bg-gradient-to-r from-[#ff00ff] to-[#00d9ff]">Power Level</span>
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <PricingCard 
                            plan="Starter Plan" 
                            price="₹0" 
                            features={["Basic AI Search", "1 Job Application/Day", "Public Profile", "Community Support"]}
                            delay={100}
                        />
                        <PricingCard 
                            plan="Professional" 
                            price="₹999" 
                            isFeatured
                            features={["Unlimited Submissions", "Priority AI Ranking", "Direct Messaging", "Detailed Analytics", "Premium Badge", "L2 Tech Support"]}
                            delay={200}
                        />
                        <PricingCard 
                            plan="Business Plan" 
                            price="₹4,999" 
                            features={["Company Dashboard", "ATS Integration", "Verified Recruiter", "Bulk Sourcing", "Dedicated Account Manager"]}
                            delay={300}
                        />
                        <PricingCard 
                            plan="Enterprise" 
                            price="Custom" 
                            features={["SSO Integration", "SLA Guarantees", "API Access", "Custom Modules", "Training Sprints"]}
                            delay={400}
                        />
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-40 bg-gradient-to-b from-[#0a0e15] to-[#060911] relative overflow-hidden">
                {/* Glow Element */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[#00d9ff]/10 blur-[120px] rounded-full pointer-events-none" />
                
                <div className="max-w-[1000px] mx-auto px-6 relative z-10 text-center">
                    <h2 className="text-4xl md:text-6xl font-heading font-black text-[#FFFFFF] mb-12 leading-tight tracking-tighter">
                        Ready to Transform Your <br />
                        <span className="gradient-text bg-gradient-to-r from-[#00d9ff] to-[#ff00ff]">Career Journey?</span>
                    </h2>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                        <Button className="btn-primary w-full sm:w-auto px-12 py-5 text-sm font-black uppercase tracking-widest shadow-[0_0_30px_#00d9ff50]">
                            Start Free Trial
                        </Button>
                        <Button variant="outline" className="w-full sm:w-auto px-12 py-5 text-sm border-white/10 text-[#a0aec0] font-black uppercase tracking-widest hover:text-white hover:border-white/30 bg-transparent h-auto">
                            Schedule Demo
                        </Button>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default FeaturesPricing;
