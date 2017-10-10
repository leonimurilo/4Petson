 import { combineReducers } from 'redux';
import IsLoggedIn from './IsLoggedIn'

const rootReducer = combineReducers({
  isLoggedIn: IsLoggedIn
});

 export default rootReducer;
