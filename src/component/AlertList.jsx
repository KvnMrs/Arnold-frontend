/* eslint-disable react/prop-types */
import React, { useContext } from 'react';
import '../style/alertlist.css';
import ItemList from './ItemList';
import Alert from '../assets/images/AlertList.png';
import { locationContext } from '../contexts/locationContext';

// eslint-disable-next-line react/prop-types
const AlertList = ({ list, setList, location_latLng }) => {
  const { reports } = useContext(locationContext);
  return (
    <div
      className={list ? 'container-alertlist' : 'hidden'}
      onClick={() => setList(!list)}
    >
      <div className="w-screen h-3/6 mt-44 rounded-lg bg-darkblue container-item">
        <div className="fixed bg-darkblue w-full h-auto mb-5">
          <p
            className="w-/12 h-auto flex flex-row  justify-end pb-1 pt-2 mr-4 text-2xl text-white bg-darkblue "
            onClick={() => setList(!list)}
          >
            ✕
          </p>
          <div className="w-full h-auto flex flex-row justify-center item-centerbg-darkblue">
            <img src={Alert} className="w-8  m-4" />
          </div>
          <h1 className="text-white text-3xl w-full flex flex-row justify-center item-center pb-2 font-bold	">
            Autour de vous
          </h1>
        </div>
        <div className=" pt-48  h-2/4	w-full">
          {reports
            ? reports.map((report) => (
                <ItemList
                  key={report.id}
                  report={report}
                  location_latLng={location_latLng}
                />
              ))
            : null}
        </div>
      </div>
    </div>
  );
};
export default AlertList;
