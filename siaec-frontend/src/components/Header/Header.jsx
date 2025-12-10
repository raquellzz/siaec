import './Header.css';
import logo from '../../assets/logo-header.png';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { FaUserCircle, FaShoppingCart } from 'react-icons/fa';
import { FaArrowRightFromBracket, FaArrowRightToBracket } from 'react-icons/fa6';
import { roleEnum } from '../../enums/RoleEnum';
import BackButton from '../BackButton/BackButton';

function Header() {
  const { isAuthenticated, logout, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="header">
      <div className="header-center">
        <Link to="/">
          <img src={logo} alt="logo" className="logo" />
        </Link>
      </div>
      <div className="header-left">
        {location.pathname !== '/' && (
          <div style={{ marginLeft: '20px', marginTop: '15px' }}>
            <BackButton />
          </div>
        )}
      </div>
      <div className="header-right">
        {isAuthenticated ? (
          <>
            {user.role === roleEnum.client && (
              <Link to="/carrinho" className="header-button cart-button">
                <FaShoppingCart />
              </Link>
            )}
            <Link to="/perfil" className="header-button cart-button">
              <FaUserCircle />
            </Link>
            <button onClick={handleLogout} className="header-button cart-button navbar-logout">
              <FaArrowRightFromBracket />
            </button>
          </>
        ) : (
          <Link to="/login" className="header-button profile-button">
            <FaArrowRightToBracket />
          </Link>
        )}
      </div>
    </header>
  );
}

export default Header;
