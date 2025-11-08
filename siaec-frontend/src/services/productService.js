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
        console.error("Erro ao buscar produtos:", error);
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
