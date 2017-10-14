import {USER_LOGGED_IN, USER_LOGGED_OUT} from '../actions/types';


export default function (state = false, action) {
  switch (action.type){
    case USER_LOGGED_IN:
    console.log("logged in");
      return true;
    case USER_LOGGED_OUT:
      console.log("logged out");
      return false;
    default:
      return state;
  }
}
