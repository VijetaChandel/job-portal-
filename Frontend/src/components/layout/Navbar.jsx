import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
    Menu, X, Rocket, User as UserIcon, 
    LogOut, Settings, LayoutDashboard, 
    PlusCircle, Briefcase, ChevronDown,
    Zap, ShieldCheck, PieChart
} from 'lucide-react';
import { Button } from '../ui/Button';
import { cn } from '../../utils/cn';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const { user, logout } = useAuth();
    const location = useLocation();
    const userMenuRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        const handleClickOutside = (event) => {
            if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
                setIsUserMenuOpen(false);
            }
        };
        window.addEventListener('scroll', handleScroll);
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            window.removeEventListener('scroll', handleScroll);
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const recruiterLinks = [
        { name: 'Admin Hub', path: '/admin/companies', icon: <LayoutDashboard className="w-4 h-4" /> },
        { name: 'Post Vacancy', path: '/admin/jobs/create', icon: <PlusCircle className="w-4 h-4" /> },
        { name: 'Analytics', path: '/admin/overview', icon: <PieChart className="w-4 h-4" /> },
    ];

    const studentLinks = [
        { name: 'Home', path: '/' },
        { name: 'Browse Jobs', path: '/jobs' },
        { name: 'About Us', path: '/about' },
    ];

    const guestLinks = [
        { name: 'Explore', path: '/jobs' },
        { name: 'About', path: '/about' },
        { name: 'Features', path: '/features#features' },
        { name: 'Pricing', path: '/features#pricing' },
    ];

    const currentLinks = user?.role === 'recruiter' ? recruiterLinks : user?.role === 'student' ? studentLinks : guestLinks;

    return (
        <nav
            className={cn(
                'fixed top-0 left-0 right-0 z-[100] transition-all duration-500',
                isScrolled
                    ? 'bg-[#0f1419]/80 backdrop-blur-xl border-b border-white/5 py-4 shadow-[0_8px_32px_rgba(0,0,0,0.4)]'
                    : 'bg-transparent py-7'
            )}
        >
            <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
                <div className="flex justify-between items-center">
                    {/* Logo Strategy */}
                    <Link to="/" className="flex items-center gap-3 group relative">
                        <div className="absolute inset-0 bg-[#00d9ff]/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="relative bg-gradient-to-br from-[#00d9ff] to-[#7c3aed] p-2.5 rounded-2xl group-hover:rotate-[15deg] group-hover:scale-110 transition-all duration-500 shadow-lg shadow-[#00d9ff]/20">
                            <Rocket className="w-6 h-6 text-white" />
                        </div>
                        <span className="relative text-2xl font-black tracking-[0.1em] text-[#00d9ff] uppercase font-syne">
                            JOBPORTAL
                        </span>
                    </Link>

                    {/* Desktop Matrix Navigation */}
                    <div className="hidden lg:flex items-center gap-10">
                        {currentLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                className={cn(
                                    "relative text-xs font-black uppercase tracking-[0.2em] transition-all duration-300 py-2",
                                    location.pathname === link.path 
                                        ? "text-[#00d9ff]" 
                                        : "text-[#a0aec0] hover:text-white"
                                )}
                            >
                                <span className="relative z-10 flex items-center gap-2">
                                    {link.icon}
                                    {link.name}
                                </span>
                                {location.pathname === link.path && (
                                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#00d9ff] to-transparent rounded-full shadow-[0_0_10px_#00d9ff]" />
                                )}
                            </Link>
                        ))}
                    </div>

                    {/* Interaction Hub */}
                    <div className="hidden lg:flex items-center gap-6">
                        {user ? (
                            <div className="relative" ref={userMenuRef}>
                                <button 
                                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                                    className="flex items-center gap-4 bg-white/5 border border-white/10 hover:border-[#00d9ff]/30 p-1.5 pr-4 rounded-2xl transition-all group"
                                >
                                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00d9ff] to-[#7c3aed] flex items-center justify-center text-white font-black text-sm shadow-inner group-hover:scale-105 transition-transform">
                                        {user.fullname?.charAt(0)}
                                    </div>
                                    <div className="text-left">
                                        <p className="text-[10px] font-black uppercase tracking-widest text-[#a0aec0] leading-none mb-1">Authenticated</p>
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm font-bold text-[#f1f5f9] tracking-tight">{user.fullname}</span>
                                            <ChevronDown className={cn("w-4 h-4 text-[#a0aec0] transition-transform duration-300", isUserMenuOpen && "rotate-180")} />
                                        </div>
                                    </div>
                                </button>

                                {/* User Dropdown Matrix */}
                                {isUserMenuOpen && (
                                    <div className="absolute top-full right-0 mt-4 w-72 glass-card p-2 animate-slide-up origin-top-right shadow-[0_20px_50px_rgba(0,0,0,0.5)] border-[#00d9ff]/20">
                                        <div className="p-4 mb-2 border-b border-white/5">
                                            <p className="text-[10px] font-black text-[#a0aec0] uppercase tracking-widest mb-1">Account Entity</p>
                                            <p className="text-sm font-bold text-white truncate">{user.email}</p>
                                            <div className="flex items-center gap-2 mt-2">
                                                <span className="px-2 py-0.5 rounded-md bg-[#00d9ff]/10 text-[#00d9ff] text-[9px] font-black uppercase tracking-widest border border-[#00d9ff]/20">
                                                    {user.role} Status
                                                </span>
                                            </div>
                                        </div>
                                        
                                        <div className="space-y-1">
                                            <Link 
                                                to={user.role === 'recruiter' ? '/admin/overview' : '/profile'}
                                                onClick={() => setIsUserMenuOpen(false)}
                                                className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 text-[#a0aec0] hover:text-[#00d9ff] transition-all group/item"
                                            >
                                                <LayoutDashboard className="w-4 h-4 group-hover/item:scale-110 transition-transform" />
                                                <span className="text-xs font-black uppercase tracking-widest">Dashboard Hub</span>
                                            </Link>
                                            <Link 
                                                to="/settings"
                                                onClick={() => setIsUserMenuOpen(false)}
                                                className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 text-[#a0aec0] hover:text-[#7c3aed] transition-all group/item"
                                            >
                                                <Settings className="w-4 h-4 group-hover/item:scale-110 transition-transform" />
                                                <span className="text-xs font-black uppercase tracking-widest">System Params</span>
                                            </Link>
                                            <div className="h-px bg-white/5 my-2 mx-2" />
                                            <button 
                                                onClick={logout}
                                                className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-red-500/10 text-[#a0aec0] hover:text-red-400 transition-all group/item"
                                            >
                                                <LogOut className="w-4 h-4 group-hover/item:scale-110 transition-transform" />
                                                <span className="text-xs font-black uppercase tracking-widest">Terminate Session</span>
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="flex items-center gap-4">
                                <Link
                                    to="/login"
                                    className="text-xs font-black text-[#a0aec0] uppercase tracking-widest hover:text-white transition-all px-4"
                                >
                                    Log In
                                </Link>
                                <Button
                                    className="btn-primary px-8 py-3.5 text-[10px] font-black uppercase tracking-[0.2em] shadow-xl shadow-[#00d9ff]/20"
                                    onClick={() => window.location.href = '/register'}
                                >
                                    Join Network
                                </Button>
                            </div>
                        )}
                    </div>

                    {/* Mobile Command Toggle */}
                    <div className="lg:hidden">
                        <button
                            className="w-12 h-12 flex items-center justify-center rounded-2xl bg-white/5 border border-white/10 text-white active:scale-95 transition-all"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        >
                            {isMobileMenuOpen ? (
                                <X className="w-6 h-6" />
                            ) : (
                                <Menu className="w-6 h-6" />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Terminal Menu */}
            {isMobileMenuOpen && (
                <div className="lg:hidden fixed inset-0 top-[88px] bg-[#0f1419]/98 backdrop-blur-2xl z-[90] p-6 animate-fade-in flex flex-col">
                    <div className="space-y-10 flex-1 overflow-y-auto pb-10">
                        <div className="space-y-6">
                            <p className="text-[10px] font-black text-[#a0aec0] uppercase tracking-[0.4em] mb-4 opacity-50">Core Assets</p>
                            {currentLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    to={link.path}
                                    className="flex items-center gap-5 text-3xl font-black text-[#f1f5f9] hover:text-[#00d9ff] transition-all py-3 active:scale-95 origin-left"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    <span className="p-3 rounded-2xl bg-white/5 border border-white/10 text-[#00d9ff]">{link.icon}</span>
                                    {link.name}
                                </Link>
                            ))}
                        </div>
                        
                        <div className="pt-8 border-t border-white/10">
                            {user ? (
                                <div className="space-y-6">
                                    <div className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-white/10">
                                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#00d9ff] to-[#7c3aed] flex items-center justify-center text-white text-xl font-black">
                                            {user.fullname?.charAt(0)}
                                        </div>
                                        <div>
                                            <p className="text-lg font-black text-white">{user.fullname}</p>
                                            <p className="text-xs font-bold text-[#a0aec0] uppercase tracking-widest">{user.role}</p>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <Link to="/settings" className="p-4 bg-white/5 rounded-2xl text-center font-black text-xs uppercase tracking-widest text-[#a0aec0]">Settings</Link>
                                        <button onClick={logout} className="p-4 bg-red-500/10 rounded-2xl text-center font-black text-xs uppercase tracking-widest text-red-400">Logout</button>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex flex-col gap-4">
                                    <Button
                                        className="btn-primary w-full py-5 text-xs font-black uppercase tracking-widest"
                                        onClick={() => { window.location.href = '/register'; setIsMobileMenuOpen(false); }}
                                    >
                                        Join Ecosystem
                                    </Button>
                                    <Link
                                        to="/login"
                                        className="text-center py-4 text-xs font-black uppercase tracking-widest text-[#a0aec0] hover:text-white"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        Log In
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
