/* eslint-disable react/jsx-props-no-spreading */
import TextField from '@material-ui/core/TextField';
import { useField } from 'formik';
import React from 'react';
import PropTypes from 'prop-types';

const CustomInput = ({ type, placeholder, ...props }) => {
  const [field, meta] = useField(props);
  const errorText = meta.error && meta.touched ? meta.error : '';
  return (
    <TextField
      {...field}
      type={type}
      placeholder={placeholder}
      helperText={errorText}
      error={!!errorText}
      fullWidth
      margin="normal"
    />
  );
};

CustomInput.propTypes = {
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
};

export default CustomInput;
