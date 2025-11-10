import api from './api';

export const getMyProfile = async (userId) => {
    try {
        const response = await api.get(`/users/${userId}`);
        return response.data; // Retorna o UserResponseDTO
    } catch (error) {
        console.error("Erro ao buscar perfil:", error.response?.data || error.message);
        throw error;
    }
};

export const updateUserProfile = async (userId, updateData) => {
    try {
        await api.patch(`/users/${userId}`, updateData);
    } catch (error) {
        console.error("Erro ao atualizar perfil:", error.response?.data || error.message);
        throw error;
    }
};

export const deleteMyAccount = async (userId) => {
    try {
        await api.delete(`/users/${userId}`);
    } catch (error) {
        console.error("Erro ao deletar conta:", error.response?.data || error.message);
        throw error;
    }
};