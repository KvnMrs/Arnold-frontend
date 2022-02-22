import { useEffect, useState } from 'react';

const useGeoLocation = () => {
  /* Fonction pour acquérir la position de l'utilsateur + gestion des erreurs */
  const [location, setLocation] = useState({
    loaded: false,
    coordinates: { lat: '', lng: '' },
  });
  let options = {
    enableHighAccuracy: true,
    timeout: 60000,
    maximumAge: 60000,
  };

  const onSuccess = (location) => {
    setLocation({
      loaded: true,
      coordinates: {
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      },
    });
  };

  const onError = (error) => {
    setLocation({
      loaded: true,
      error: {
        code: error.code,
        message: error.message,
      },
    });
  };
  useEffect(() => {
    if (!('geolocation' in navigator)) {
      onError({
        code: 0,
        message: 'Geolocation not supported',
      });
    }
    navigator.geolocation.watchPosition(onSuccess, onError, options);
  }, []);

  return location;
};
export default useGeoLocation;
