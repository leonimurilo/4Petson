import {
  SET_AUTH_TOKEN,
  USER_LOGGED_IN,
  USER_LOGGED_OUT,
  USER_SIGNED_UP
} from '../actions/types';

const initialState = {
  token: "",
  user: {}
}

export default function (state = initialState, action) {
  // console.log("New action:", action.type);
  switch (action.type){
    // case SET_AUTH_TOKEN: {
    //   var newState = _.clone(state, true);
    //   newState.token = action.payload;
    //   return action.payload;
    // }
    case USER_SIGNED_UP:
    case USER_LOGGED_IN: {
      return action.payload;
    }
    case USER_LOGGED_OUT: {
      localStorage.removeItem('auth_token');
      return {
        token: "",
        user: {}
      };
    }
    default:
      return state;
  }
}
