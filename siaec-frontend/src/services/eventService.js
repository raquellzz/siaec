import api from './api';

export const getEvents = async (page = 0, size = 10, nameFilter = null) => {
    try {
        const params = { page, size };
        if (nameFilter) {
            params.name = nameFilter;
        }
        // Chama GET /v1/events
        const response = await api.get('/events', { params });
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar eventos:", error);
        throw error;
    }
};

export const getEventById = async (id) => {
    // ... (para a página "Ver evento")
};