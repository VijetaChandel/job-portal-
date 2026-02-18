import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Briefcase, Sun, Moon } from 'lucide-react';
import { Button } from '../ui/Button';
import { cn } from '../../utils/cn';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { user, logout } = useAuth();
    const { isDark, toggleTheme } = useTheme();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Find Jobs', path: '/jobs' },
        { name: 'Companies', path: '/companies' },
        { name: 'About', path: '/about' },
    ];

    return (
        <nav
            className={cn(
                'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
                isScrolled
                    ? 'bg-white dark:bg-gray-900 shadow-md py-2'
                    : 'bg-transparent py-4'
            )}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2">
                        <div className="bg-blue-600 p-2 rounded-lg">
                            <Briefcase className="w-6 h-6 text-white" />
                        </div>
                        <span className={cn("text-2xl font-bold", isScrolled ? "text-gray-900 dark:text-white" : "text-white")}>
                            JobPortal
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                className={cn(
                                    "font-medium transition-colors hover:text-blue-500",
                                    isScrolled ? "text-gray-600 dark:text-gray-300" : "text-gray-100"
                                )}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    {/* Auth Buttons + Theme Toggle */}
                    <div className="hidden md:flex items-center gap-4">
                        {/* Dark/Light Mode Toggle */}
                        <button
                            onClick={toggleTheme}
                            className={cn(
                                "flex items-center gap-1.5 px-3 py-2 rounded-full transition-all duration-300 text-sm font-medium",
                                isScrolled
                                    ? "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-yellow-400 hover:bg-gray-200 dark:hover:bg-gray-600"
                                    : "bg-white/10 text-white hover:bg-white/20"
                            )}
                            title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
                        >
                            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                            <span>{isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}</span>
                        </button>

                        {user ? (
                            <div className="flex items-center gap-4">
                                <span className={cn("text-sm font-medium", isScrolled ? "text-gray-900 dark:text-white" : "text-white")}>
                                    Hi, {user.fullname}
                                </span>
                                {user.role === 'student' && (
                                    <Link
                                        to="/profile"
                                        className={cn(
                                            "text-sm font-medium px-4 py-2 rounded-lg transition-colors",
                                            isScrolled ? "text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30" : "text-white hover:bg-white/10"
                                        )}
                                    >
                                        Profile
                                    </Link>
                                )}
                                <Button
                                    variant="ghost"
                                    className={isScrolled ? "text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20" : "text-red-200 hover:text-red-100 hover:bg-white/10"}
                                    onClick={logout}
                                >
                                    Log Out
                                </Button>
                            </div>
                        ) : (
                            <div className="flex items-center gap-3">
                                <div className="relative group">
                                    <Button
                                        variant={isScrolled ? "ghost" : "ghost"}
                                        className={cn(
                                            "flex items-center gap-1",
                                            isScrolled ? "text-gray-700 dark:text-gray-200" : "text-white hover:bg-white/10"
                                        )}
                                    >
                                        Login
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                                    </Button>
                                    <div className="absolute right-0 w-48 mt-2 py-2 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-[60]">
                                        <Link to="/login?role=student" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-blue-900/30 hover:text-blue-600">
                                            Job Seeker Login
                                        </Link>
                                        <Link to="/login?role=recruiter" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-blue-900/30 hover:text-blue-600 border-t border-gray-50 dark:border-gray-700">
                                            Admin/Recruiter Login
                                        </Link>
                                    </div>
                                </div>

                                <div className="relative group">
                                    <Button variant="primary" className="flex items-center gap-1">
                                        Register
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                                    </Button>
                                    <div className="absolute right-0 w-48 mt-2 py-2 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-[60]">
                                        <Link to="/register?role=student" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-blue-900/30 hover:text-blue-600">
                                            Job Seeker Register
                                        </Link>
                                        <Link to="/register?role=recruiter" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-blue-900/30 hover:text-blue-600 border-t border-gray-50 dark:border-gray-700">
                                            Recruiter Register
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Mobile: Theme Toggle + Menu Button */}
                    <div className="md:hidden flex items-center gap-2">
                        <button
                            onClick={toggleTheme}
                            className={cn(
                                "flex items-center gap-1 px-2 py-1.5 rounded-full transition-all duration-300 text-xs font-medium",
                                isScrolled
                                    ? "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-yellow-400"
                                    : "bg-white/10 text-white"
                            )}
                        >
                            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                            <span>{isDark ? "Light" : "Dark"}</span>
                        </button>
                        <button
                            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        >
                            {isMobileMenuOpen ? (
                                <X className={cn("w-6 h-6", isScrolled ? "text-gray-900 dark:text-white" : "text-white")} />
                            ) : (
                                <Menu className={cn("w-6 h-6", isScrolled ? "text-gray-900 dark:text-white" : "text-white")} />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-700 animate-in slide-in-from-top duration-300">
                    <div className="px-4 pt-2 pb-6 space-y-2">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                className="block px-3 py-2 text-base font-medium text-gray-700 dark:text-gray-200 hover:text-blue-600 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                {link.name}
                            </Link>
                        ))}
                        <div className="pt-4 space-y-3">
                            {user ? (
                                <div className="space-y-3">
                                    <div className="px-3 py-2 text-sm font-medium text-gray-400 dark:text-gray-500">
                                        Logged in as {user.fullname}
                                    </div>
                                    {user.role === 'student' && (
                                        <Link
                                            to="/profile"
                                            onClick={() => setIsMobileMenuOpen(false)}
                                            className="block w-full px-3 py-3 text-center font-bold text-blue-600 bg-blue-50 dark:bg-blue-900/30 rounded-xl border border-blue-100 dark:border-blue-800"
                                        >
                                            View Profile & Applications
                                        </Link>
                                    )}
                                    <Button
                                        variant="outline"
                                        onClick={() => { logout(); setIsMobileMenuOpen(false); }}
                                        className="w-full justify-center text-red-600 border-red-200 hover:bg-red-50 dark:hover:bg-red-900/20"
                                    >
                                        Log Out
                                    </Button>
                                </div>
                            ) : (
                                <div className="grid grid-cols-2 gap-2">
                                    <div className="col-span-2 text-xs font-semibold text-gray-500 uppercase tracking-wider px-3 mb-1">
                                        Login
                                    </div>
                                    <Link to="/login?role=student" onClick={() => setIsMobileMenuOpen(false)} className="px-3 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors text-center border border-gray-100 dark:border-gray-700">
                                        Job Seeker
                                    </Link>
                                    <Link to="/login?role=recruiter" onClick={() => setIsMobileMenuOpen(false)} className="px-3 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors text-center border border-gray-100 dark:border-gray-700">
                                        Admin
                                    </Link>

                                    <div className="col-span-2 text-xs font-semibold text-gray-500 uppercase tracking-wider px-3 mt-2 mb-1">
                                        Register
                                    </div>
                                    <Link to="/register?role=student" onClick={() => setIsMobileMenuOpen(false)} className="px-3 py-2 text-sm font-medium text-blue-600 bg-blue-50 dark:bg-blue-900/30 rounded-lg hover:bg-blue-100 transition-colors text-center border border-blue-100 dark:border-blue-800">
                                        Job Seeker
                                    </Link>
                                    <Link to="/register?role=recruiter" onClick={() => setIsMobileMenuOpen(false)} className="px-3 py-2 text-sm font-medium text-blue-600 bg-blue-50 dark:bg-blue-900/30 rounded-lg hover:bg-blue-100 transition-colors text-center border border-blue-100 dark:border-blue-800">
                                        Recruiter
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
