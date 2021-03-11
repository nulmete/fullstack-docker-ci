import React from 'react';
import PropTypes from 'prop-types';
import Icon from '@material-ui/core/Icon';
import CategoryIcons from '../../utils/categoryIcons';

const CategoryIcon = ({ slug }) => <Icon>{CategoryIcons[slug] || 'star'}</Icon>;

CategoryIcon.propTypes = {
  slug: PropTypes.string.isRequired,
};

export default CategoryIcon;
