/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
/* eslint-disable arrow-body-style */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { UserContext } from './UserContext';

function UnprotectedRoute({ component: Component, ...rest }) {
  const { user } = useContext(UserContext);

  return (
    <Route
      {...rest}
      render={(props) => {
        if (!user) {
          return <Component {...props} />;
        }
        return <Redirect to="/mis-emprendimientos" />;
      }}
    />
  );
}

export default UnprotectedRoute;
