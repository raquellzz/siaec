import React from 'react';
import { useNavigate } from 'react-router-dom';

const BackButton = ({ to }) => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (to) {
      navigate(to);
    } else {
      navigate(-1); // O valor -1 faz o navegador voltar uma página no histórico
    }
  };

  return (
    <button
      onClick={handleBack}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        background: 'transparent',
        border: 'none',
        cursor: 'pointer',
        color: '#555', // Cinza escuro
        fontSize: '1rem',
        fontWeight: '500',
        padding: '8px 0',
        marginBottom: '16px', // Espaço abaixo do botão
        transition: 'color 0.2s'
      }}
      onMouseEnter={(e) => e.target.style.color = '#B95318'} // Efeito hover laranja
      onMouseLeave={(e) => e.target.style.color = '#555'}
    >
      {/* Ícone de Seta para Esquerda (SVG) */}
      <svg 
        width="20" 
        height="20" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
        style={{ pointerEvents: 'none' }} // Evita problemas com o hover no SVG
      >
        <path d="M19 12H5" />
        <path d="M12 19l-7-7 7-7" />
      </svg>
      Voltar
    </button>
  );
};

export default BackButton;