import PropTypes from 'prop-types';
import React from 'react';
import '../style/popupsignalarea.css';
import zone from '../assets/images/zone.png';

const PopUpSignalArea = ({ showPopUp }) => {
  return (
    <div className={showPopUp ? 'container-all-popup' : 'hidden'}>
      <div className="global-container-popup-a">
        <div className="container-popup-a">
          <div className="container-info">
            <div className="container-top-a">
              <img src={zone} />
            </div>
            <div className="container-bottom-a">
              <h1>Attention zone de danger !</h1>
            </div>
          </div>
          <div className="container-chargement">
            <div className="chargement-popup" />
          </div>
        </div>
      </div>
    </div>
  );
};

PopUpSignalArea.propTypes = {
  showPopUp: PropTypes.any,
};

export default PopUpSignalArea;
