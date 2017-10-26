 import {
   combineReducers
 } from 'redux';
 import IsLoggedIn from './IsLoggedIn';
 import AuthToken from './AuthToken';
 import Races from './Races'

 import {reducer as formReducer} from "redux-form";

 const rootReducer = combineReducers({
   form: formReducer,
   isLoggedIn: IsLoggedIn,
   authToken: AuthToken,
   races:Races
 });

 export default rootReducer;
