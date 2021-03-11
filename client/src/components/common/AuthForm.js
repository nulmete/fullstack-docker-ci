import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { Form } from 'formik';

const useStyles = makeStyles((theme) => ({
  authFormContainer: {
    padding: theme.spacing(3, 6),
  },
  authForm: {
    marginBottom: theme.spacing(2),
  },
}));

// eslint-disable-next-line react/prop-types
export const AuthFormContainer = ({ children }) => {
  const classes = useStyles();
  return (
    <Paper variant="outlined" className={classes.authFormContainer}>
      {children}
    </Paper>
  );
};

// eslint-disable-next-line react/prop-types
export const AuthForm = ({ children }) => {
  const classes = useStyles();
  return <Form className={classes.authForm}>{children}</Form>;
};
