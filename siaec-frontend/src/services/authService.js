import api from './api';

/**
 * Chama o endpoint /auth/login do backend.
 * @param {string} email
 * @param {string} password
 * @returns {Promise<object>} A resposta da API (LoginResponseDTO)
 */
export const login = async (email, password) => {
    try {
        const response = await api.post('/auth/login', {
            email: email,
            password: password
        });
        
        return response.data;

    } catch (error) {
        console.error("Erro no serviço de login:", error.response?.data || error.message);
        throw error; 
    }
};

/**
 * Chama o endpoint /auth/register do backend.
 * @param {object} userData (UserDTO)
 * @returns {Promise<object>} A resposta da API (UserResponseDTO)
 */
export const register = async (userData) => {
    try {
        const response = await api.post('/auth/register', userData);
        return response.data;
    } catch (error) {
        console.error("Erro no serviço de registro:", error.response?.data || error.message);
        throw error;
    }
};