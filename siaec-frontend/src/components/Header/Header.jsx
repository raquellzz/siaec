import './Header.css';
import logo from '../../assets/logo.png';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { FaUserCircle, FaShoppingCart } from 'react-icons/fa';

function Header() {
  const { isAuthenticated, logout } = useAuth();
  return (
    <header className="header">
      <div className="header-center">
        <Link to="/">
          <img src={logo} alt="logo" className="logo" />
        </Link>
      </div>
      <div className="header-right">
        <Link to="/cart" className="header-button cart-button">
          <FaShoppingCart />
        </Link>
        {isAuthenticated ? (
          <>
            {/* <Link to="/profile" className="navbar-icon">
                            <FaUserCircle />
                        </Link> */}
            {/* <button onClick={logout} className="navbar-logout">
                            Sair
                        </button> */}
          </>
        ) : (
          <Link to="/login" className="header-button profile-button">
            <FaUserCircle />
          </Link>
        )}
      </div>
    </header>
  );
}

export default Header;
