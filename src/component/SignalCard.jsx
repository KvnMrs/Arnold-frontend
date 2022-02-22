import PropTypes from 'prop-types';
import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react';
import '../style/signalcard.css';
import LevelCard from './LevelCard';
import { FadeIn } from '../services/Animate';
//import context
import { AuthContext } from '../contexts/authContext';

const SignalCard = ({
  setSignal,
  signal,
  data,
  setData,
  setAddReport,
  signalPosition,
  setSignalPosition,
}) => {
  const [level, setLevel] = useState(false);
  const [categories, setCategories] = useState([]);
  const { token } = useContext(AuthContext);

  /*TODO A commenter */
  const handleLevel = (datas = null) => {
    setLevel(!level);
    setSignal(!level);
    setData(datas);
  };
  /*Récupération des informations des catégories sur la BDD*/
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/reports/categories`, {
        headers: { user_token: token },
      })
      .then((res) => setCategories(res.data))
      .catch((errorA) => errorA);
  }, []);

  return (
    <div className="container-allcard">
      <p
        className="w-full flex flex-row  justify-end text-2xl text-white pr-6 pt-14 text-bold "
        onClick={() => setSignal(!signal)}
      >
        ✕
      </p>

      <h1 className="text-white p-0 m-0 font-bold w-4/6 text-3xl text-center">
        {!level ? 'Que souhaitez-vous signaler ?' : 'À quel niveaux ?'}
      </h1>
      <div className="allcard">
        {!level &&
          categories &&
          categories.map((categorie) => (
            <FadeIn key={categorie.id}>
              <button
                key={categorie.id}
                type="button"
                value={categorie}
                onClick={() => handleLevel(categorie)}
              >
                <div className="container-signalcard">
                  <img src={categorie.src} alt={categorie.alt} />
                  <div className="container-name">
                    <h2>{categorie.types}</h2>
                  </div>
                </div>
              </button>
            </FadeIn>
          ))}
        {level && (
          <LevelCard
            data={data}
            handleLevel={handleLevel}
            setAddReport={setAddReport}
            signalPosition={signalPosition}
            setSignalPosition={setSignalPosition}
          />
        )}
      </div>
    </div>
  );
};

SignalCard.propTypes = {
  data: PropTypes.any,
  setAddReport: PropTypes.any,
  setData: PropTypes.func,
  setSignal: PropTypes.func,
  setSignalPosition: PropTypes.any,
  signal: PropTypes.any,
  signalPosition: PropTypes.any,
};
export default SignalCard;
