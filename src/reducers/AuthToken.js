import {CHECK_AUTH_TOKEN, SET_AUTH_TOKEN} from '../actions/types';


export default function (state = "", action) {
  switch (action.type){
    case SET_AUTH_TOKEN:
    console.log("SET_AUTH_TOKEN");
      return action.payload;
    case CHECK_AUTH_TOKEN:
      console.log("CHECK_AUTH_TOKEN");
      return action.payload;
    default:
      return state;
  }
}
