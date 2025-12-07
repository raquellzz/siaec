import defaultImage from '../../assets/event.png';
import { formatDate } from '../../utils/formatDate';
import Card from '../Card';
import './styles.css';

export default function EventCard({ imagePath = null, name, date, local }) {
  const formattedDate = formatDate(date);
  return (
    <Card image={imagePath || defaultImage}>
      <p className="event-name ellipsis">{name}</p>
      <p className="event-info ellipsis">Dia: {formattedDate}</p>
      <p className="event-info ellipsis">Local: {local}</p>
    </Card>
  );
}
