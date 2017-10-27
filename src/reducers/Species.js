import {FETCH_SPECIES} from '../actions/types';

export default function (state = {}, action) {
  switch (action.type){
    case FETCH_SPECIES:
      return action.payload;
    default:
      return state;
  }
}
