import React, { useContext, useState } from 'react';

import { Link, useNavigate } from 'react-router-dom';

import motifh from '../assets/images/motif-04.png';
import motifb from '../assets/images/motif-05.png';
import logo from '../assets/images/logo.png';

import { AuthContext } from '../contexts/authContext';
import { FadeInTwo } from '../services/Animate';

const Register = () => {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');
  const getAuth = () => {
    authContext
      .loginUser(email, password)
      .then((res) => {
        if (res === 'Identifiants erronés') {
          setMsg(res);
        } else if (res.tutorialdone) {
          const provCookie = `user_token=${res.token};expires=${new Date(
            Date.now() + 1000 * 60 * 60 * 4
          )}`;
          document.cookie = provCookie;
          navigate('/Map');
        } else {
          const provCookie = `user_token=${res.token};expires=${new Date(
            Date.now() + 1000 * 60 * 60 * 4
          )}`;
          document.cookie = provCookie;
          navigate('/Tutorial/1');
        }
      })
      .catch((err) => err);
  };
  const handleKeypress = (e) => {
    if (e.charCode === 13) {
      getAuth();
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
        <div className=" w-screen h-screen m-0px p-0 flex flex-col justify-center items-center pt-28">
          <img
            className=" max-w-screen-sm	w-4/12 lg:w-2/12 "
            src={logo}
            alt="Bonjour"
          />
          <h1 className="font-bold text-3xl text-white ">On se connait ?</h1>
          <form className="bg-white w-4/5 lg:w-2/5">
            <div className="mb-3 ">
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
            <div className="mb-3">
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
                placeholder="******************"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                onKeyPress={handleKeypress}
              />
            </div>
            <div className="text-red-500 text-center text-sm font-bold-mb-2">
              {msg}
            </div>
            <div className="flex items-center justify-center">
              <button
                className=" font-bold bg-orangedark hover:bg-orangedark text-white  py-2 px-4 rounded-full mt-3"
                type="button"
                onClick={() => getAuth()}
              >
                Connexion
              </button>
            </div>
          </form>
          <Link to="/SignIn">
            <button className="text-white underline	italic">Inscription</button>
          </Link>
        </div>
        <div className=" w-screen lg:w-sreen flex flex-row">
          <img className="w-screen lg:w-4/12" src={motifb} alt="Bonjour" />
        </div>
      </div>
    </FadeInTwo>
  );
};

export default Register;
