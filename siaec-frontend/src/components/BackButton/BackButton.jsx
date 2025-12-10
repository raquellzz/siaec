import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const BackButton = ({ to }) => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (to) {
      navigate(to);
    } else {
      navigate(-1);
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
        color: '#a14a17',
        fontSize: '1.75em',
        fontWeight: '500',
        padding: '8px 0',
        marginBottom: '16px',
        transition: 'color 0.2s',
      }}
      onMouseEnter={(e) => (e.target.style.color = '#B95318')}
      onMouseLeave={(e) => (e.target.style.color = '#555')}
    >
      <FaArrowLeft />
    </button>
  );
};

export default BackButton;
