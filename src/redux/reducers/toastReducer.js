import { SHOW_TOAST, HIDE_TOAST } from '../actions/toastActions';

const initialState = {
  message: null,
  isVisible: false,
};

const toastReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_TOAST:
      return { ...state, message: action.payload, isVisible: true };
    case HIDE_TOAST:
      return { ...state, message: null, isVisible: false };
    default:
      return state;
  }
};

export default toastReducer;
