import PropTypes from 'prop-types';
import { useContext } from 'react';
import { useMapEvents } from 'react-leaflet';
import PopUpAlertContext from '../contexts/popUpAlertContext';

const AddMarkers = ({ setSignal, signal, setSignalPosition }) => {
  const { setRed } = useContext(PopUpAlertContext);
  /* Ajout de la position du click sur la Map pour la céation du signalements */
  useMapEvents({
    click: (e) => {
      setSignal(!signal);
      setSignalPosition(e.latlng);
      setRed(false);
    },
  });
  return null;
};

AddMarkers.propTypes = {
  setSignal: PropTypes.func,
  setSignalPosition: PropTypes.func,
  signal: PropTypes.any,
};
export default AddMarkers;
