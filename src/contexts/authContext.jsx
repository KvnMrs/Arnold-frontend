import PropTypes from 'prop-types';
import axios from 'axios';
import React, { useState, createContext } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [email, setEmail] = useState('');
  const [uuid, setUuid] = useState('');
  const [token, setToken] = useState('');
  const [tutorialDone, setTutorialDone] = useState(false);

  /**
   * permet de créer la "session" utilisateur en créant un cookie en back en retrouvant
   * l'utilisateur en base de donnée (BDD)
   * @param (string) mail
   * @param (string) password
   * @returns (string) token
   */
  const loginUser = (mail, password) => {
    return axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/auth/login`, {
        email: mail,
        password,
      })
      .then((res) => {
        setEmail(res.data.email);
        setUuid(res.data.uuidusers);
        setToken(res.data.token);
        setTutorialDone(res.data.tutorialdone);
        return res.data;
      })
      .catch(() => {
        setEmail('');
        setUuid('');
        return 'Identifiants erronés';
      });
  };

  /**
   * permet de créer un nouveau user en BDD
   * @param (string) mail
   * @param (string) password
   * @returns
   */
  const createUser = (mail, password) => {
    return axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/users/signin`, {
        email: mail,
        password,
      })
      .then(() => {
        return '/Login';
      })
      .catch(() => {
        return "Erreur au niveau de l'email ou du mot de passe";
      });
  };

  /**
   * permet de modifier le mot de passe (MDP) utilisateur
   * et recrée la "session" avec le nouveau MDP
   * @param (string) oldPassword
   * @param (string) password
   * @returns
   */
  const updateUser = (oldPassword, password) => {
    return axios
      .put(
        `${process.env.REACT_APP_BACKEND_URL}/users/updatePassword`,
        {
          oldPassword,
          password,
        },
        {
          headers: { user_token: token },
        }
      )
      .then(() => {
        return 'Hello context';
      })
      .catch((err) => {
        console.log(err);
        return 'Impossible de modifier le mot de passe';
      });
  };

  /**
   * mémorisation user en context
   * @param {*} cookie
   */
  const setCookies = (cookie) => {
    const key = cookie[0].split('=');
    setToken(key[1]);
  };

  return (
    <AuthContext.Provider
      value={{
        loginUser,
        createUser,
        updateUser,
        email,
        uuid,
        token,
        tutorialDone,
        setCookies,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.any,
};
