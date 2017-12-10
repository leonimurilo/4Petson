import {
  combineReducers
} from 'redux';
import Auth from './Auth';
import Species from './Species';
import AppContent from './AppContent';
import Announcements from './Announcements';
import SellerAnnouncements from './SellerAnnouncements';
// import Sales from './Sales';
import Purchases from './Purchases';

import {reducer as formReducer} from "redux-form";

const rootReducer = combineReducers({
  form: formReducer,
  auth: Auth,
  species:Species,
  announcements:Announcements,
  sellerAnnouncements: SellerAnnouncements,
  purchases: Purchases,
  appContent: AppContent
});

export default rootReducer;
