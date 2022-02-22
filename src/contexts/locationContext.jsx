import axios from 'axios';
import PropTypes from 'prop-types';
import React, { createContext, useContext, useEffect, useState } from 'react';
import L from 'leaflet';
import useGeoLocation from '../component/useGeoLocation';
import { AuthContext } from './authContext';

export const locationContext = createContext();

const LocationProvider = ({ children }) => {
  const userLocation = useGeoLocation();
  const [mapZoom, setMapZoom] = useState(14);
  const [reports, setReports] = useState(null);
  const { token } = useContext(AuthContext);
  /* GET LES POINTS EN FONCTION DU BOUNDS UTILISATEUR */
  /**
   *Récupération des signalement sur la base données toutes les 3 secondes
   *Possibilité d'améliorer la fluidité grace au websocket
   * @return {Reports}
   */
  console.log(userLocation);
  const getreport = () => {
    console.log('startgetreport');
    if (userLocation.loaded && !userLocation.error) {
      const location_latLng = L.latLng(userLocation.coordinates);
      const location_bounds = L.latLngBounds([location_latLng]);
      const y_bottom = location_bounds._northEast.lat;
      const x_left = location_bounds._northEast.lng;
      const y_top = location_bounds._southWest.lat;
      const x_right = location_bounds._southWest.lng;
      const geolocBounds = { y_bottom, y_top, x_left, x_right };
      console.log('startaxios');
      axios
        .get(`${process.env.REACT_APP_BACKEND_URL}/reports`, {
          headers: { user_token: token },
          params: geolocBounds,
        })
        .then((res) => setReports(res.data))
        .catch((errorA) => errorA);
    }
  };
  useEffect(() => {
    console.log('startuseeffect');
    /* DETERMINE LA ZONE GET REPORT */
    const clear = setInterval(getreport, 3000);

    return () => {
      console.log('clearinterval');
      clearInterval(clear);
    };
  }, [userLocation.coordinates]);

  return (
    <locationContext.Provider
      value={{
        userLocation,
        reports,
        mapZoom,
        setMapZoom,
      }}
    >
      {children}
    </locationContext.Provider>
  );
};

LocationProvider.propTypes = {
  children: PropTypes.any,
};

export default LocationProvider;
