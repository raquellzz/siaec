import api from './api';

export const getEvents = async (page = 0, size = 10, name = '') => {
  try {
    const params = {
      page,
      size,
      sort: 'dateStart,asc' 
    };

    if (name) {
      params.name = name; 
    }

    const response = await api.get('/events', { params });
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar eventos:', error);
    throw error;
  }
};

export const getMyEvents = async (page = 0, size = 10) => {
  try {
    const response = await api.get('/events/my-events', {
      params: { page, size, sort: 'dateStart,asc' },
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar meus eventos:', error.response?.data || error.message);
    throw error;
  }
};

export const getEventById = async (id) => {
    try {
        const response = await api.get(`/events/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Erro ao buscar evento com id ${id}:`, error.response?.data || error.message);
        throw error;
    }
};

export const deleteEvent = async (eventId) => {
  try {
    await api.delete(`/events/my-events/${eventId}`);
  } catch (error) {
    console.error('Erro ao deletar evento:', error.response?.data || error.message);
    throw error;
  }
};

export const createEvent = async (eventData) => {
  try {
    const response = await api.post('/events/my-events', eventData);
    return response.data;
  } catch (error) {
    console.error('Erro ao criar evento:', error.response?.data || error.message);
    throw error;
  }
};

export const updateEvent = async (eventId, eventData) => {
  try {
    const response = await api.put(`/events/my-events/${eventId}`, eventData);
    return response.data;
  } catch (error) {
    console.error('Erro ao atualizar evento:', error.response?.data || error.message);
    throw error;
  }
};