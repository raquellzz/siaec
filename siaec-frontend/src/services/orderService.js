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