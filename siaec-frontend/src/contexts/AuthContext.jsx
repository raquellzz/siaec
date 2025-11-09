import React, { createContext, useState, useEffect } from 'react';
import { login as apiLogin } from '../services/authService';
import api from '../services/api';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null); 
    const [token, setToken] = useState(localStorage.getItem('token')); 

    useEffect(() => {
        if (token) {
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            
            const userId = localStorage.getItem('userId');
            if (userId) {
                setUser({ id: userId });
            }
        }
    }, [token]);

    const login = async (email, password) => {
        try {
            const data = await apiLogin(email, password); 

            localStorage.setItem('token', data.token);
            localStorage.setItem('userId', data.userId);

            setToken(data.token);
            setUser({ id: data.userId });

            api.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;

        } catch (error) {
            console.error("Falha na autenticação (Context)", error);
            throw error; 
        }
    };

    const logout = () => {
        setUser(null);
        setToken(null);

        localStorage.removeItem('token');
        localStorage.removeItem('userId');

        delete api.defaults.headers.common['Authorization'];
    };
    const value = {
        isAuthenticated: !!token, 
        user,
        token,
        login,
        logout
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

