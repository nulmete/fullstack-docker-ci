import { combineReducers } from 'redux';
import emprendimientoReducer from './emprendimientoReducer';
import categoryReducer from './categoryReducer';

export default combineReducers({
  emprendimientos: emprendimientoReducer,
  categories: categoryReducer,
});
