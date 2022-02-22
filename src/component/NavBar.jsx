/* eslint-disable react/prop-types */
import React from 'react';
import ButtonBurger from './ButtonBurger';
import '../style/navbar.css';
import Logo from './logo';

// eslint-disable-next-line react/prop-types
const NavBar = () => {
  return (
    <div className="container-navbar">
      <ButtonBurger />
      <Logo />
    </div>
  );
};
export default NavBar;
