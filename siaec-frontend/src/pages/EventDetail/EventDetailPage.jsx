import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../../components/Header/Header.jsx';
import Carregando from '../../components/Carregando/index.jsx';
import { getEventById, toggleFavoriteEvent } from '../../services/eventService.js';
import { formatDate } from '../../utils/formatDate.js';
import './EventDetailPage.css';
import EventPlaceholder from '../../assets/event.png';
import { useAuth } from '../../hooks/useAuth';

const EventDetailPage = () => {
    const { eventId } = useParams();
    const navigate = useNavigate();
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { user } = useAuth();
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        const fetchEvent = async () => {
            if (!eventId) {
                setError('ID do evento não fornecido na URL.');
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                const data = await getEventById(eventId); 
                if (data.favorite) {
                    setIsFavorite(true);
                } else {
                    setIsFavorite(false);
                }
                setEvent(data);
                setError(null);
            } catch (err) {
                console.error("Erro ao buscar detalhes do evento:", err);
                setError('Não foi possível carregar os detalhes do evento.');
            } finally {
                setLoading(false);
            }
        };

        fetchEvent();
    }, [eventId]);

    const handleToggleFavorite = async () => {
        if (!user) {
            alert("Você precisa estar logado para favoritar eventos!");
            navigate('/login');
            return;
        }
        try {
            await toggleFavoriteEvent(eventId);
            setIsFavorite(!isFavorite); 
        } catch (err) {
            console.error("Erro ao favoritar:", err);
            alert("Não foi possível favoritar o evento.");
        }
    };

    if (loading) {
        return <Carregando />;
    }

    if (error) {
        return (
            <div className="event-detail-page">
                <Header />
                <div className="error-message">{error}</div>
            </div>
        );
    }

    if (!event) {
        return (
            <div className="event-detail-page">
                <Header />
                <div className="error-message">Evento não encontrado.</div>
            </div>
        );
    }

    const eventName = event.name || 'Evento sem Nome';
    const eventLocation = event.location || 'Local Não Informado';
    const eventDescription = event.description || 'Nenhuma descrição fornecida.';
    
    const startDate = event.dateStart ? formatDate(event.dateStart) : 'Data de Início Não Informada';
    const endDate = event.dateEnd ? formatDate(event.dateEnd) : 'Data de Fim Não Informada';
    
    const plannerName = event.eventPlanner?.user?.name || 'Cerimonialista Desconhecido';

    let status = event.status;
    if (!status) {
        const now = new Date();
        const end = new Date(event.dateEnd);
        const start = new Date(event.dateStart);
        status = 'Ativo';
        if (end < now) status = 'Concluído';
        if (start > now) status = 'Próximo'; 
        
    }

    const statusClass = status
    .toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "") 
    .replace(/ /g, '-');

    return (
        <div className="event-detail-page">
            <Header />
            <div className="event-details-container">
                <div className="event-header">
                    <img
                        src={event.imagePath || EventPlaceholder}
                        alt={`Imagem de ${eventName}`}
                        className="event-image"
                    />
                    <div className="event-info">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <h1 style={{ margin: 0, flex: 1 }}>{eventName}</h1>
                            
                            {user && user.role !== 'EVENT_PLANNER' && (
                                <button 
                                    onClick={handleToggleFavorite}
                                    style={{
                                        background: 'none',
                                        border: 'none',
                                        cursor: 'pointer',
                                        color: isFavorite ? '#d32f2f' : '#ccc', 
                                        transition: 'transform 0.2s',
                                        marginLeft: '15px'
                                    }}
                                    title={isFavorite ? "Remover dos favoritos" : "Salvar evento"}
                                    onMouseEnter={(e) => e.target.style.transform = 'scale(1.1)'}
                                    onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                                >
                                    <svg width="32" height="32" viewBox="0 0 24 24" fill={isFavorite ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                                    </svg>
                                </button>
                            )}
                        </div>
                        <div className={`event-status-badge status-${statusClass}`}>
                            {status}
                        </div>
                        <p className="event-dates">
                            <strong>De: </strong>{startDate}  <strong>Até: </strong>{endDate}
                        </p>
                        <p className="event-location">
                            <strong>Local: </strong>{eventLocation}
                        </p>
                        <p className="event-planner">
                            <strong>Organizador: </strong>{plannerName}
                        </p>
                    </div>
                </div>

                <div className="event-body">
                    <h2 className="section-title">Sobre o Evento</h2>
                    <p className="event-description-text">{eventDescription}</p>
                </div>
            </div>
        </div>
    );
};

export default EventDetailPage;