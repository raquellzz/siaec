import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getMyProducts, deleteProduct } from '../../services/productService';

function MyProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const data = await getMyProducts();
      setProducts(data.content || []);
      setError(null);
    } catch (err) {
      setError('Falha ao carregar seus produtos. Você tem permissão de artesão?');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleDelete = async (productId) => {
    if (window.confirm('Tem certeza que deseja deletar este produto?')) {
      try {
        await deleteProduct(productId);
        loadProducts();
      } catch (err) {
        setError('Falha ao deletar o produto.' + (err.response?.data?.message || ''));
      }
    }
  };

  if (loading) return <div>Carregando produtos...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;

  return (
    <div style={{ padding: '20px' }}>
      <h1>Gerenciar Meus Produtos</h1>

      <Link to="/meus-produtos/novo">
        <button style={{ marginBottom: '20px', padding: '10px' }}>+ Adicionar Novo Produto</button>
      </Link>

      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ borderBottom: '2px solid black' }}>
            <th style={{ textAlign: 'left', padding: '8px' }}>Nome</th>
            <th style={{ textAlign: 'left', padding: '8px' }}>Preço</th>
            <th style={{ textAlign: 'left', padding: '8px' }}>Estoque</th>
            <th style={{ textAlign: 'left', padding: '8px' }}>Status</th>
            <th style={{ textAlign: 'left', padding: '8px' }}>Ações</th>
          </tr>
        </thead>
        <tbody>
          {products.length === 0 ? (
            <tr>
              <td colSpan="5" style={{ padding: '8px', textAlign: 'center' }}>
                Você ainda não cadastrou nenhum produto.
              </td>
            </tr>
          ) : (
            products.map((product) => (
              <tr key={product.productId} style={{ borderBottom: '1px solid #ddd' }}>
                <td style={{ padding: '8px' }}>{product.name}</td>
                <td style={{ padding: '8px' }}>R$ {product.price?.toFixed(2) || '0.00'}</td>
                <td style={{ padding: '8px' }}>{product.stock}</td>
                <td style={{ padding: '8px' }}>{product.status ? 'Ativo' : 'Inativo'}</td>
                <td style={{ padding: '8px' }}>
                  <Link to={`/meus-produtos/editar/${product.productId}`}>
                    <button style={{ marginRight: '5px' }}>Editar</button>
                  </Link>
                  <button
                    onClick={() => handleDelete(product.productId)}
                    style={{ backgroundColor: '#dc3545', color: 'white', border: 'none' }}
                  >
                    Deletar
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default MyProductsPage;
