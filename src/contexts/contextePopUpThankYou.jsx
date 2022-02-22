import PropTypes from 'prop-types';
import React, { createContext, useState } from 'react';
const PopUpThankUContext = createContext();

export const PopUpThkContextProvider = ({ children }) => {
  const [thank, setThank] = useState(false);

  return (
    <PopUpThankUContext.Provider
      value={{
        thank,
        setThank,
      }}
    >
      {children}
    </PopUpThankUContext.Provider>
  );
};

PopUpThkContextProvider.propTypes = {
  children: PropTypes.any,
};

export default PopUpThankUContext;
