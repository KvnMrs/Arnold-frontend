/* eslint-disable react/prop-types */
import PropTypes from 'prop-types';

import React, { useState, useEffect, useContext } from 'react';
/* Import CSS */
import '../style/map.css';
import '../style/popUpSignal.css';
import '../../node_modules/@ansur/leaflet-pulse-icon/dist/L.Icon.Pulse.css';
/*Import Leaflet */
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMapEvents,
} from 'react-leaflet';
import L from 'leaflet';
/* Import Composant */
import PictoAlertList from './PictoAlertList';
// import AddMarkers from './AddMarkers';
import ShowMyLocation from './ShowMyLocation';
import DetectionReport from './DetectionReport';
import '../../node_modules/@ansur/leaflet-pulse-icon/dist/L.Icon.Pulse';
/* Import Images */
import alert from '../assets/icons/pictoalert.png';
import Geoloc from '../assets/icons/geoloc.png';
import marker from '../assets/images/marker.svg';
import markerI from '../assets/images/marker-I.svg';
import markerM from '../assets/images/marker-M.svg';
import markerL from '../assets/images/marker-L.svg';
/*Import Context */
import { SafeAreaContext } from '../contexts/safeAreaContext';
import { locationContext } from '../contexts/locationContext';

const Map = ({ setSignal, signal, addReport, list, setList }) => {
  const [geoloc, setGeoloc] = useState(null);
  const [map, setMap] = useState(null);
  const [userPosition, setUserPosition] = useState(null);
  const { getSafeArea } = useContext(SafeAreaContext);
  const { userLocation, setMapZoom, mapZoom, reports } =
    useContext(locationContext);

  /* Création MarkerPulse  sur la position utilisateur */
  const pulsingIcon = L.icon.pulse({
    iconSize: [20, 20],
    color: '#1B61FE',
    fillColor: '#1B61FE',
  });

  /* Fct appelle la geoloc & la safeArea back-end */
  const callGeolocArea = () => {
    setGeoloc(true);
    getSafeArea();
  };

  /* Création de markeur en cours */
  const initIcon = L.icon({
    iconUrl: marker,
    iconSize: [20, 70], // size of the icon
    shadowSize: [50, 64], // size of the shadow
    iconAnchor: [10, 60], // point of the icon which will correspond to marker's location
    shadowAnchor: [4, 62], // the same for the shadow
    popupAnchor: [-3, -76], // point from which the popup should open relative to the iconAnchor
  });

  const redIcon = L.icon({
    iconUrl: markerI,
    iconSize: [20, 70], // size of the icon
    shadowSize: [50, 64], // size of the shadow
    iconAnchor: [10, 60], // point of the icon which will correspond to marker's location
    shadowAnchor: [4, 62], // the same for the shadow
    popupAnchor: [-3, -76], // point from which the popup should open relative to the iconAnchor
  });
  const greenIcon = L.icon({
    iconUrl: markerL,
    iconSize: [20, 70], // size of the icon
    shadowSize: [50, 64], // size of the shadow
    iconAnchor: [10, 60], // point of the icon which will correspond to marker's location
    shadowAnchor: [4, 62], // the same for the shadow
    popupAnchor: [-3, -76], // point from which the popup should open relative to the iconAnchor
  });
  const orangeIcon = L.icon({
    iconUrl: markerM,
    iconSize: [20, 70], // size of the icon
    shadowSize: [50, 64], // size of the shadow
    iconAnchor: [10, 60], // point of the icon which will correspond to marker's location
    shadowAnchor: [4, 62], // the same for the shadow
    popupAnchor: [-3, -76], // point from which the popup should open relative to the iconAnchor
  });

  /* Fct pour fermer popup */
  const hideElement = () => {
    if (!map) return;

    map.closePopup();
  };
  /* Fct pour recuperer le zoom de la map */
  const GetZoom = () => {
    useMapEvents({
      zoomend() {
        const zoomMap = map.getZoom();
        setMapZoom(zoomMap);
      },
    });
    return null;
  };

  const level = ['Important', 'Modéré', 'Léger'];
  /*TODO A Commenter */
  const chooseMarker = (report) => {
    if (report.niveau == level[0]) {
      return redIcon;
    } else if (report.niveau == level[1]) {
      return orangeIcon;
    } else if (report.niveau == level[2]) {
      return greenIcon;
    } else {
      return initIcon;
    }
  };
  /*TODO A Commenter */
  useEffect(() => {
    setUserPosition(L.latLng(userLocation.coordinates));
  }, [userLocation]);
  /*TODO A Commenter */
  const handleClickAlert = () => {
    setSignal(false);
  };
  /*Fct pour récupérer l'heure(min) à laquel le signalement a été effectué */
  const today = new Date();
  const addTime = (report = null) => {
    let time = new Date(report.time);
    const diffTime = Math.floor((today - time) / (1000 * 60));

    if (diffTime === 0) {
      return 'quelques secondes';
    } else {
      return diffTime + ' min';
    }
  };

  return (
    <MapContainer
      style={{ height: '100vh', width: '100%' }}
      center={
        userLocation.loaded && !userLocation.error
          ? userLocation.coordinates
          : { lat: 47.2125578, lng: -1.5495602 }
      }
      zoom={mapZoom}
      zoomControl={false}
      scrollWheelZoom={true}
      tap={false}
      whenCreated={setMap}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        maxNativeZoom={19}
        maxZoom={24}
      />
      {/* <AddMarkers
        setSignal={setSignal}
        signal={signal}
        signalPosition={signalPosition}
        setSignalPosition={setSignalPosition}
      /> */}

      <DetectionReport addReport={addReport} closeAlert={handleClickAlert} />

      {!reports
        ? null
        : reports.map((report) => (
            <Marker
              position={[report.lat, report.lng]}
              key={report.id}
              icon={chooseMarker(report)}
            >
              <Popup closeButton={false}>
                <div>
                  <div className="container-popup">
                    <div className="container-top">
                      <img src={report.src} />
                    </div>
                    <div className="container-bottom">
                      <h1>{report.types}</h1>
                      <p>
                        {Math.round(
                          userPosition
                            ? userPosition.distanceTo([
                                parseFloat(report.lat),
                                parseFloat(report.lng),
                              ])
                            : null
                        )}
                        m
                      </p>
                      <p>Il y a {addTime(report)}</p>

                      <div className="container-btn">
                        <button
                          className="btn-conf"
                          type="button"
                          value={report.id}
                          onClick={() => hideElement()}
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}
      {userLocation.loaded && !userLocation.error && (
        <Marker
          position={[
            userLocation.coordinates.lat,
            userLocation.coordinates.lng,
          ]}
          icon={pulsingIcon}
        ></Marker>
      )}
      {geoloc && <ShowMyLocation geoloc={geoloc} setGeoloc={setGeoloc} />}
      <GetZoom />
      <div className="absolute z-50 w-full h-auto flex flex-row justify-between items-end bottom-nav container-botom-map fixed">
        <div
          className={
            list
              ? 'map-bottom-bg w-screen h-auto flex flex-row justify-between items-end rounded-lg pb-12 pl-6 pr-6 pt-6 drop-shadow '
              : 'w-screen h-auto flex flex-row justify-between items-end rounded-lg pb-12 pl-6 pr-6 pt-6 drop-shadow'
          }
        >
          <button type="button" onClick={() => callGeolocArea()}>
            <img src={Geoloc} width="48" height="48" />
          </button>
          <button type="button" onClick={() => setSignal(!signal)}>
            <img src={alert} width="50" height="50" />
          </button>
          <PictoAlertList list={list} setList={setList} />
        </div>
      </div>
    </MapContainer>
  );
};

Map.propTypes = {
  addReport: PropTypes.any,
  userLocation: PropTypes.shape({
    coordinates: PropTypes.shape({
      lat: PropTypes.any,
      lng: PropTypes.any,
    }),
    error: PropTypes.any,
    loaded: PropTypes.any,
  }),
  setSignal: PropTypes.func,
  setSignalPosition: PropTypes.any,
  signal: PropTypes.any,
  signalPosition: PropTypes.any,
};

export default Map;
