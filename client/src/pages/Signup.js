import React from 'react';
import axios from 'axios';
import { Formik } from 'formik';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import CustomButton from '../components/common/CustomButton';
import CustomInput from '../components/common/CustomInput';
import { AuthFormContainer, AuthForm } from '../components/common/AuthForm';

const SignupSchema = Yup.object().shape({
  name: Yup.string().required('Nombre es un campo requerido.'),
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

const Signup = ({ history }) => (
  <AuthFormContainer>
    <Formik
      initialValues={{ name: '', email: '', password: '' }}
      validationSchema={SignupSchema}
      onSubmit={async (values, { setSubmitting }) => {
        setSubmitting(true);
        await axios.put('/signup', values);
        setSubmitting(false);
        history.push('/');
      }}
    >
      {({ isSubmitting }) => (
        <AuthForm>
          <CustomInput name="name" placeholder="Nombre" type="input" />
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
            fullWidth
            style={{ marginTop: '1rem' }}
          >
            Registrarse
          </CustomButton>
        </AuthForm>
      )}
    </Formik>
  </AuthFormContainer>
);

Signup.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Signup;
