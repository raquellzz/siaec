import api from './api';

export const getArtisans = async (page = 0, size = 10, nameFilter = null) => {
    try {
        const params = { page, size };
        if (nameFilter) {
            params.name = nameFilter;
        }
        // Chama GET /v1/artisans
        const response = await api.get('/artisans', { params });
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar artesãos:", error);
        throw error;
    }
};

export const getArtisanById = async (id) => {
    // ... (para a página "Ver artesão")
};