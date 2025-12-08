import api from './api';

/**
 * Cria um novo pedido.
 * @param {object} orderData
 * @returns {Promise<object>}
 */
export const createOrder = async (orderData) => {
  try {
    const response = await api.post('/orders', orderData);
    return response.data;
  } catch (error) {
    console.error('Erro ao criar pedido:', error.response?.data || error.message);
    throw error;
  }
};

export const getMyOrders = async (page = 0, size = 10) => {
  try {
    const response = await api.get('/orders/my-orders', {
      params: { page, size, sort: 'createdAt,desc' },
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar meus pedidos:', error.response?.data || error.message);
    throw error;
  }
};