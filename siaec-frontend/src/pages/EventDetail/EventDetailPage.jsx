import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../../components/Header/Header.jsx';
import Carregando from '../../components/Carregando/index.jsx';
import { getEventById } from '../../services/eventService.js';
import { formatDate } from '../../utils/formatDate.js';
import './EventDetailPage.css';
import EventPlaceholder from '../../assets/event.png';

const EventDetailPage = () => {
    const { eventId } = useParams();
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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
    const status = event.status || 'Ativo';

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
                        <h1>{eventName}</h1>
                        <p className={`event-status status-${status.toLowerCase().replace(/ /g, '-')}`}>
                            <strong>Status: </strong>{status}
                        </p>
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