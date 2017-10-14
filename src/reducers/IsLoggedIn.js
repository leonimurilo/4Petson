import {USER_LOGGED_IN, USER_LOGGED_OUT, USER_SIGNED_UP} from '../actions/types';


export default function (state = false, action) {
  switch (action.type){
    case USER_LOGGED_IN:
    console.log("USER_LOGGED_IN");
      return true;
    case USER_LOGGED_OUT:
      console.log("USER_LOGGED_OUT");
      return false;
      case USER_SIGNED_UP:
        console.log("lUSER_SIGNED_UP");
        return true;
    default:
      return state;
  }
}
