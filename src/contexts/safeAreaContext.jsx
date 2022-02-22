import PropTypes from 'prop-types';
import axios from 'axios';
import React, { useState, createContext, useContext } from 'react';
import { AuthContext } from './authContext';

export const SafeAreaContext = createContext();

export const SafeAreaProvider = ({ children }) => {
  const [safeArea, setSafeArea] = useState(0);
  const userContext = useContext(AuthContext);
  const { token } = useContext(AuthContext);

  const getSafeArea = () => {
    axios
      .get(
        `${process.env.REACT_APP_BACKEND_URL}/users/safearea/${userContext.uuid}`,
        {
          headers: { user_token: token },
        }
      )
      .then((res) => setSafeArea(res.data.safearea))
      .catch((err) => err);
  };
  const handleChangeSafeArea = () => {
    axios
      .put(
        `${process.env.REACT_APP_BACKEND_URL}/users/update/safearea`,
        {
          uuiduser: userContext.uuid,
          safearea: parseInt(safeArea),
        },
        {
          headers: { user_token: token },
        }
      )
      .catch((err) => err);
  };

  return (
    <SafeAreaContext.Provider
      value={{ safeArea, setSafeArea, handleChangeSafeArea, getSafeArea }}
    >
      {children}
    </SafeAreaContext.Provider>
  );
};

SafeAreaProvider.propTypes = {
  children: PropTypes.any,
};
