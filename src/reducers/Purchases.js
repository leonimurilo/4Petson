import {FETCH_PURCHASES} from '../actions/types';

export default function (state = [], action) {
  switch (action.type){
    case FETCH_PURCHASES:
      return action.payload;
    default:
      return state;
  }
}
