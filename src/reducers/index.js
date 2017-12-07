import {
  combineReducers
} from 'redux';
import Auth from './Auth';
import Species from './Species';
import AppContent from './AppContent';
import SellerAnnouncements from './SellerAnnouncements';

 import {reducer as formReducer} from "redux-form";

 const rootReducer = combineReducers({
   form: formReducer,
   auth: Auth,
   species:Species,
   sellerAnnouncements: SellerAnnouncements,
   appContent: AppContent
 });

 export default rootReducer;
