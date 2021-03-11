import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { setAccessToken } from './accessToken';

const refreshToken = () => {
  console.log('refreshing token');
  return (
    axios
      .post('/refresh_token', null, {
        withCredentials: true,
      })
      .then((res) => {
        console.log('refreshing token SUCCESS');
        setAccessToken(res.data.accessToken);
        // when access token expires, request a refresh token again
        const { exp } = jwtDecode(res.data.accessToken);
        const refreshIn = new Date(exp * 1000) - Date.now();
        setTimeout(() => {
          refreshToken();
        }, refreshIn);
      })
      // eslint-disable-next-line no-unused-vars
      .catch((err) => {
        console.log('refreshing token ERROR');
        setAccessToken(null);
      })
  );
};

export default refreshToken;
