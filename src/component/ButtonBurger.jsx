import React, { useContext } from 'react';
import '../style/style-bg.css';
import { slide as Menu } from 'react-burger-menu';
import { Link } from 'react-router-dom';
import { AuthContext } from '../contexts/authContext';

const ButtonBurger = () => {
  const authContext = useContext(AuthContext);
  const logOut = () => {
    return (document.cookie = `user_token=${
      authContext.token
    };expires=${new Date(Date.now() - 1000 * 60 * 60 * 4)}`);
  };

  return (
    <div className="z-50">
      <Menu>
        <Link to="/Profile" id="home" className="menu-item">
          Profil
        </Link>
        <Link to="/About" id="about" className="menu-item">
          À propos
        </Link>
        <Link to="/Tutorial/1" id="contact" className="menu-item">
          Tutoriel
        </Link>
        <Link to="/" className="menu-item--small">
          <button type="button" onClick={() => logOut()}>
            Déconnexion
          </button>
        </Link>
      </Menu>
    </div>
  );
};

export default ButtonBurger;
