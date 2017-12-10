import {FETCH_ANNOUNCEMENTS, DELETE_ANNOUNCEMENT} from '../actions/types';
import _ from "lodash";

export default function (state = null, action) {
  switch (action.type){
    case FETCH_ANNOUNCEMENTS:
      return _.mapKeys(action.payload, "id");
    case DELETE_ANNOUNCEMENT:
      return _.omit(state, action.payload);
    default:
      return state;
  }
}
