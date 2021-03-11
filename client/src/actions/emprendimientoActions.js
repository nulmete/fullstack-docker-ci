import axios from 'axios';
import {
  FETCH_EMPRENDIMIENTOS,
  FILTER_EMPRENDIMIENTOS_BY_CATEGORY,
  ADD_EMPRENDIMIENTO,
  EDIT_EMPRENDIMIENTO,
  DELETE_EMPRENDIMIENTO,
} from './types';

export const fetchEmprendimientosByCategoryAndUser = () => (dispatch) => {
  axios.get('/mis-emprendimientos').then((res) =>
    dispatch({
      type: FETCH_EMPRENDIMIENTOS,
      payload: res.data.emprendimientosByCategoryAndUser,
    })
  );
};

export const filterEmprendimientosByCategory = (categoryId) => (dispatch) => {
  dispatch({
    type: FILTER_EMPRENDIMIENTOS_BY_CATEGORY,
    payload: categoryId,
  });
};

export const addEmprendimiento = (emprendimiento) => (dispatch) => {
  axios.post('/emprendimiento', emprendimiento).then((res) => {
    dispatch({
      type: ADD_EMPRENDIMIENTO,
      payload: res.data.emprendimiento,
    });
  });
};

export const editEmprendimiento = (emprendimiento) => (dispatch) => {
  axios
    .put(`/emprendimiento/${emprendimiento.id}`, emprendimiento)
    .then((res) => {
      console.log(res);
      dispatch({
        type: EDIT_EMPRENDIMIENTO,
        payload: res.data.emprendimiento,
      });
    });
};

export const deleteEmprendimiento = (id) => (dispatch) => {
  axios.delete(`/emprendimiento/${id}`).then(() => {
    dispatch({
      type: DELETE_EMPRENDIMIENTO,
      payload: id,
    });
  });
};
