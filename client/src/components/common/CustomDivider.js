import React from 'react';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    alignItems: 'center',
  },
  border: {
    borderBottom: `1px solid ${theme.palette.grey[400]}`,
    width: '100%',
  },
  content: {
    padding: theme.spacing(0.5, 2),
    color: theme.palette.grey[400],
  },
}));

const CustomDivider = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div className={classes.border} />
      <span className={classes.content}>o</span>
      <div className={classes.border} />
    </div>
  );
};

export default CustomDivider;
