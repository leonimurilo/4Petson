import {FETCH_ANNOUNCEMENTS,
        FETCH_ANNOUNCEMENT,
        DELETE_ANNOUNCEMENT} from '../actions/types';
import _ from "lodash";

export default function (state = null, action) {
  switch (action.type){
    case FETCH_ANNOUNCEMENTS:
      // if(state===null)
      // let newState = _.cloneDeep(state);
      // return Object.assign(newState, _.mapKeys(action.payload, "id"));
      return _.mapKeys(action.payload, "id");
    case FETCH_ANNOUNCEMENT:
      action.payload._temporary = true;
      return {...state, [action.payload.id]: action.payload};
    case DELETE_ANNOUNCEMENT:
      return _.omit(state, action.payload);
    default:
      return state;
  }
}
