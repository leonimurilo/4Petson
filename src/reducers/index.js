 import {
   combineReducers
 } from 'redux';
 import IsLoggedIn from './IsLoggedIn';

 import {reducer as formReducer} from "redux-form";

 const rootReducer = combineReducers({
   form: formReducer,
   isLoggedIn: IsLoggedIn
 });

 export default rootReducer;
