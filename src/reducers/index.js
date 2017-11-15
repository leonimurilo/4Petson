import {
  combineReducers
} from 'redux';
import Auth from './Auth';
import Species from './Species';
import AppContent from './AppContent';

 import {reducer as formReducer} from "redux-form";

 const rootReducer = combineReducers({
   form: formReducer,
   auth: Auth,
   species:Species,
   appContent: AppContent
 });

 export default rootReducer;
