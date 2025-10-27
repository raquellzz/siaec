import React, { useState, useEffect } from 'react';
import { getHomeData } from '../services/homeService'; 

function HomePage() {
  const [homeData, setHomeData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getHomeData(); 
        setHomeData(data); 
      } catch (err) {
        setError('Falha ao carregar os dados da página inicial.'); 
        console.error(err);
      } finally {
        setLoading(false); 
      }
    };

    fetchData(); 
  }, []); 
  if (loading) {
    return <div>Carregando...</div>;
  }

  if (error) {
    return <div style={{ color: 'red' }}>{error}</div>;
  }
  return (
    <div>
      <h1>{homeData?.mensagemBoasVindas || 'Bem-vindo ao SIAEC!'}</h1>

      <h2>Artesãos em Destaque</h2>
      {homeData?.artesoesDestaque?.length > 0 ? (
        <ul>
          {homeData.artesoesDestaque.map((artesao, index) => (
            <li key={index}>{artesao}</li>
          ))}
        </ul>
      ) : (
        <p>Nenhum artesão em destaque no momento.</p>
      )}

      <h2>Próximas Feiras</h2>
      {homeData?.proximasFeiras?.length > 0 ? (
        <ul>
          {homeData.proximasFeiras.map((feira, index) => (
            <li key={index}>{feira}</li>
          ))}
        </ul>
      ) : (
        <p>Nenhuma feira cadastrada no momento.</p>
      )}

    </div>
  );
}

export default HomePage;