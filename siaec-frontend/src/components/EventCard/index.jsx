import defaultImage from '../../assets/event.png';
import { formatDate } from '../../utils/formatDate';
import './styles.css';

export default function EventCard({ imagePath = null, name, date, local }) {
  const formattedDate = formatDate(date);
  return (
    <div className="event-card">
      <img src={imagePath || defaultImage} alt="Foto de perfil do artesão" className="event-image" />
      <div>
        <p className="event-name ellipsis">{name}</p>
        <p className="event-info ellipsis">Dia: {formattedDate}</p>
        <p className="event-info ellipsis">Local: {local}</p>
      </div>
    </div>
  );
}
