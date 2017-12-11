import {FETCH_SELLER_ANNOUNCEMENTS, CREATE_ANNOUNCEMENT, DELETE_ANNOUNCEMENT} from '../actions/types';

export default function (state = [], action) {
  switch (action.type){
    case FETCH_SELLER_ANNOUNCEMENTS:
      return action.payload;
    case CREATE_ANNOUNCEMENT:
      return [action.payload, ...state ]  // return new instance of state. same as return state.concat([action.payload.data]);
    case DELETE_ANNOUNCEMENT:
      let announcementId = action.payload
      return state.filter(function(announcement){
        return announcement.id != announcementId;
      });
    default:
      return state;
  }
}
