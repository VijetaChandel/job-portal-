import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../ui/Button';

const Hero = () => {
    return (
        <div className="relative h-[600px] flex items-center justify-center">
            {/* Background Image with Overlay */}
            <div
                className="absolute inset-0 z-0 bg-cover bg-center"
                style={{
                    backgroundImage: 'url("https://images.unsplash.com/photo-1521737711867-e3b97375f902?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80")',
                }}
            >
                <div className="absolute inset-0 bg-black/50" />
            </div>

            {/* Content */}
            <div className="relative z-10 max-w-4xl mx-auto px-4 text-center text-white">
                <h1 className="text-4xl md:text-6xl font-bold mb-6">
                    Find Your Dream Job Today
                </h1>
                <p className="text-xl md:text-2xl mb-8 text-gray-200">
                    Connecting talent with opportunity. Browse thousands of jobs from top companies.
                </p>
                <Link to="/jobs">
                    <Button size="lg" className="px-8">
                        Browse Jobs
                    </Button>
                </Link>
            </div>
        </div>
    );
};

export default Hero;
