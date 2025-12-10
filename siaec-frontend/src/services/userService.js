import api from './api';

export const getMyProfile = async (userId) => {
  try {
    const response = await api.get(`/users/${userId}`);
    return response.data; // Retorna o UserResponseDTO
  } catch (error) {
    console.error('Erro ao buscar perfil:', error.response?.data || error.message);
    throw error;
  }
};

export const updateUserProfile = async (updateData, userId) => {
  try {
    const response = await api.patch(`/users/${userId}`, updateData);
    return response.data;
  } catch (error) {
    console.error('Erro ao atualizar perfil:', error.response?.data || error.message);
    throw error;
  }
};

export const deleteMyAccount = async (userId) => {
  try {
    await api.delete(`/users/${userId}`);
  } catch (error) {
    console.error('Erro ao deletar conta:', error.response?.data || error.message);
    throw error;
  }
};

export const getAllUsers = async (page = 0, size = 10) => {
  try {
    const params = { page, size, sort: 'createdAt,desc' };
    const response = await api.get('/users', { params });
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar usuários:', error);
    throw error;
  }
};

export const updateUserStatus = async (userId, newStatus) => {
  try {
    // Exemplo de endpoint: PATCH /users/{id}/status?status=BANNED
    const response = await api.patch(`/users/${userId}/status`, null, {
      params: { status: newStatus },
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao atualizar status:', error);
    throw error;
  }
};
