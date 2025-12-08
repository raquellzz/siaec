import { Link } from 'react-router-dom';
import ProductPlaceholder from '../../assets/product-placeholder.png';
import './styles.css'

const ProductCard = ({ product }) => {
    if (!product) return null;
    
    const productId = product.productId || product.id; 

    const imageUrl = (product.imagePaths && product.imagePaths.length > 0 && product.imagePaths[0]) 
        ? product.imagePaths[0] 
        : ProductPlaceholder;
    
    const imageStyle = { width: '100%', height: '150px', objectFit: 'cover', borderRadius: '4px' };

    return (
        <Link to={`/products/${productId}`} className="product-card-link">
            <div className="product-card" style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '5px' }}>
                <img src={imageUrl} style={imageStyle} /> 
                <h3 className="product-name">{product.name}</h3>
                <p className="product-value">R$ {product.price?.toFixed(2) || '0.00'}</p>
            </div>
        </Link>
    );
};

export default ProductCard;