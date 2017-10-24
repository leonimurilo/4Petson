import {FETCH_RACES} from '../actions/types';

export default function (state = {}, action) {
  switch (action.type){
    case FETCH_RACES:
      return action.payload;
    default:
      return state;
  }
}
