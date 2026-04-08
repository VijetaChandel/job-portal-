import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// Configure axios for production
const BASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';
axios.defaults.baseURL = BASE_URL;
axios.defaults.withCredentials = true;

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Initial check for loading user from localStorage or API (optional)
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    const login = async (userData) => {
        try {
            const res = await axios.post('/api/v1/user/login', userData, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true // important for cookies
            });

            if (res.data.success) {
                setUser(res.data.user);
                localStorage.setItem('user', JSON.stringify(res.data.user));
                return { success: true, message: res.data.message };
            }
        } catch (error) {
            console.error("Login error:", error);
            return {
                success: false,
                message: error.response?.data?.message || "[AUTH_LOGIN_ERR] Login failed"
            };
        }
    };

    const signup = async (userData) => {
        try {
            const res = await axios.post('/api/v1/user/register', userData, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });

            if (res.data.success) {
                return { success: true, message: res.data.message };
            }
        } catch (error) {
            console.error("Signup error:", error);
            return {
                success: false,
                message: error.response?.data?.message || "[SIGNUP_ERR] Signup failed"
            };
        }
    };

    const logout = async () => {
        try {
            const res = await axios.get('/api/v1/user/logout');
            if (res.data.success) {
                setUser(null);
                localStorage.removeItem('user');
                return { success: true };
            }
        } catch (error) {
            console.error("Logout error:", error);
            // Fallback logout even if API fails
            setUser(null);
            localStorage.removeItem('user');
        }
    };

    const value = {
        user,
        setUser,
        login,
        signup,
        logout,
        loading
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
