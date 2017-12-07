import {FETCH_SELLER_ANNOUNCEMENTS} from '../actions/types';

export default function (state = {}, action) {
  switch (action.type){
    case FETCH_SELLER_ANNOUNCEMENTS:
      return action.payload;
    default:
      return state;
  }
}
