import api from './api';

/**
 * Busca produtos da API com paginação e filtro
 * @param {number} page - O número da página (começando em 0)
 * @param {number} size - O tamanho da página
 * @param {string} nameFilter - Um nome para filtrar (opcional)
 * @returns {Promise<Object>} - A página de produtos (ex: { content: [], totalPages: 5 })
 */
export const getProducts = async (page = 0, size = 10, nameFilter = null) => {
  try {
    const params = {
      page: page,
      size: size,
    };

    if (nameFilter) {
      params.name = nameFilter;
    }

    const response = await api.get('/products', { params });
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar produtos:', error);
    throw error;
  }
};

/**
 * Busca os produtos do usuário autenticado
 * @param {number} page - O número da página (começando em 0)
 * @param {number} size - O tamanho da página
 * @returns {Promise<Object>} - A página de produtos do usuário
 */
export const getMyProducts = async (page = 0, size = 10) => {
  try {
    const response = await api.get('/products/my-products', {
      params: { page, size, sort: 'name,asc' },
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar meus produtos:', error.response?.data || error.message);
    throw error;
  }
};

/**
 * Busca um único produto pelo ID
 * @param {string} id - O ID do produto
 * @returns {Promise<Object>} - O objeto do produto
 */
export const getProductById = async (id) => {
  try {
    const response = await api.get(`/products/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Erro ao buscar produto com id ${id}:`, error);
    throw error;
  }
};

export const deleteProduct = async (productId) => {
  try {
    await api.delete(`/products/${productId}`);
  } catch (error) {
    console.error('Erro ao deletar produto:', error.response?.data || error.message);
    throw error;
  }
};

export const createProduct = async (productData) => {
  try {
    const response = await api.post('/products', productData);
    return response.data;
  } catch (error) {
    console.error('Erro ao criar produto:', error.response?.data || error.message);
    throw error;
  }
};

export const updateProduct = async (productId, productData) => {
  try {
    const response = await api.put(`/products/${productId}`, productData);
    return response.data;
  } catch (error) {
    console.error('Erro ao atualizar produto:', error.response?.data || error.message);
    throw error;
  }
};

/**
 * Busca produtos de um artesão específico
 * @param {string} artisanId - O ID do artesão
 * @param {number} page - O número da página (começando em 0)
 * @param {number} size - O tamanho da página
 * @returns {Promise<Object>} - A página de produtos (ex: { content: [], totalPages: 5 })
 */
export const getProductsByArtisanId = async (artisanId, page = 0, size = 9) => {
  try {
    const url = `/products/by-artisan/${artisanId}?page=${page}&size=${size}`;
    console.log("SERVICE LOG: Chamando URL Catálogo:", url); // LOG DE DIAGNÓSTICO
    const response = await api.get(url);
    return response.data;
  } catch (error) {
    console.error(`SERVICE LOG: Erro ${error.response?.status} ao buscar produtos do artesão ${artisanId}:`, error.message);
    throw error;
  }
};