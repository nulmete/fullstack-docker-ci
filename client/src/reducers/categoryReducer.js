import { FETCH_CATEGORIES } from '../actions/types';

const initialState = {
  items: [], // all categories
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CATEGORIES:
      return {
        ...state,
        items: action.payload,
      };
    default:
      return state;
  }
};
