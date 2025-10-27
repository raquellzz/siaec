import api from './api';

export const getHomeData = async () => {
    try {
        const response = await api.get('/'); 
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar dados da home:", error);
        throw error;
    }
};