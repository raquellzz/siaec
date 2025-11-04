import React from 'react';
import './Header.css';
import logo from '../assets/logo.png'
import { FaUserCircle, FaShoppingCart } from 'react-icons/fa';

function Header() {
  return (
    <header className="header">
      <div className="header-center">
        <img src={logo} alt="logo" className='logo' />
      </div>
      <div className="header-right">
        <button className="header-button cart-button">
          <FaShoppingCart />
        </button>
        <button className="header-button profile-button">
          <FaUserCircle />
        </button>
      </div>
    </header>
  );
}

export default Header;