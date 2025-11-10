import { createContext, useState, useEffect } from 'react';
import { login as apiLogin } from '../services/authService';
import { getMyProfile } from '../services/userService';
import api from '../services/api';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loadingAuth, setLoadingAuth] = useState(true);

  useEffect(() => {
    const loadUserFromToken = async () => {
      const storedToken = localStorage.getItem('token');
      const storedUserId = localStorage.getItem('userId');

      if (storedToken && storedToken !== 'undefined' && storedUserId) {
        try {
          api.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;

          const userData = await getMyProfile(storedUserId);

          setUser(userData);
          setToken(storedToken);
        } catch (error) {
          console.error('Falha ao carregar usuário (token pode ter expirado):', error);
          logout();
        }
      }
      setLoadingAuth(false);
    };

    loadUserFromToken();
  }, []);

  const login = async (email, password) => {
    try {
      const data = await apiLogin(email, password);

      localStorage.setItem('token', data.token);
      localStorage.setItem('userId', data.userId);

      api.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;

      const userData = await getMyProfile(data.userId);
      setUser(userData);
      setToken(data.token);
    } catch (error) {
      console.error('Falha na autenticação (Context)', error);
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
    isAuthenticated: !!token && !!user,
    user,
    token,
    loadingAuth,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{!loadingAuth && children}</AuthContext.Provider>;
};
