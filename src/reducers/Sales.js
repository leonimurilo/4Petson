import {FETCH_SALES} from '../actions/types';

export default function (state = [], action) {
  switch (action.type){
    case FETCH_SALES:
      return action.payload;
    default:
      return state;
  }
}
