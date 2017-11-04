 import {
   combineReducers
 } from 'redux';
 import Auth from './Auth';
 import Species from './Species'

 import {reducer as formReducer} from "redux-form";

 const rootReducer = combineReducers({
   form: formReducer,
   auth: Auth,
   species:Species
 });

 export default rootReducer;
