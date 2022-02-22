/* eslint-disable react/prop-types */
import React, { useContext } from 'react';
import Alert from '../assets/images/AlertList.png';
import { locationContext } from '../contexts/locationContext';

const PictoAlertList = ({ list, setList }) => {
  const { reports } = useContext(locationContext);
  return (
    <div>
      <div>
        <div className="puce-notif">
          {reports ? reports.length.toString() : null}
        </div>
        <img
          src={Alert}
          className="w-8 justify-end m-2"
          onClick={() => setList(!list)}
        />
      </div>
    </div>
  );
};

export default PictoAlertList;
