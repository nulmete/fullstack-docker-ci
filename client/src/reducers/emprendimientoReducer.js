import {
  FETCH_EMPRENDIMIENTOS,
  FILTER_EMPRENDIMIENTOS_BY_CATEGORY,
  ADD_EMPRENDIMIENTO,
  DELETE_EMPRENDIMIENTO,
  EDIT_EMPRENDIMIENTO,
} from '../actions/types';

const initialState = {
  items: [], // all emprendimientos,
  selectedCategoryId: 1,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_EMPRENDIMIENTOS:
      return {
        ...state,
        items: action.payload,
      };
    case FILTER_EMPRENDIMIENTOS_BY_CATEGORY:
      return {
        ...state,
        selectedCategoryId: action.payload,
      };
    case ADD_EMPRENDIMIENTO:
      return {
        ...state,
        items: [...state.items, action.payload],
      };
    case EDIT_EMPRENDIMIENTO:
      return state.items.map((item) => {
        if (item.id !== action.payload.id) {
          return item;
        }

        return {
          ...item,
          ...action.payload,
        };
      });
    case DELETE_EMPRENDIMIENTO:
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
      };
    default:
      return state;
  }
};
