import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Phone, Lock, UserPlus, ShieldCheck, UserCheck, ArrowRight, Sparkles } from 'lucide-react';

const Register = () => {
    const navigate = useNavigate();
    const { signup } = useAuth();

    const queryParams = new URLSearchParams(window.location.search);
    const initialRole = queryParams.get('role') === 'recruiter' ? 'recruiter' : 'student';

    const [role, setRole] = useState(initialRole);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [focusedField, setFocusedField] = useState(null);

    const handleRegister = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        const formData = new FormData(e.target);
        const userData = {
            fullname: formData.get('name')?.trim(),
            email: formData.get('email')?.trim(),
            phoneNumber: formData.get('phoneNumber'),
            password: formData.get('password'),
            role: role
        };

        if (!userData.fullname || !userData.email || !userData.password || !userData.phoneNumber) {
            setError("All fields are required");
            setLoading(false);
            return;
        }

        const result = await signup(userData);

        if (result.success) {
            navigate('/login');
        } else {
            setError(result.message);
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen bg-[#0f1419] flex flex-col relative overflow-hidden">
            {/* Background Glows */}
            <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#00d9ff]/5 rounded-full blur-[120px] animate-pulse"></div>
            <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#7c3aed]/5 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '3s' }}></div>

            <Navbar />

            <div className="flex-grow flex flex-col lg:flex-row relative z-10">
                {/* Left Side: Illustration & Value Proposition */}
                <div className="hidden lg:flex lg:w-1/2 p-20 flex-col justify-center border-r border-white/5 bg-white/[0.02]">
                    <div className="max-w-xl animate-fade-in-up">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00d9ff]/10 border border-[#00d9ff]/30 text-[#00d9ff] text-xs font-bold tracking-widest uppercase mb-8">
                            <Sparkles className="w-3 h-3" />
                            Join the Future of Work
                        </div>
                        <h1 className="text-6xl font-extrabold mb-8 leading-tight">
                            Elevate Your <span className="gradient-text">Journey</span> With Us.
                        </h1>
                        <p className="text-[#a0aec0] text-xl leading-relaxed mb-12">
                            Whether you're a visionary employer or a top-tier talent, Antigravity connects you to a world of possibilities.
                        </p>

                        <div className="space-y-6">
                            {[
                                { title: 'Direct Access', desc: 'Connect with industry leaders in real-time.' },
                                { title: 'AI Matching', desc: 'Find the perfect fit based on your unique skills.' },
                                { title: 'Verified Profiles', desc: 'Safe and secure environment for everyone.' }
                            ].map((item, idx) => (
                                <div key={idx} className="flex gap-4 items-start group">
                                    <div className="w-1.5 h-10 bg-gradient-to-b from-[#00d9ff] to-[#7c3aed] rounded-full opacity-50 group-hover:opacity-100 transition-opacity"></div>
                                    <div>
                                        <h3 className="text-white font-bold text-lg mb-1">{item.title}</h3>
                                        <p className="text-[#a0aec0] text-sm">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Side: Registration Form */}
                <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12">
                    <div className="glass-card w-full max-w-lg p-6 sm:p-12 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                        <div className="text-center mb-10">
                            <h2 className="text-3xl md:text-4xl font-extrabold mb-3">
                                Create <span className="gradient-text">Account</span>
                            </h2>
                            <p className="text-[#a0aec0] text-xs md:text-sm font-medium">
                                Start your professional journey in minutes.
                            </p>
                        </div>

                        {error && (
                            <div className="bg-red-500/10 border border-red-500/50 text-red-400 p-4 rounded-xl text-sm text-center mb-8 animate-shake">
                                {error}
                            </div>
                        )}

                        {/* Role Toggle */}
                        <div className="flex justify-center mb-10">
                            <div className="bg-white/5 p-1 rounded-2xl flex relative w-full border border-white/10">
                                <div
                                    className={`absolute top-1 bottom-1 rounded-xl bg-gradient-to-r from-[#00d9ff] to-[#7c3aed] transition-all duration-300 ease-out shadow-lg ${
                                        role === 'student' ? 'left-1 w-[calc(50%-4px)]' : 'left-[calc(50%+2px)] w-[calc(50%-4px)]'
                                    }`}
                                ></div>
                                
                                <button
                                    type="button"
                                    onClick={() => setRole('student')}
                                    className={`relative flex-1 py-3 rounded-xl text-sm font-bold transition-colors duration-200 z-10 flex items-center justify-center gap-2 ${
                                        role === 'student' ? 'text-white' : 'text-[#a0aec0] hover:text-white'
                                    }`}
                                >
                                    <UserCheck className="w-4 h-4" />
                                    Job Seeker
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setRole('recruiter')}
                                    className={`relative flex-1 py-3 rounded-xl text-sm font-bold transition-colors duration-200 z-10 flex items-center justify-center gap-2 ${
                                        role === 'recruiter' ? 'text-white' : 'text-[#a0aec0] hover:text-white'
                                    }`}
                                >
                                    <ShieldCheck className="w-4 h-4" />
                                    Recruiter
                                </button>
                            </div>
                        </div>

                        <form className="space-y-5" onSubmit={handleRegister}>
                            {[
                                { id: 'name', label: 'Full Name', icon: User, type: 'text' },
                                { id: 'email', label: 'Email Address', icon: Mail, type: 'email' },
                                { id: 'phoneNumber', label: 'Phone Number', icon: Phone, type: 'tel' },
                                { id: 'password', label: 'Password', icon: Lock, type: 'password' }
                            ].map((field) => (
                                <div key={field.id} className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <field.icon className={`h-5 w-5 transition-colors ${focusedField === field.id ? 'text-[#00d9ff]' : 'text-[#a0aec0]'}`} />
                                    </div>
                                    <input
                                        name={field.id}
                                        type={field.type}
                                        required
                                        onFocus={() => setFocusedField(field.id)}
                                        onBlur={() => setFocusedField(null)}
                                        className="w-full bg-white/5 border border-white/10 text-white pl-12 pr-4 py-4 rounded-xl focus:outline-none focus:border-[#00d9ff]/50 transition-all placeholder:text-[#a0aec0]/40 font-medium"
                                        placeholder={field.label}
                                    />
                                </div>
                            ))}

                            <Button 
                                type="submit" 
                                className="w-full btn-primary py-4 text-base font-bold shadow-xl shadow-[#00d9ff]/20 mt-8" 
                                disabled={loading}
                            >
                                {loading ? 'Creating Profile...' : `Join as ${role === 'recruiter' ? 'Recruiter' : 'Job Seeker'}`}
                            </Button>
                        </form>

                        <p className="mt-10 text-center text-[#a0aec0] text-sm">
                            Already have an account?{' '}
                            <Link to="/login" className="text-[#00d9ff] hover:text-[#7c3aed] font-bold transition-all underline decoration-[#00d9ff]/30 underline-offset-4">
                                Sign In
                            </Link>
                        </p>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default Register;
