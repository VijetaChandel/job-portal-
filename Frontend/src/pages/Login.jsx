import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, LogIn, ShieldCheck, UserCheck } from 'lucide-react';

const Login = () => {
    const navigate = useNavigate();
    const { login } = useAuth();

    const queryParams = new URLSearchParams(window.location.search);
    const initialRole = queryParams.get('role') === 'recruiter' ? 'recruiter' : 'student';

    const [role, setRole] = useState(initialRole);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        
        const { email, password } = e.target.elements;
        const emailValue = email.value.trim();
        const passwordValue = password.value;

        if (!emailValue || !passwordValue) {
            setError("All credentials must be provided.");
            return;
        }

        setLoading(true);

        const result = await login({
            email: emailValue,
            password: passwordValue,
            role: role
        });

        if (result.success) {
            if (role === 'recruiter') {
                navigate('/recruiter/my-jobs');
            } else {
                navigate('/jobs');
            }
        } else {
            setError(result.message);
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen bg-[#0f1419] flex flex-col relative overflow-hidden">
            {/* Background Glows */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#00d9ff]/10 rounded-full blur-[120px] animate-pulse"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#7c3aed]/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }}></div>

            <Navbar />
            
            <div className="flex-grow flex items-center justify-center py-10 sm:py-20 px-4 relative z-10">
                <div className="glass-card max-w-md w-full p-5 sm:p-10 animate-fade-in-up">
                    <div className="text-center mb-10">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-[#00d9ff] to-[#7c3aed] mb-6 shadow-lg shadow-[#00d9ff]/20">
                            <LogIn className="w-8 h-8 text-white" />
                        </div>
                        <h2 className="text-3xl md:text-4xl font-extrabold mb-3">
                            Welcome <span className="gradient-text">Back</span>
                        </h2>
                        <p className="text-[#a0aec0] text-xs md:text-sm font-medium">
                            Enter your credentials to access your account.
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

                    <form className="space-y-6" onSubmit={handleLogin}>
                        <div className="space-y-4">
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Mail className="h-5 w-5 text-[#a0aec0] group-focus-within:text-[#00d9ff] transition-colors" />
                                </div>
                                <input
                                    name="email"
                                    type="email"
                                    required
                                    className="w-full bg-white/5 border border-white/10 text-white pl-12 pr-4 py-4 rounded-xl focus:outline-none focus:border-[#00d9ff]/50 transition-all placeholder:text-[#a0aec0]/40 font-medium"
                                    placeholder="Email Address"
                                />
                            </div>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-[#a0aec0] group-focus-within:text-[#00d9ff] transition-colors" />
                                </div>
                                <input
                                    name="password"
                                    type="password"
                                    required
                                    className="w-full bg-white/5 border border-white/10 text-white pl-12 pr-4 py-4 rounded-xl focus:outline-none focus:border-[#00d9ff]/50 transition-all placeholder:text-[#a0aec0]/40 font-medium"
                                    placeholder="Password"
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-between px-1">
                            <label className="flex items-center gap-3 cursor-pointer group">
                                <div className="relative w-5 h-5 rounded-md border border-white/10 bg-white/5 group-hover:border-[#00d9ff]/50 transition-all">
                                    <input type="checkbox" className="sr-only peer" />
                                    <div className="absolute inset-0 opacity-0 peer-checked:opacity-100 transition-opacity flex items-center justify-center">
                                        <div className="w-2.5 h-2.5 rounded-[2px] bg-[#00d9ff]"></div>
                                    </div>
                                </div>
                                <span className="text-sm text-[#a0aec0] group-hover:text-white transition-colors">Remember Me</span>
                            </label>
                            <Link to="#" className="text-sm text-[#00d9ff] hover:text-[#7c3aed] transition-colors font-semibold">
                                Forgot Password?
                            </Link>
                        </div>

                        <Button 
                            type="submit" 
                            className="w-full btn-primary py-4 text-base font-bold shadow-xl shadow-[#00d9ff]/20" 
                            disabled={loading}
                        >
                            {loading ? 'Authenticating...' : `Sign In as ${role === 'recruiter' ? 'Recruiter' : 'Job Seeker'}`}
                        </Button>
                    </form>

                    <p className="mt-10 text-center text-[#a0aec0] text-sm flex flex-col sm:flex-row items-center justify-center gap-2">
                        <span>Don't have an account?</span>
                        <Link to="/register" className="text-[#00d9ff] hover:text-[#7c3aed] font-bold transition-all underline decoration-[#00d9ff]/30 underline-offset-4 block py-2">
                            Create Account
                        </Link>
                    </p>
                </div>
            </div>
            
            <Footer />
        </div>
    );
};

export default Login;
