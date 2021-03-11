import axios from 'axios';
import { FETCH_CATEGORIES } from './types';

// eslint-disable-next-line import/prefer-default-export
export const fetchCategories = () => (dispatch) => {
  axios.get('/categories').then((res) =>
    dispatch({
      type: FETCH_CATEGORIES,
      payload: res.data.categories,
    })
  );
};
