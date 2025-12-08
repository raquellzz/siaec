import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../../components/Header/Header.jsx';
import ProductCard from '../../components/ProductCard/index.jsx';
import Carregando from '../../components/Carregando/index.jsx';
import { getArtisanById } from '../../services/artisanService';
import { getProductsByArtisanId } from '../../services/productService'; 
import './ArtisanDetailPage.css';
import ArtisanPlaceholder from '../../assets/artisan.png'; 

const ArtisanDetailPage = () => {
    const { artisanId } = useParams();
    const [artisan, setArtisan] = useState(null);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchArtisanData = async () => {
            if (!artisanId) {
                setError("ID do artesão não fornecido na URL.");
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                setError(null);
                
                console.log("DEBUG: ID do Artesão recebido na página:", artisanId);

                const artisanData = await getArtisanById(artisanId);
                setArtisan(artisanData);
                
                console.log("DEBUG: Detalhes do Artesão obtidos:", artisanData); 

                const productData = await getProductsByArtisanId(artisanId, 0, 9); 
                setProducts(productData.content || []);

            } catch (err) {
                console.error("ERRO COMPLETO NA PÁGINA:", err); 
                
                const status = err.response?.status;
                
                if (status === 404) {
                    setError(`Artesão não encontrado. Verifique se o ID (${artisanId}) existe no banco de dados.`);
                } else if (status === 403) {
                    setError("Acesso Proibido. A rota de artesãos ou produtos pode estar bloqueada no SecurityConfig.");
                } else {
                    setError(`Falha de conexão com a API. Status: ${status || 'Desconhecido'}.`);
                }
            } finally {
                setLoading(false);
            }
        };

        fetchArtisanData();
    }, [artisanId]);

    if (loading) {
        return <Carregando />;
    }

    if (error) {
        return (
            <div className="artisan-detail-page">
                <Header />
                <div className="error-message">{error}</div>
            </div>
        );
    }

    if (!artisan || !artisan.user) {
        return <div className="artisan-detail-page"><Header /><div className="error-message">Artesão não encontrado.</div></div>;
    }

    const artisanName = artisan.user.name || 'Artesão Desconhecido';
    const artisanDescription = artisan.description || 'Nenhuma descrição fornecida.';

    return (
        <div className="artisan-detail-page">
            <Header />
            <div className="artisan-details-container">
                <div className="artisan-header">
                    <img
                        src={artisan.user?.profileImageUrl || ArtisanPlaceholder}
                        alt={`Perfil de ${artisanName}`}
                        className="artisan-profile-image"
                    />
                    <div className="artisan-info">
                        <h1>{artisanName}</h1>
                        <p className="artisan-description">{artisanDescription}</p>
                        <div className="artisan-contact">
                            <p><strong>Email:</strong> {artisan.user?.email || 'N/A'}</p>
                            <p><strong>Telefone:</strong> {artisan.user?.phone || 'N/A'}</p>
                        </div>
                    </div>
                </div>

                <h2 className="catalog-title">Catálogo de Produtos ({products.length})</h2>
                {products.length > 0 ? (
                    <div className="product-list-grid">
                        {products.map((product) => (
                            <ProductCard key={product.productId} product={product} /> 
                        ))}
                    </div>
                ) : (
                    <p className="no-products-message">Este artesão ainda não tem produtos ativos.</p>
                )}
            </div>
        </div>
    );
};

export default ArtisanDetailPage;