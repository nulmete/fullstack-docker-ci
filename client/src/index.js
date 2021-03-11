import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import axios from 'axios';
import { ThemeProvider } from '@material-ui/core/styles';
import reportWebVitals from './reportWebVitals';
import App from './App';
import { getAccessToken } from './utils/accessToken';
import Theme from './styles/theme';

axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;

axios.interceptors.request.use(
  (config) => {
    const accessToken = getAccessToken();
    // console.log('accessToken: ', accessToken);
    // eslint-disable-next-line no-param-reassign
    // config.withCredentials = true;
    if (accessToken) {
      // console.log('access token is set!');
      // eslint-disable-next-line no-param-reassign
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={Theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
