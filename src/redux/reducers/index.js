import { combineReducers } from 'redux';
import userReducer from './userReducer';
//import matchReducer from './matchReducer';
import toastReducer from './toastReducer';

const rootReducer = combineReducers({
  user: userReducer,
 // match: matchReducer,
  toast: toastReducer,
});

export default rootReducer;
