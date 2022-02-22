import React, { useContext, useState } from 'react';
import L from 'leaflet';

/* Import des Composants */
import { Map, NavBar, SignalCard, PopupThankYou } from '../component/index.js';
import AlertList from '../component/AlertList.jsx';
import { FadeInTwo } from '../services/Animate';
import PushNotification from '../component/PushNotification';
import { locationContext } from '../contexts/locationContext.jsx';

const Mapbg = () => {
  const [signal, setSignal] = useState(false);
  const [signalPosition, setSignalPosition] = useState(false);
  const [data, setData] = useState(null);
  const [addReport, setAddReport] = useState({});
  const [list, setList] = useState(false);
  const { userLocation, reports } = useContext(locationContext);

  return (
    <FadeInTwo>
      <div>
        <PopupThankYou />
        {signal ? (
          <SignalCard
            signal={signal}
            setSignal={setSignal}
            signalPosition={signalPosition}
            setSignalPosition={setSignalPosition}
            data={data}
            setData={setData}
            addReport={addReport}
            setAddReport={setAddReport}
          />
        ) : null}

        <PushNotification />
        <NavBar />
        <AlertList
          list={list}
          setList={setList}
          reports={reports}
          location_latLng={L.latLng(userLocation.coordinates)}
        />

        <Map
          className="invert"
          setSignal={setSignal}
          signal={signal}
          data={data}
          addReport={addReport}
          list={list}
          setList={setList}
        />
      </div>
    </FadeInTwo>
  );
};

export default Mapbg;
