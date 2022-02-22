import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import axios from 'axios';
import PopUpThankUContext from '../contexts/contextePopUpThankYou';
import { FadeIn } from '../services/Animate';
import { AuthContext } from '../contexts/authContext';
import { locationContext } from '../contexts/locationContext';

const niveaux = [
  {
    niveau: 'Léger',
    class: 'container-name-leger',
    color: 'vert',
  },
  {
    niveau: 'Modéré',
    class: 'container-name-modere',
    color: 'orange',
  },
  {
    niveau: 'Important',
    class: 'container-name-important',
    color: 'Rouge',
  },
];

const LevelCard = ({
  data,
  handleLevel,
  setAddReport,
  signalPosition,
  setSignalPosition,
}) => {
  const { thank, setThank } = useContext(PopUpThankUContext);
  const { token } = useContext(AuthContext);
  const { userLocation } = useContext(locationContext);
  const userContext = useContext(AuthContext);
  const changeState = () => {
    setThank(thank);
  };

  const coords = signalPosition ? signalPosition : userLocation.coordinates;

  const handleClose = (level = null) => {
    if (thank != true) {
      setThank(!thank);
      setTimeout(changeState, 5000);
    } else {
      setThank(!thank);
    }
    handleLevel();
    // Création de l'objet signalement complet
    const uuid = userContext.uuid;
    const type_id = data.id;
    const niveau = level.niveau;
    const newReport = {
      niveau,
      ...coords,
      type_id,
      uuid,
    };
    // Requete sur la BDD pour créer le signalement
    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/reports`, {
        ...newReport,
        headers: { user_token: token },
      })
      .catch((err) => err);
    setAddReport(newReport);
    setSignalPosition(false);
  };

  return (
    <FadeIn>
      <div className="allcard">
        {niveaux.map((level) => (
          <div key={level.niveau}>
            <div onClick={() => handleClose(level)}>
              <div className="container-signalcard">
                <img src={data.src} alt={data.type} />
                <div className={level.class}>
                  <h2>{level.niveau}</h2>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </FadeIn>
  );
};

LevelCard.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.any,
    src: PropTypes.any,
    type: PropTypes.any,
  }),
  handleLevel: PropTypes.func,
  setAddReport: PropTypes.func,
  setSignalPosition: PropTypes.func,
  signalPosition: PropTypes.any,
};

export default LevelCard;
