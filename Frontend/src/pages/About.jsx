import React, { useEffect, useState } from 'react';
import {
    Target, Users, Shield, Zap, Briefcase, Heart, TrendingUp, Award,
    Code, Database, Cloud, Cpu, Rocket, Globe, Lock, Sparkles,
    CheckCircle, ArrowRight, Star
} from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

const About = () => {
    const [activeCard, setActiveCard] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveCard((prev) => (prev + 1) % 4);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    const techStack = [
        { icon: Code, name: 'React', color: 'text-blue-500' },
        { icon: Database, name: 'MongoDB', color: 'text-green-500' },
        { icon: Cloud, name: 'Node.js', color: 'text-green-600' },
        { icon: Cpu, name: 'Express', color: 'text-gray-600' },
    ];

    const features = [
        {
            icon: Rocket,
            title: 'Lightning Fast',
            description: 'Optimized performance for instant job searches and seamless browsing experience.',
            color: 'blue',
            gradient: 'from-blue-500 to-cyan-500'
        },
        {
            icon: Shield,
            title: 'Secure & Private',
            description: 'Enterprise-grade security with encrypted data and secure authentication protocols.',
            color: 'green',
            gradient: 'from-green-500 to-emerald-500'
        },
        {
            icon: Globe,
            title: 'Global Reach',
            description: 'Connect with opportunities worldwide from top companies across all industries.',
            color: 'purple',
            gradient: 'from-purple-500 to-pink-500'
        },
        {
            icon: Sparkles,
            title: 'Smart Matching',
            description: 'AI-powered job recommendations tailored to your skills and career aspirations.',
            color: 'orange',
            gradient: 'from-orange-500 to-red-500'
        }
    ];

    const stats = [
        { icon: Briefcase, value: '10,000+', label: 'Active Jobs', color: 'blue' },
        { icon: Users, value: '50,000+', label: 'Job Seekers', color: 'purple' },
        { icon: Award, value: '5,000+', label: 'Companies', color: 'green' },
        { icon: TrendingUp, value: '95%', label: 'Success Rate', color: 'orange' }
    ];

    const values = [
        { icon: CheckCircle, text: 'Innovation First' },
        { icon: CheckCircle, text: 'User-Centric Design' },
        { icon: CheckCircle, text: 'Trust & Transparency' },
        { icon: CheckCircle, text: 'Continuous Improvement' }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
            <Navbar />

            <style>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0px) rotate(0deg); }
                    50% { transform: translateY(-20px) rotate(5deg); }
                }
                @keyframes pulse-glow {
                    0%, 100% { box-shadow: 0 0 20px rgba(59, 130, 246, 0.5); }
                    50% { box-shadow: 0 0 40px rgba(59, 130, 246, 0.8); }
                }
                @keyframes slide-up {
                    from { opacity: 0; transform: translateY(30px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes rotate-slow {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                .float-animation {
                    animation: float 6s ease-in-out infinite;
                }
                .pulse-glow {
                    animation: pulse-glow 2s ease-in-out infinite;
                }
                .slide-up {
                    animation: slide-up 0.6s ease-out forwards;
                }
                .rotate-slow {
                    animation: rotate-slow 20s linear infinite;
                }
            `}</style>

            {/* Hero Section */}
            <section className="relative pt-24 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
                {/* Animated Background Elements */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl float-animation"></div>
                    <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl float-animation" style={{ animationDelay: '2s' }}></div>
                    <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-pink-400/10 rounded-full blur-3xl float-animation" style={{ animationDelay: '4s' }}></div>
                </div>

                <div className="max-w-6xl mx-auto relative z-10">
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-blue-200 dark:border-blue-800 rounded-full mb-6 shadow-lg">
                            <Sparkles className="w-4 h-4 text-blue-600" />
                            <span className="text-sm font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                Powered by Modern Technology
                            </span>
                        </div>

                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                                Empowering Careers.
                            </span>
                            <br />
                            <span className="text-gray-900 dark:text-white">Connecting Talent.</span>
                        </h1>

                        <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
                            A cutting-edge recruitment platform built with <span className="font-semibold text-blue-600">modern technology</span> to connect talented professionals with leading companies worldwide.
                        </p>

                        {/* Tech Stack Icons */}
                        <div className="flex items-center justify-center gap-8 mb-12">
                            {techStack.map((tech, index) => (
                                <div
                                    key={index}
                                    className="flex flex-col items-center gap-2 group cursor-pointer"
                                    style={{ animationDelay: `${index * 0.2}s` }}
                                >
                                    <div className="p-4 bg-white dark:bg-gray-800 rounded-2xl shadow-lg group-hover:shadow-2xl transition-all duration-300 group-hover:-translate-y-2">
                                        <tech.icon className={`w-8 h-8 ${tech.color}`} />
                                    </div>
                                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400">{tech.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
                        {stats.map((stat, index) => (
                            <div
                                key={index}
                                className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 text-center shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
                            >
                                <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl mb-4">
                                    <stat.icon className="w-7 h-7 text-white" />
                                </div>
                                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                                    {stat.value}
                                </div>
                                <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                            Why Choose <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">JobPortal</span>
                        </h2>
                        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                            Built with cutting-edge technology to deliver the best job search experience
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className={`group relative bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden ${activeCard === index ? 'ring-2 ring-blue-500' : ''}
                                    }`}
                            >
                                {/* Gradient Background */}
                                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>

                                <div className="relative z-10">
                                    <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                        <feature.icon className="w-8 h-8 text-white" />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-blue-600 transition-colors">
                                        {feature.title}
                                    </h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                                        {feature.description}
                                    </p>
                                    <div className="flex items-center gap-2 text-blue-600 font-semibold group-hover:gap-4 transition-all">
                                        <span>Learn more</span>
                                        <ArrowRight className="w-5 h-5" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Mission Section */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 opacity-95"></div>

                {/* Animated circles */}
                <div className="absolute top-10 right-10 w-64 h-64 border-4 border-white/20 rounded-full rotate-slow"></div>
                <div className="absolute bottom-10 left-10 w-48 h-48 border-4 border-white/20 rounded-full rotate-slow" style={{ animationDelay: '5s' }}></div>

                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full mb-8">
                        <Target className="w-4 h-4 text-white" />
                        <span className="text-sm font-semibold text-white">Our Mission</span>
                    </div>

                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
                        Building the Future of Work
                    </h2>
                    <p className="text-lg text-white/90 leading-relaxed mb-12">
                        We envision a world where every talented individual finds their dream job, and every company discovers the perfect candidate — all through one powerful, intuitive platform powered by modern technology.
                    </p>

                    <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
                        {values.map((value, index) => (
                            <div
                                key={index}
                                className="flex items-center gap-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4 hover:bg-white/20 transition-all duration-300"
                            >
                                <value.icon className="w-6 h-6 text-green-300 flex-shrink-0" />
                                <span className="text-white font-medium">{value.text}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-950">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="inline-flex items-center gap-2 mb-6">
                        <Star className="w-6 h-6 text-yellow-500 fill-yellow-500" />
                        <Star className="w-6 h-6 text-yellow-500 fill-yellow-500" />
                        <Star className="w-6 h-6 text-yellow-500 fill-yellow-500" />
                        <Star className="w-6 h-6 text-yellow-500 fill-yellow-500" />
                        <Star className="w-6 h-6 text-yellow-500 fill-yellow-500" />
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                        Ready to Start Your Journey?
                    </h2>
                    <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
                        Join thousands of professionals who have found their dream careers through JobPortal
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a
                            href="/jobs"
                            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
                        >
                            Browse Jobs
                        </a>
                        <a
                            href="/register"
                            className="px-8 py-4 bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white font-semibold rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
                        >
                            Create Account
                        </a>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default About;
