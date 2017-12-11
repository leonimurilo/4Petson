import {FETCH_PURCHASES, BUY_ANNOUNCEMENT} from '../actions/types';

export default function (state = [], action) {
  switch (action.type){
    case FETCH_PURCHASES:
      return action.payload;
    case BUY_ANNOUNCEMENT:
      return [action.payload, ...state ]
    default:
      return state;
  }
}
