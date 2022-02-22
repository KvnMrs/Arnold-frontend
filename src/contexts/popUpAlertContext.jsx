import PropTypes from 'prop-types';
import React, { createContext, useState } from 'react';
const PopUpAlertContext = createContext();

export const PopUpAlertContextProvider = ({ children }) => {
  const [red, setRed] = useState(true);
  return (
    <PopUpAlertContext.Provider
      value={{
        red,
        setRed,
      }}
    >
      {children}
    </PopUpAlertContext.Provider>
  );
};

PopUpAlertContextProvider.propTypes = {
  children: PropTypes.any,
};

export default PopUpAlertContext;
