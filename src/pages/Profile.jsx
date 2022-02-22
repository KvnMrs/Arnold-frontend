/** import librairies */
import React, { useContext, useState } from 'react';
import Slider from 'rc-slider';
import { Link } from 'react-router-dom';
/**import components */
import NavBar from '../component/NavBar';
import PopUpChangepassword from '../component/PopUpChangepassword';
/**import services */
import { FadeInTwo } from '../services/Animate';
/**import context */
import { AuthContext } from '../contexts/authContext';
import { SafeAreaContext } from '../contexts/safeAreaContext';
/**import assets */
import motifb from '../assets/images/motif-05.png';
/**import css */
import 'rc-slider/assets/index.css';

const Profile = () => {
  const { safeArea, setSafeArea, handleChangeSafeArea } =
    useContext(SafeAreaContext);
  const { email } = useContext(AuthContext);
  const [modal, setModal] = useState(false);

  return (
    <FadeInTwo>
      {modal ? <PopUpChangepassword modal={modal} setModal={setModal} /> : ''}
      <div className="bg-darkblue w-screen h-screen ">
        <NavBar />
        <div className="flex flex-col justify-center items-center pt-28">
          <h1 className="w-full h-full flex flex-col justify-center items-center	text-white font-bold text-3xl pb-16">
            Mon profil
          </h1>
          <div className="w-full h-28  border-t border-white flex flex-row justify-between gap-20	p-3 items-center lg:w-10/12">
            <h2 className="text-white font-bold text-1xl italic">
              Mon email :
            </h2>
            <div className="w-8/12 flex flex-row justify-start sm: justfy-end">
              <h2 className="text-white font-light italic">{email}</h2>
            </div>
          </div>
          <div className="w-full h-28 border-b  border-t border-white flex flex-row justify-between p-3 items-center lg:w-10/12">
            <h2 className="text-white font-bold text-1xl italic">
              Mon mot de passe :
            </h2>
            <div className="w-8/12 flex flex-row justify-between ml-3">
              <h2 className="text-white font-light italic text-center">
                ************
              </h2>
              <h2 className="text-white font-bold">
                <button onClick={() => setModal(true)}>✎</button>
              </h2>
            </div>
          </div>

          <div className="w-full h-28  flex flex-row justify-between p-3 items-center lg:w-10/12">
            <div className="flex flex-col text-center">
              <h2 className="text-white font-bold text-1xl italic text-left	">
                Ma zone de sécurité :
              </h2>
            </div>

            <div className="flex w-8/12 flex flex-row items-center">
              <Slider
                min={50}
                max={300}
                defaultValue={safeArea}
                step={50}
                onChange={(e) => setSafeArea(parseInt(e))}
              />
              <p className="text-white pl-4">{safeArea ? safeArea : 0}m</p>
            </div>
          </div>
          <Link to="/Map">
            <button
              type="button"
              onClick={handleChangeSafeArea}
              className="bg-orangedark hover:bg-overorange text-white  py-2 px-4 rounded-full mt-3 "
            >
              Appliquer
            </button>
          </Link>

          <div className=" w-screen flex flex-col justify-end lg:w-sreen flex flex-row">
            <img
              className=" w-screen bg-darkblue lg:w-5/12"
              src={motifb}
              alt="Bonjour"
            />
          </div>
        </div>
      </div>
    </FadeInTwo>
  );
};

export default Profile;
