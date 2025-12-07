import defaultImage from '../../assets/artisan.png';
import Card from '../Card';
import './styles.css';

export default function ArtisanCard({ imagePath = null, name, description }) {
  return (
    <Card image={imagePath || defaultImage}>
      <p className="artisan-name">{name}</p>
      {description && <p className="artisan-description">{description}</p>}
    </Card>
  );
}
