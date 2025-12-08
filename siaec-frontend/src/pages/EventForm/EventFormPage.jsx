import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { createEvent, getEventById, updateEvent } from '../../services/eventService';
import ButtonUI from '../../components/ButtonUI';
import Input from '../../components/Input';
import Carregando from '../../components/Carregando';
import { useSnackbar } from '../../hooks/useSnackbar';

function EventFormPage() {
  // Nota: No App.js definimos a rota como /meus-eventos/editar/:id
  const { EventId } = useParams(); 
  const navigate = useNavigate();
  const snackbar = useSnackbar();
  const isEditing = Boolean(EventId);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    dateStart: '',
    dateEnd: '',
    location: '',
    imagePath: '',
  });
  
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isEditing) {
      setLoading(true);
      getEventById(EventId)
        .then((data) => {
          setFormData({
            name: data.name,
            description: data.description,
            // Garante que as datas venham no formato compatível com input datetime-local
            // Se o backend retornar ISO completo, talvez precise de ajustes, mas string simples funciona
            dateStart: data.dateStart, 
            dateEnd: data.dateEnd,
            location: data.location,
            imagePath: data.imagePath || '',
          });
        })
        .catch((err) => {
          snackbar.openErrorMessage(
            'Não foi possível carregar o evento para edição. ' + (err.response?.data?.message || '')
          );
        })
        .finally(() => setLoading(false));
    }
  }, [EventId, isEditing, snackbar]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    setLoading(true);

    // Validação simples de datas
    if (new Date(formData.dateEnd) < new Date(formData.dateStart)) {
        snackbar.openErrorMessage('A data de término não pode ser anterior à data de início.');
        setLoading(false);
        return;
    }

    try {
      if (isEditing) {
        await updateEvent(EventId, formData);
        snackbar.openSuccessMessage('Evento atualizado com sucesso!');
      } else {
        await createEvent(formData);
        snackbar.openSuccessMessage('Evento criado com sucesso!');
      }
      navigate('/meus-eventos');
    } catch (err) {
      snackbar.openErrorMessage('Erro ao salvar o evento. Verifique os campos.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading && isEditing) return <Carregando />;

  return (
    <div style={{ maxWidth: '600px', margin: '64px auto 32px', padding: '0 20px' }}>
      <h2 style={{ marginBottom: '24px' }}>
        {isEditing ? 'Editar Evento' : 'Cadastrar Novo Evento'}
      </h2>
      
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'stretch', gap: 24 }}>
        
        <Input 
            label="Nome do Evento" 
            type="text" 
            name="name" 
            value={formData.name} 
            onChange={handleChange} 
            required 
        />

        <Input
          label="Descrição"
          type="text"
          multiline
          rows={4}
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        />

        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <div style={{ flex: 1, minWidth: '200px' }}>
                <Input
                    label="Data e Hora de Início"
                    type="datetime-local"
                    name="dateStart"
                    value={formData.dateStart}
                    onChange={handleChange}
                    required
                    InputLabelProps={{ shrink: true }} // Necessário para inputs de data no Material UI/similares
                />
            </div>
            <div style={{ flex: 1, minWidth: '200px' }}>
                <Input
                    label="Data e Hora de Término"
                    type="datetime-local"
                    name="dateEnd"
                    value={formData.dateEnd}
                    onChange={handleChange}
                    required
                    InputLabelProps={{ shrink: true }}
                />
            </div>
        </div>

        <Input
          label="Localização"
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          required
          placeholder="Ex: Centro de Convenções, Natal-RN"
        />

        <Input
          label="URL da Imagem (Banner)"
          type="text"
          name="imagePath"
          value={formData.imagePath}
          onChange={handleChange}
          placeholder="http://exemplo.com/banner-evento.jpg"
        />

        {/* Pré-visualização da imagem (opcional, mas útil visualmente) */}
        {formData.imagePath && (
            <div style={{ marginTop: '-10px', marginBottom: '10px' }}>
                <img 
                    src={formData.imagePath} 
                    alt="Pré-visualização" 
                    style={{ width: '100%', maxHeight: '200px', objectFit: 'cover', borderRadius: '8px' }} 
                    onError={(e) => e.target.style.display = 'none'}
                />
            </div>
        )}

        <div style={{ marginTop: '20px', display: 'flex', gap: 16, justifyContent: 'end' }}>
          <Link to="/meus-eventos">
            <ButtonUI 
                text="Cancelar" 
                loading={loading} 
                onClick={() => {}} 
                color="primary" 
                variant="text" 
            />
          </Link>
          <ButtonUI 
            text="Salvar Evento" 
            loading={loading} 
            onClick={handleSubmit} 
          />
        </div>
      </div>
    </div>
  );
}

export default EventFormPage;