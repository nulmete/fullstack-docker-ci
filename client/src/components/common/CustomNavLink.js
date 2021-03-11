import React from 'react';
import { NavLink as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
  link: {
    color: theme.palette.primary.main,
    fontWeight: 700,
    fontSize: '1.2rem',
    padding: theme.spacing(1),
    borderRadius: theme.spacing(2),
    '&:hover': {
      color: '#222831',
    },
  },
  active: {
    backgroundColor: '#e8e8e8',
  },
}));

const CustomNavLink = ({ to, children, ...props }) => {
  const classes = useStyles();
  return (
    <Link
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
      className={classes.link}
      style={{ textDecoration: 'none' }}
      component={RouterLink}
      activeClassName={classes.active}
      to={to}
    >
      {children}
    </Link>
  );
};

CustomNavLink.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default CustomNavLink;
