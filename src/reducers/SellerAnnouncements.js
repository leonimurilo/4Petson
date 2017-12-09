import {FETCH_SELLER_ANNOUNCEMENTS, CREATE_ANNOUNCEMENT} from '../actions/types';

export default function (state = [], action) {
  switch (action.type){
    case FETCH_SELLER_ANNOUNCEMENTS:
      return action.payload;
    case CREATE_ANNOUNCEMENT:
      let x = [action.payload, ...state ];
      console.log(x);
      return x  // return new instance of state. same as return state.concat([action.payload.data]);
    default:
      return state;
  }
}
