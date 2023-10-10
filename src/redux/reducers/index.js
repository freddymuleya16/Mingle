import { combineReducers } from 'redux';
import userReducer from './userReducer';
//import matchReducer from './matchReducer';
import toastReducer from './toastReducer';
import modelSlice from './modelSlice';

const rootReducer = combineReducers({
  user: userReducer,
  model:modelSlice,
  toast: toastReducer,
});

export default rootReducer;
