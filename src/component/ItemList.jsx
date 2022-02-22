/* eslint-disable react/prop-types */
import React from 'react';
import '../style/alertlist.css';

const ItemList = ({ report, location_latLng }) => {
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
    <div
      className={
        report.niveau == 'Important'
          ? 'w-auto h-auto flex flex-row justify-between item-center text-white mb-2 mt-2 ml-5 mr-5 pt-2 border-t border-darkblue pl-5 rounded level-red'
          : report.niveau == 'Modéré'
          ? 'w-auto h-auto flex flex-row justify-between item-center text-white mb-2 mt-2 ml-5 mr-5 pt-2 border-t border-darkblue pl-5 rounded level-orange'
          : report.niveau == 'Léger'
          ? 'w-auto h-auto flex flex-row justify-between item-center text-white mb-2 mt-2 ml-5 mr-5 pt-2 border-t border-darkblue pl-5 rounded  level-green'
          : 'w-auto h-auto flex flex-row justify-between item-center text-white mb-2 mt-2 ml-5 mr-5 pt-2 border-t border-darkblue pl-5 rounded  '
      }
    >
      <h1 className="font-bold">{report.alt}</h1>
      <div className="flex flex-col w-2/6">
        <p>
          À{' '}
          {Math.round(
            location_latLng
              ? location_latLng.distanceTo([
                  parseFloat(report.lat),
                  parseFloat(report.lng),
                ])
              : null
          )}
          m
        </p>
        <p>Il y a {addTime(report)}</p>
      </div>
    </div>
  );
};

export default ItemList;
