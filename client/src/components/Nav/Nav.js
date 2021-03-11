import React, { useContext } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { UserContext } from '../UserContext';
import CustomNavLink from '../common/CustomNavLink';

function Nav() {
  const { user } = useContext(UserContext);
  return (
    <div>
      <AppBar
        position="static"
        color="transparent"
        style={{ padding: '0.5rem 0' }}
      >
        <Toolbar>
          {user && (
            <CustomNavLink to="/mis-emprendimientos">
              Mis emprendimientos
            </CustomNavLink>
          )}
          <CustomNavLink to="/emprendimientos">Emprendimientos</CustomNavLink>
          {!user && <CustomNavLink to="/signup">Signup</CustomNavLink>}
          {!user && <CustomNavLink to="/login">Login</CustomNavLink>}
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Nav;
