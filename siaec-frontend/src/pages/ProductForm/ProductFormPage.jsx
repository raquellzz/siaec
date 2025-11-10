import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { createProduct, getProductById, updateProduct } from '../../services/productService';

function ProductFormPage() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(productId);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: 0,
    stock: 0,
    material: '',
    status: true,
    imagePaths: [''],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isEditing) {
      setLoading(true);
      getProductById(productId)
        .then((data) => {
          setFormData({
            name: data.name,
            description: data.description,
            price: data.price,
            stock: data.stock,
            material: data.material,
            status: data.status,
            imagePaths: data.imagePaths || [''],
          });
        })
        .catch((err) =>
          setError('Não foi possível carregar o produto para edição.' + (err.response?.data?.message || '')),
        )
        .finally(() => setLoading(false));
    }
  }, [productId, isEditing]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleImageChange = (index, value) => {
    const newImagePaths = [...formData.imagePaths];
    newImagePaths[index] = value;
    setFormData((prev) => ({ ...prev, imagePaths: newImagePaths }));
  };

  const addImageField = () => {
    setFormData((prev) => ({ ...prev, imagePaths: [...prev.imagePaths, ''] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Filtra caminhos de imagem vazios
    const finalProductData = {
      ...formData,
      imagePaths: formData.imagePaths.filter((path) => path && path.trim() !== ''),
    };

    try {
      if (isEditing) {
        await updateProduct(productId, finalProductData);
      } else {
        await createProduct(finalProductData);
      }
      navigate('/meus-produtos');
    } catch (err) {
      setError('Erro ao salvar o produto. Verifique os campos.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading && isEditing) return <div>Carregando formulário...</div>;

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
      <h1>{isEditing ? 'Editar Produto' : 'Adicionar Novo Produto'}</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Nome do Produto:</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div>
          <label>Descrição:</label>
          <textarea name="description" value={formData.description} onChange={handleChange} required />
        </div>
        <div>
          <label>Preço (R$):</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            step="0.01"
            min="0.01"
            required
          />
        </div>
        <div>
          <label>Estoque:</label>
          <input type="number" name="stock" value={formData.stock} onChange={handleChange} min="0" required />
        </div>
        <div>
          <label>Material:</label>
          <input type="text" name="material" value={formData.material} onChange={handleChange} required />
        </div>
        <div>
          <label>
            <input type="checkbox" name="status" checked={formData.status} onChange={handleChange} />
            Produto Ativo
          </label>
        </div>

        <div>
          <label>URLs das Imagens:</label>
          {formData.imagePaths.map((path, index) => (
            <input
              key={index}
              type="text"
              value={path}
              onChange={(e) => handleImageChange(index, e.target.value)}
              placeholder="http://exemplo.com/imagem.png"
              style={{ display: 'block', marginBottom: '5px' }}
            />
          ))}
          <button type="button" onClick={addImageField}>
            + Adicionar URL
          </button>
        </div>

        {error && <p style={{ color: 'red' }}>{error}</p>}

        <div style={{ marginTop: '20px' }}>
          <button type="submit" disabled={loading} style={{ padding: '10px' }}>
            {loading ? 'Salvando...' : 'Salvar Produto'}
          </button>
          <Link to="/meus-produtos" style={{ marginLeft: '10px' }}>
            Cancelar
          </Link>
        </div>
      </form>
    </div>
  );
}

export default ProductFormPage;
