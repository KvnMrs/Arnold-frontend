import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import motifh from '../assets/images/motif-04.png';
import motifb from '../assets/images/motif-05.png';
import logo from '../assets/images/logo.png';
import { Link } from 'react-router-dom';
/**
 * import context authentification
 */
import { AuthContext } from '../contexts/authContext';
import { FadeInTwo } from '../services/Animate';

const SignIn = () => {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  const [msg, setMsg] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const regex =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?([^\w\s]|[_])).{8,}$/;

  /**
   * fonction permettant de se connecter à l'application en passant par un context
   * d'authentification pour créer un cookie (le cookie est crée en back)
   */
  const createUser = () => {
    authContext
      .createUser(email, confirmPassword)
      .then((res) => navigate(res))
      .catch((err) => console.log(err));
  };
  const handleKeypress = (e) => {
    //it triggers by pressing the enter key
    if (e.charCode === 13) {
      createUser();
    }
  };

  /**
   * Permet de vérifier que le mot de passe est bien entré deux fois et
   * contient bien au moins 8 charactères, une majuscule,
   * une minuscule, un chiffre et un charactère spécial.
   */
  const checkPassword = () => {
    if (password != confirmPassword) {
      setMsg("Les mots de passe sont différents l'un de autre");
    } else if (regex.test(password) === false) {
      setMsg(
        'Le mot doit passe doit contenir minimum 8 charactères, une majuscule, une minuscule, un chiffre et un charactère spécial'
      );
    } else {
      createUser();
    }
  };

  return (
    <FadeInTwo>
      <div className=" w-screen h-screen m-0px p-0 flex flex-col justify-between items-center bg-darkblue overflow-hidden	">
        <div className=" w-screen lg:w-sreen flex flex-row-reverse">
          <img
            className=" w-screen  z-10 absolute lg:w-4/12"
            src={motifh}
            alt="Bonjour"
          />
        </div>
        <div className=" w-screen h-screen m-0px p-0 flex flex-col justify-center items-center pt-20">
          <img
            className=" max-w-screen-sm	w-4/12 lg:w-2/12 "
            src={logo}
            alt="Bonjour"
          />
          <h1 className="font-bold text-3xl text-white ">Inscris-toi</h1>
          <form className="bg-white w-4/5 lg:w-2/5">
            <div className="mb-2 ">
              <label
                className="block text-white text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className="shadow appearance-none border rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="Email"
                name="email"
                type="text"
                placeholder="Email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
            <div className="mb-2">
              <label
                className="block text-white text-sm font-bold mb-2"
                htmlFor="password"
              >
                Mot de Passe
              </label>
              <input
                className="shadow appearance-none border rounded-full w-full py-2 px-3 text-gray-700 mb-2 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                minLength="8"
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
                Mot de Passe
              </label>
              <input
                className="shadow appearance-none border rounded-full w-full py-2 px-3 text-gray-700 mb-2 leading-tight focus:outline-none focus:shadow-outline"
                id="passwordValid"
                type="password"
                placeholder="******************"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                onKeyPress={handleKeypress}
              />
            </div>
            <div className="flex items-center justify-center">
              <div className="flex items-center justify-center">
                <div className="text-red-500 text-center text-sm font-bold-mb-2">
                  {msg}
                </div>
                <button
                  className=" font-bold bg-orangedark hover:bg-orangedark text-white  py-2 px-4 rounded-full mt-3"
                  type="button"
                  onClick={() => checkPassword()}
                >
                  Inscription
                </button>
              </div>
            </div>
          </form>
          <Link to="/Login">
            <button className="text-white underline	italic">Connexion</button>
          </Link>
        </div>
        <div className=" w-screen lg:w-sreen flex flex-row">
          <img className="w-screen lg:w-4/12" src={motifb} alt="Bonjour" />
        </div>
      </div>
    </FadeInTwo>
  );
};

export default SignIn;
