import PropTypes from 'prop-types';
import React, { useEffect, useState, useContext } from 'react';
import L from 'leaflet';
import { Circle } from 'react-leaflet';
import PushNotification from './PushNotification';
import PopUpSignlaRedAera from './PopUpSignlaRedAera';
import { SafeAreaContext } from '../contexts/safeAreaContext';
import { AuthContext } from '../contexts/authContext';
import { locationContext } from '../contexts/locationContext';

const DetectionReport = ({ closeAlert }) => {
  const [userPosition, setUserPosition] = useState(null);
  const [areaColor, setAreaColor] = useState('#1B61FE');
  const [showPopUp, setShowPopUp] = useState(false);
  const { safeArea } = useContext(SafeAreaContext);
  const { uuid } = useContext(AuthContext);
  const { userLocation, reports } = useContext(locationContext);

  /* Calcul des 3 zones d'alerte */
  const yellowZone = safeArea;
  const orangeZone = safeArea / 2;
  const redZone = safeArea / 3;

  /* Création UserPosition grace à fct leaflet LatLng */
  useEffect(() => {
    setUserPosition(L.latLng(userLocation.coordinates));
  }, [userLocation]);

  useEffect(() => {
    /* si la Geolocalisation est activé && qu'un incident minimum est activé alors: */
    if (userPosition) {
      /* verification de la distance entre le centre de SafeArea et les incidents actifs */
      if (reports) {
        let detectedReports = reports.map((report) =>
          userPosition.distanceTo([
            parseFloat(report.lat),
            parseFloat(report.lng),
          ])
        );

        /* Recupere la distance la plus petite distance, afficher couleur de safeArea en fonction */

        let report = Math.min(...detectedReports);
        if (report < redZone) {
          /* Comparaison des uuid reports & utilisateur, si il es identique, ne pas afficher la <PopUpSignlaRedAera/> */
          if (reports.filter((el) => el.uuid === uuid).length) {
            setAreaColor('#AF3737'), setShowPopUp(false);
          }
          if (reports.filter((el) => el.uuid !== uuid).length) {
            setAreaColor('#AF3737'), setShowPopUp(true);
          }
        }
        if (report < orangeZone && report > redZone) {
          return setAreaColor('#E26B4C'), setShowPopUp(false);
        }
        if (report < yellowZone && report > orangeZone) {
          return setAreaColor('#FDDD6A'), setShowPopUp(false);
        }
        if (report > safeArea) {
          return setAreaColor('#1B61FE'), setShowPopUp(false);
        }
      }
    }
  }, [userPosition, reports]);
  return userPosition ? (
    showPopUp ? (
      <>
        <Circle
          center={userPosition}
          radius={safeArea}
          pathOptions={{ fillColor: areaColor, color: areaColor }}
        />
        <div className={areaColor === '#AF3737' ? 'flex' : 'hidden'}>
          <PopUpSignlaRedAera
            areaColor={areaColor}
            redZone={redZone}
            userPosition={userPosition}
            closeAlert={closeAlert}
          />
        </div>
      </>
    ) : (
      <>
        <Circle
          center={userPosition}
          radius={safeArea}
          pathOptions={{ fillColor: areaColor, color: areaColor }}
        />
        <PushNotification color={areaColor} userPosition={userPosition} />
      </>
    )
  ) : null;
};

DetectionReport.propTypes = {
  closeAlert: PropTypes.any,
};

export default DetectionReport;
