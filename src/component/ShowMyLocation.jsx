import { useContext, useEffect } from 'react';
import { useMap, useMapEvents } from 'react-leaflet';
import { locationContext } from '../contexts/locationContext';

const ShowMyLocation = ({ setGeoloc, geoloc }) => {
  const { userLocation } = useContext(locationContext);

  /*Création de l'objet map nécessaire à la navigation sur la map */
  const map = useMap();

  /* Desactivation du suivi de la position utilisateur en fonction du mouvement de la carte. */
  useMapEvents({
    movestart: () => {
      setGeoloc(false);
    },
  });

  /* Zoom et déplacement de la carte sur la position utilisateur +gestion de l'erreur  */
  useEffect(() => {
    if (userLocation.loaded && !userLocation.error) {
      map.flyTo(
        [userLocation.coordinates.lat, userLocation.coordinates.lng],
        18,
        {
          animate: true,
        }
      );
      setGeoloc(geoloc);
    } else if (userLocation.error) {
      alert(
        'ERROR(' + userLocation.error.code + '): ' + userLocation.error.message
      );
      setGeoloc(false);
    }
  }, [userLocation.coordinates]);
  return null;
};
export default ShowMyLocation;
