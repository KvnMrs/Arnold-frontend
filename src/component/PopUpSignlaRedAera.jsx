import PropTypes from 'prop-types';
import axios from 'axios';
import React, { useState, useEffect, useContext, useRef } from 'react';
import '../style/popSignalred.css';
// import context
import PopUpAlertContext from '../contexts/popUpAlertContext';
import { AuthContext } from '../contexts/authContext';
import { locationContext } from '../contexts/locationContext';

const PopUpSignlaRedAera = ({
  userPosition,
  areaColor,
  redZone,
  closeAlert,
}) => {
  const { red, setRed } = useContext(PopUpAlertContext);
  const [local, setLocal] = useState(local);
  const { uuid, token } = useContext(AuthContext);
  const { reports } = useContext(locationContext);
  /* Fonction pour stocker une valeur précédente */
  const usePrevious = (value) => {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
  };
  /* Création de la variable prevClor avec la fct use Prévious */
  const prevColor = usePrevious(areaColor);

  /*TODO A commenter */
  useEffect(() => {
    reports
      ? reports
          .filter((el) => el.uuid !== uuid)
          .map((report) =>
            userPosition.distanceTo([
              parseFloat(report.lat),
              parseFloat(report.lng),
            ]) < redZone
              ? setLocal(report)
              : null
          )
      : null;

    /*Affichage de la Popup Uniquement si la couleur précédente est différente de Rouge pour éviter de reafficher la popup a chaque rerender */
    if (prevColor !== '#AF3737' && areaColor === '#AF3737') {
      setRed(true);
    } else {
      null;
    }
  }, [userPosition, local]);

  /* Fct pour  reactualiser le time du reports  dans la database */
  const handleUpdatereport = (id) => {
    axios
      .put(`${process.env.REACT_APP_BACKEND_URL}/reports/update/${id}`, {
        headers: { user_token: token },
      })
      .catch((err) => err);
    setRed(false);
    closeAlert();
  };

  /* Fct desactivation d'un report, 2 utilisateurs neccesaires pour rendre un incident inactif */
  const handleDesactiveReportByClick = (id) => {
    axios
      .put(`${process.env.REACT_APP_BACKEND_URL}/reports/clicked/${id}`, {
        headers: { user_token: token },
      })
      .catch((err) => err);
    setRed(false);
    closeAlert();
  };
  /* Calcul temps depuis le signalements */
  const today = new Date();
  const addTime = (local = null) => {
    let time = new Date(local.time);
    const diffTime = Math.floor((today - time) / (1000 * 60));

    if (diffTime === 0) {
      return 'quelques secondes';
    } else {
      return diffTime + ' min';
    }
  };

  return local ? (
    <div>
      <div className={red ? 'global-container-popup-r' : 'hidden'}>
        <div className="container-popup-r">
          <div className="container-top-r">
            <img src={local ? local.src : null} />
          </div>
          <div className="container-bottom-r">
            <h1>{local ? local.alt : null}</h1>
            <p>Détecté près de vous !</p>
            <p>Il y a {addTime(local)}</p>
            <div className="container-btn-r">
              <button
                className="btn-conf-r text-xs"
                value={local ? local.id : null}
                onClick={(e) => handleUpdatereport(e.target.value)}
              >
                En&nbsp;cours
              </button>
              <button
                className=" btn-term-r"
                value={local ? local.id : null}
                onClick={(e) => handleDesactiveReportByClick(e.target.value)}
              >
                Terminé
                <span className="px-2 py-1 ml-2 rounded-full text-xs font-bold lg:ml-5">
                  {local ? local.clicked : null}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : null;
};

PopUpSignlaRedAera.propTypes = {
  areaColor: PropTypes.string,
  closeAlert: PropTypes.func,
  redZone: PropTypes.any,
  userPosition: PropTypes.shape({
    distanceTo: PropTypes.func,
  }),
};

export default PopUpSignlaRedAera;
