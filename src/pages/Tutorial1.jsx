import React, { useContext } from 'react';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router';
import motifh from '../assets/images/motif-04.png';
import motifb from '../assets/images/motif-05.png';
import consulter from '../assets/images/consulter.png';
import alerter from '../assets/images/alert.png';
import logo from '../assets/images/logo.png';
import { useSwipeable } from 'react-swipeable';
import { FadeInTwo } from '../services/Animate';
import axios from 'axios';
import { AuthContext } from '../contexts/authContext';

const Tutorial1 = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { uuid } = useContext(AuthContext);
  /* Fonction Pour swiper de tutorial */
  const handlers = useSwipeable({
    onSwipedLeft: () => navigate('/Tutorial/2'),
    onSwipedRight: () => navigate('/Tutorial/1'),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  const handletutorialdone = () => {
    axios
      .put(`${process.env.REACT_APP_BACKEND_URL}/users/tutorialdone/${uuid}`)
      .catch((err) => err);
    navigate('/Map');
  };

  return (
    <FadeInTwo>
      <div
        {...handlers}
        className=" w-screen h-screen m-0px p-0 flex flex-col justify-between items-center bg-darkblue"
      >
        <div className=" w-screen h-screen m-0px p-0 flex flex-col justify-between items-center  z-10 h-screen absolute">
          <div className=" w-screen lg:w-sreen flex flex-row-reverse">
            <img className=" w-screen lg:w-4/12  " src={motifh} alt="Bonjour" />
          </div>
          <div className=" w-screen lg:w-sreen flex flex-row">
            <img className=" w-screen lg:w-4/12" src={motifb} alt="Bonjour" />
          </div>
        </div>
        <div className=" w-screen h-screen m-0px p-0 flex flex-col justify-center items-center ">
          <img
            className={
              id == 1
                ? 'max-w-screen-sm	w-3/12 lg:w-1/12 pb-3'
                : 'max-w-screen-sm	w-3/12 lg:w-1/12 pb-3'
            }
            src={logo}
            alt="Bonjour"
          />
          <h1 className="font-bold text-3xl text-white lg:text4xl pb-8">
            {id == 1 ? 'Bienvenue !' : null}
          </h1>
          <h2
            className={
              id == 1
                ? 'font-light text-2xl text-white w-3/4	text-center'
                : 'font-light text-2xl text-white  w-3/4	text-center lg:pb-7'
            }
          >
            {id == 1
              ? 'Arnold te permet de'
              : 'Ainsi que d’alerter les autres utilisateurs des dangers !'}
          </h2>
          <h2 className="font-bold text-2xl text-white ">
            {id == 1 ? 'consulter les dangers' : null}
          </h2>
          <h2 className="font-light text-2xl text-white pb-5 w-3/4	text-center lg:pb-7">
            {id == 1 ? 'autour de toi !' : null}
          </h2>
          <img
            className=" max-w-screen-sm	w-6/12 lg:w-3/12 "
            src={id == 1 ? consulter : alerter}
            alt="Bonjour"
          />
          {id != 1 ? (
            <div className="w-screen flex flex-row justify-center">
              <button
                onClick={handletutorialdone}
                className="bg-orangedark hover:bg-orangedark text-white  py-2 px-4 rounded-full mt-3 absolute z-50"
              >
                Commencer
              </button>
            </div>
          ) : null}
        </div>
        <div className=" w-screen  m-0px p-0 flex flex-row justify-center text-2xl mt-2 z-20 mb-2">
          <button
            className="text-blue-900 font-light mr-4"
            onClick={() => navigate('/Tutorial/1')}
          >
            ●
          </button>
          <button
            className={
              id == 1 ? 'text-gray-500	font-light' : 'text-blue-900	font-light'
            }
            onClick={() => navigate('/Tutorial/2')}
          >
            ●
          </button>
        </div>
      </div>
    </FadeInTwo>
  );
};

export default Tutorial1;
