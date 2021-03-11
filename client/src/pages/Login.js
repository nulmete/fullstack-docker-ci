import React, { useContext } from 'react';
import axios from 'axios';
import { Formik } from 'formik';
import * as Yup from 'yup';
import jwtDecode from 'jwt-decode';
import PropTypes from 'prop-types';
import { setAccessToken } from '../utils/accessToken';
import { UserContext } from '../components/UserContext';
import refreshToken from '../utils/refreshToken';
import CustomButton from '../components/common/CustomButton';
import CustomInput from '../components/common/CustomInput';
import CustomDivider from '../components/common/CustomDivider';
import { AuthFormContainer, AuthForm } from '../components/common/AuthForm';

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email('E-mail inválido.')
    .required('E-mail es un campo requerido.'),
  password: Yup.string()
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{5,}$/,
      'Contraseña inválida.'
    )
    .required('Contraseña es un campo requerido.'),
});

const Login = ({ history }) => {
  const { setUser } = useContext(UserContext);

  return (
    <AuthFormContainer>
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={LoginSchema}
        onSubmit={async (values, { setSubmitting }) => {
          setSubmitting(true);
          const response = await axios.post('/login', values, {
            withCredentials: true,
          });
          if (response && response.data && response.status === 200) {
            const { id, name, email } = response.data.user;
            const { accessToken } = response.data;
            setUser({ id, name, email });
            setAccessToken(accessToken);
            // when access token expires, request a refresh token again
            const { exp } = jwtDecode(accessToken);
            const refreshIn = new Date(exp * 1000) - Date.now();
            setTimeout(() => {
              refreshToken();
            }, refreshIn);
            setSubmitting(false);
            history.push('/');
          }
        }}
      >
        {({ isSubmitting }) => (
          <AuthForm>
            <CustomInput name="email" placeholder="E-mail" type="input" />
            <CustomInput
              name="password"
              placeholder="Contraseña"
              type="password"
            />
            <CustomButton
              type="submit"
              variant="contained"
              color="primary"
              disabled={isSubmitting}
              disableElevation
              style={{ marginTop: '1rem' }}
              fullWidth
            >
              Login
            </CustomButton>
          </AuthForm>
        )}
      </Formik>
      <CustomDivider />
      <CustomButton
        variant="contained"
        color="secondary"
        disableElevation
        fullWidth
        style={{ marginTop: '1rem' }}
        onClick={() => history.push('/signup')}
      >
        Signup
      </CustomButton>
    </AuthFormContainer>
  );
};

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Login;
