import React, { useContext, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
/* Import des pages */
import {
  Home,
  Tutorial1,
  Register,
  SignIn,
  About,
  Profile,
  Mapbg,
  Page404,
} from './pages/index.js';

import ProtectedRoute from './component/ProtectedRoute';
import { AnimatePresence } from 'framer-motion/dist/framer-motion';
import { AuthContext } from './contexts/authContext';

function App() {
  const authContext = useContext(AuthContext);
  useEffect(() => {
    const token = document.cookie.split(';');
    if (token) authContext.setCookies(token);
  }, []);

  return (
    <div>
      <AnimatePresence exitBeforeEnter>
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/SignIn" element={<SignIn />} />
            <Route path="/Login" element={<Register />} />

            <Route
              path="/Map"
              element={
                <ProtectedRoute>
                  <Mapbg />
                </ProtectedRoute>
              }
            />

            <Route
              path="/Profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/Tutorial/:id"
              element={
                <ProtectedRoute>
                  <Tutorial1 />
                </ProtectedRoute>
              }
            />
            <Route
              path="/About"
              element={
                <ProtectedRoute>
                  <About />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<Page404 />} />
          </Routes>
        </BrowserRouter>
      </AnimatePresence>
    </div>
  );
}
export default App;
