import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AuthProvider } from './contexts/authContext';
import { SafeAreaProvider } from './contexts/safeAreaContext';
import { PopUpThkContextProvider } from './contexts/contextePopUpThankYou';
import LocationProvider from './contexts/locationContext';
import { PopUpAlertContextProvider } from './contexts/popUpAlertContext';

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <SafeAreaProvider>
        <LocationProvider>
          <PopUpAlertContextProvider>
            <PopUpThkContextProvider>
              <App />
            </PopUpThkContextProvider>
          </PopUpAlertContextProvider>
        </LocationProvider>
      </SafeAreaProvider>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
