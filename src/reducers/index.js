 import {
   combineReducers
 } from 'redux';
 import IsLoggedIn from './IsLoggedIn';
 import AuthToken from './AuthToken';
 import Species from './Species'

 import {reducer as formReducer} from "redux-form";

 const rootReducer = combineReducers({
   form: formReducer,
   isLoggedIn: IsLoggedIn,
   authToken: AuthToken,
   species:Species
 });

 export default rootReducer;
