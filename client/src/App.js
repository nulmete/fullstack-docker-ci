import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter } from 'react-router-dom';
import { UserContext } from './components/UserContext';
import Routes from './Routes';
import { getAccessToken } from './utils/accessToken';
import refreshToken from './utils/refreshToken';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const getUser = () =>
    axios
      .post('/authenticated', null, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data === null) {
          setUser(null);
          setLoading(false);
          return;
        }
        const { id, name, email } = res.data;
        setUser({ id, name, email });
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setUser(null);
        setLoading(false);
      });

  useEffect(async () => {
    const accessToken = getAccessToken();
    // quick (BAD) fix to persist login on page refresh
    // (accessToken is empty when page first loads)
    if (!accessToken) await refreshToken();
    getUser();
  }, []);

  return (
    <>
      {!loading && (
        <UserContext.Provider value={{ user, setUser }}>
          <BrowserRouter>
            <Routes />
          </BrowserRouter>
        </UserContext.Provider>
      )}
    </>
  );
}

export default App;
