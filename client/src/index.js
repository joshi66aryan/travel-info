import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import store from './redux/store';
import reportWebVitals from './reportWebVitals';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import { GoogleOAuthProvider } from '@react-oauth/google';

const root = ReactDOM.createRoot(document.getElementById('root'));
// ===> prod

const devEnv = process.env.NODE_ENV !== "production";
const clientId = devEnv ? "139844327573-ao3790opn11e53hpqps9e9fp995up2tb.apps.googleusercontent.com":
                          "139844327573-2rjs2m5hk0cl5mbh4es9rmjg8keijlir.apps.googleusercontent.com"

root.render(
  <React.StrictMode>
    <Provider store = { store }>
      <GoogleOAuthProvider clientId = {clientId}>
         <App /> 
      </GoogleOAuthProvider>   
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
