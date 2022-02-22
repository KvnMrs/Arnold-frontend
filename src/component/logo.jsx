import React from 'react';
import logo from '../assets/images/logo.png';
import { Link } from 'react-router-dom';
import '../style/logo.css';

const Logo = () => {
  return (
    <div className="container-logo">
      <Link to="/Map">
        <img src={logo} alt="Bonjour" className="logo" />
      </Link>
    </div>
  );
};

export default Logo;
