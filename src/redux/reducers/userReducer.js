import { SET_USER_DATA, UPDATE_PROFILE_PICTURE, SET_LOADING } from '../actions/userActions';

const initialState = {
  userData: null,
  isLoading: false, 
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_DATA:
      return { ...state, userData: action.payload, isLoading: false };
    case UPDATE_PROFILE_PICTURE:
      return { ...state, userData: { ...state.userData, profilePicture: action.payload } };
    case SET_LOADING:
      return { ...state, isLoading: action.payload };
    default:
      return state;
  }
};

export default userReducer;
