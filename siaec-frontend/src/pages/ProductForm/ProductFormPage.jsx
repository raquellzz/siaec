import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { createProduct, getProductById, updateProduct } from '../../services/productService';
import ButtonUI from '../../components/ButtonUI';
import Input from '../../components/Input';
import { Checkbox } from '@mui/material';

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
      [name]: type === 'checkbox' ? checked : type === 'number' ? Number(value) : value,
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
    <div style={{ maxWidth: '600px', margin: '64px auto 32px' }}>
      <h2>{isEditing ? 'Editar Produto' : 'Adicionar Novo Produto'}</h2>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'start', gap: 24 }}>
        <Input label="Nome do Produto" type="text" name="name" value={formData.name} onChange={handleChange} required />

        <Input
          label="Descrição"
          type="text"
          multiline
          rows={3}
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        />

        <Input
          label="Preço (R$)"
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          inputProps={{
            step: '0.01',
            min: '0.01',
          }}
          required
        />

        <Input
          label="Estoque"
          type="number"
          name="stock"
          value={formData.stock}
          onChange={handleChange}
          inputProps={{
            min: '0',
          }}
          required
        />

        <Input
          label="Material"
          type="text"
          name="material"
          value={formData.material}
          onChange={handleChange}
          required
        />

        <div style={{ display: 'flex', gap: 8 }}>
          <Checkbox name="status" checked={formData.status} onChange={handleChange} />
          <p>Produto ativo</p>
        </div>

        <label>URLs das Imagens:</label>
        {formData.imagePaths.map((path, index) => (
          <Input
            key={index}
            label={`Imagem ${index + 1}`}
            type="text"
            name={`image-${index}`}
            value={path}
            onChange={(e) => handleImageChange(index, e.target.value)}
            placeholder="http://exemplo.com/imagem.png"
          />
        ))}
        <ButtonUI text="Adicionar URL" onClick={addImageField} color="secondary" />
        <div style={{ marginTop: '20px', display: 'flex', gap: 16, justifyContent: 'end' }}>
          <Link to="/meus-produtos">
            <ButtonUI text="Cancelar" loading={loading} onClick={() => {}} color="primary" variant="text" />
          </Link>
          <ButtonUI text="Salvar Produto" loading={loading} onClick={handleSubmit} />
        </div>
      </div>
    </div>
  );
}

export default ProductFormPage;
