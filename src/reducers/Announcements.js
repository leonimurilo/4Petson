import {FETCH_ANNOUNCEMENTS} from '../actions/types';

export default function (state = null, action) {
  switch (action.type){
    case FETCH_ANNOUNCEMENTS:
      return action.payload;
    default:
      return state;
  }
}
