/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import React from 'react';
import Box from '@material-ui/core/Box';

export const TabPanel = (props) => {
  const { children, val, index, ...other } = props;

  // categoryId starts at 1, but index starts at 0
  const newIndex = index - 1;

  return (
    <div
      role="tabpanel"
      hidden={val !== newIndex}
      id={`scrollable-auto-tabpanel-${newIndex}`}
      aria-labelledby={`scrollable-auto-tab-${newIndex}`}
      {...other}
    >
      {val === newIndex && <Box p={4}>{children}</Box>}
    </div>
  );
};

export const a11yProps = (index) => ({
  id: `scrollable-auto-tab-${index}`,
  'aria-controls': `scrollable-auto-tabpanel-${index}`,
});
