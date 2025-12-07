import defaultImage from '../../assets/artisan.png';
import './styles.css';

export default function ArtisanCard({ imagePath = null, name, description }) {
  return (
    <div className="artisan-card">
      <img src={imagePath || defaultImage} alt="Foto de perfil do artesão" className="artisan-image" />
      <div>
        <p className="artisan-name">{name}</p>
        {description && <p className="artisan-description">{description}</p>}
      </div>
    </div>
  );
}
