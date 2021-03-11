/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import Nav from './components/Nav/Nav';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Emprendimientos from './pages/Emprendimientos';
import EmprendimientoForm from './components/EmprendimientoForm/EmprendimientoForm';
import ProtectedRoute from './components/ProtectedRoute';
import UnprotectedRoute from './components/UnprotectedRoute';
import store from './store';

const PublicLayout = ({ children }) => (
  <div
    style={{
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    {children}
  </div>
);

const PrivateLayout = ({ children }) => (
  <>
    <Nav />
    <div>{children}</div>
  </>
);

function Routes() {
  return (
    <Provider store={store}>
      <Switch>
        <Route exact path={['/', '/signup', '/login']}>
          <PublicLayout>
            <UnprotectedRoute path="/" exact component={Home} />
            <UnprotectedRoute path="/signup" component={Signup} />
            <UnprotectedRoute path="/login" component={Login} />
          </PublicLayout>
        </Route>
        <Route
          exact
          path={[
            '/emprendimientos',
            '/mis-emprendimientos',
            '/agregar-emprendimiento',
            '/editar-emprendimiento/:id',
          ]}
        >
          <PrivateLayout>
            <UnprotectedRoute
              path="/emprendimientos"
              component={Emprendimientos}
            />
            <ProtectedRoute
              path="/mis-emprendimientos"
              component={Emprendimientos}
            />
            <ProtectedRoute
              path="/agregar-emprendimiento"
              component={EmprendimientoForm}
            />
            <ProtectedRoute
              path="/editar-emprendimiento/:id"
              component={EmprendimientoForm}
            />
          </PrivateLayout>
        </Route>
      </Switch>
    </Provider>
  );
}

export default withRouter(Routes);
