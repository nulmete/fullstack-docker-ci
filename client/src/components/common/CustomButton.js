import Button from '@material-ui/core/Button';
import React from 'react';
import PropTypes from 'prop-types';

const CustomButton = ({ children, style, ...props }) => {
  console.log('rerendered, children: ', children);
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <Button variant="contained" {...props} style={{ ...style }}>
      {children}
    </Button>
  );
};

CustomButton.defaultProps = {
  style: {},
};

CustomButton.propTypes = {
  children: PropTypes.node.isRequired,
  style: PropTypes.objectOf(PropTypes.string),
};

function areEqual(prevProps, nextProps) {
  return prevProps.value === nextProps.value;
}

export default React.memo(CustomButton, areEqual);
