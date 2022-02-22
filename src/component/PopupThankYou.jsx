import React, { useContext } from 'react';
import '../style/PopUpThankYou.css';
import thanks from '../assets/images/Notif.png';
import PopUpThankUContext from '../contexts/contextePopUpThankYou';

const PopupThankYou = () => {
  const { thank } = useContext(PopUpThankUContext);

  return (
    <img
      src={thanks}
      alt=""
      className={
        thank ? 'max-w-screen-sm w-11/12 absolute animation' : 'hidden'
      }
    />
  );
};

export default PopupThankYou;
