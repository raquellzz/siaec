import defaultImage from '../../assets/product-placeholder.png';
import Card from '../Card';
import './styles.css';

export default function ProductCard({ imagePath = null, name, price }) {
  return (
    <Card image={imagePath || defaultImage}>
      <p className="product-name">{name}</p>
      <p className="product-value">R$ {price}</p>
    </Card>
  );
}
