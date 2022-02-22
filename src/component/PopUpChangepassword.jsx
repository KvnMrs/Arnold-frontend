/** import librairies */
import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router';
import { AuthContext } from '../contexts/authContext';
/**import CSS */
import '../style/changepassword.css';

const PopUpChangepassword = ({ modal, setModal }) => {
  const authContext = useContext(AuthContext);
  const [msg, setMsg] = useState('');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const regex =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?([^\w\s]|[_])).{8,}$/;
  const navigate = useNavigate();

  const updateUser = () => {
    authContext
      .updateUser(password, newPassword)
      .then(() => {
        setMsg('Votre mot de passe a bien été changé');
      })
      .catch(() =>
        setMsg("Votre mot de passe n'a pas pu être changé, erreur server")
      )
      .finally(() => {
        setPassword('');
        setNewPassword('');
        setConfirmPassword('');
        navigate('/Map');
      });
  };

  /**
   * Vérification des données :
   * 1 : on vérifie que le nouveau mot de passe entré est bien le même dans les 2 champs
   * 2 : on vérifie que le nouveau mot de passe répond bien à la regex
   * 3 : si tout est bon, on modifie le mot de passe
   */
  const checkDatas = () => {
    if (newPassword != confirmPassword) {
      setMsg("Les mots de passe sont différents l'un de autre");
    } else if (regex.test(newPassword) === false) {
      setMsg(
        'Le mot doit passe doit contenir minimum 8 charactères, une majuscule, une minuscule, un chiffre et un charactère spécial'
      );
    } else {
      updateUser();
    }
  };

  return (
    <div className={modal ? 'container-password' : 'hidden'}>
      <button type="button" onClick={() => setModal(false)}>
        <p>✕</p>
      </button>
      <div className="container-global-form">
        <div className="container-top-password">
          <h1 className="text-white text-2xl font-bold m-0 p-0">
            Changer mon mot de passe
          </h1>
        </div>
        <div className="container-form">
          <form className="bg-white w-4/5 lg:w-2/5">
            <div className="mb-2 ">
              <label
                className="block text-white text-sm font-bold mb-2"
                htmlFor="password"
              >
                Mot de passe actuel
              </label>
              <input
                className="shadow appearance-none border rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="currentPassword"
                type="password"
                placeholder="******************"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>
            <div className="mb-2">
              <label
                className="block text-white text-sm font-bold mb-2"
                htmlFor="password"
              >
                Nouveau mot de Passe
              </label>
              <input
                className="shadow appearance-none border rounded-full w-full py-2 px-3 text-gray-700 mb-2 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                placeholder="******************"
                value={newPassword}
                onChange={(event) => setNewPassword(event.target.value)}
              />
            </div>
            <div className="mb-2">
              <label
                className="block text-white text-sm font-bold mb-2"
                htmlFor="password"
              >
                Nouveau mot de Passe
              </label>
              <input
                className="shadow appearance-none border rounded-full w-full py-2 px-3 text-gray-700 mb-2 leading-tight focus:outline-none focus:shadow-outline"
                id="passwordValid"
                type="password"
                placeholder="******************"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
              />
            </div>
            <div className="flex flex-col items-center justify-center">
              <div className="text-red-500 text-center text-sm font-bold-mb-2">
                {msg}
              </div>
              <button
                onClick={() => checkDatas()}
                className="font-bold bg-orangedark hover:bg-orangedark text-white  py-2 px-4 rounded-full mt-3"
                type="button"
              >
                Sauvegarder
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

PopUpChangepassword.propTypes = {
  setPassword: PropTypes.any,
  password: PropTypes.string,
  modal: PropTypes.bool,
  setModal: PropTypes.any,
};
export default PopUpChangepassword;
