import PropTypes from 'prop-types';
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  return document.cookie
    .split(';')
    .some((item) => item.trim().startsWith('user_')) ? (
    children
  ) : (
    <Navigate to="/Login" />
  );
};

ProtectedRoute.propTypes = {
  children: PropTypes.any,
};

export default ProtectedRoute;
