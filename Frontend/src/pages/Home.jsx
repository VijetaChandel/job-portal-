import React from 'react';
import Navbar from '../components/layout/Navbar';
import Hero from '../components/layout/Hero';
import Footer from '../components/layout/Footer';

const Home = () => {
    return (
        <div className="min-h-screen bg-white dark:bg-gray-950">
            <Navbar />
            <main>
                <Hero />

                {/* Simple About / Value Prop Section */}
                <section className="py-20 bg-white dark:bg-gray-950">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Why Choose JobPortal?</h2>
                            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                                We provide a seamless experience for both job seekers and employers, making recruitment efficient and effective.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                            {[
                                { title: 'For Candidates', desc: 'Build your profile, apply with one click, and get discovered by top companies.', icon: '👨‍💻' },
                                { title: 'For Employers', desc: 'Post jobs, manage applications, and find the perfect candidate quickly.', icon: '🏢' },
                                { title: 'Safe & Secure', desc: 'Verified companies and jobs to ensure a safe job hunting experience.', icon: '🔒' }
                            ].map((item, idx) => (
                                <div key={idx} className="p-6 rounded-2xl bg-gray-50 dark:bg-gray-800 hover:bg-white dark:hover:bg-gray-700 hover:shadow-xl transition-all border border-gray-100 dark:border-gray-700">
                                    <div className="text-4xl mb-4">{item.icon}</div>
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{item.title}</h3>
                                    <p className="text-gray-600 dark:text-gray-400">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default Home;

