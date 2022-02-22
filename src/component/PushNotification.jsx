import PropTypes from 'prop-types';
import React, { useEffect, useRef } from 'react';
import '../style/notification.css';
import 'react-toastify/dist/ReactToastify.min.css';
import { ToastContainer, toast } from 'react-toastify';

function PushNotification({ color }) {
  /* Définition Propriétes de la notifications */

  const notify = () => {
    toast.warn('Incident détecté !', {
      position: 'top-center',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  /* Vérification et Validation de la possibilités de faire vibrer l'appareil */
  let canVibrate = 'vibrate' in navigator || 'mozVibrate' in navigator;
  if (canVibrate && !('vibrate' in navigator)) {
    navigator.vibrate = navigator.mozVibrate;
  }

  /* Fonction pour stocker une valeur précédente */
  const usePrevious = (value) => {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
  };
  /* Création de la variable prevClor avec la fct use Prévious */
  const prevColor = usePrevious(color);

  /* Fonction qui retourne une notification en fonction de la PrevColor et de la color */
  useEffect(() => {
    prevColor === '#1B61FE' && color === '#FDDD6A'
      ? (notify(), window.navigator.vibrate([200, 100, 200]))
      : null;
  }, [prevColor, color]);
  return (
    <ToastContainer
      position="top-center"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
  );
}

PushNotification.propTypes = {
  color: PropTypes.string,
};

export default PushNotification;
