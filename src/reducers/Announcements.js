import {FETCH_ANNOUNCEMENTS, DELETE_ANNOUNCEMENT} from '../actions/types';

export default function (state = null, action) {
  switch (action.type){
    case FETCH_ANNOUNCEMENTS:
      return action.payload;
    case DELETE_ANNOUNCEMENT:
      let announcementId = action.payload
      return state.filter(function(announcement){
        return announcement.id != announcementId;
      });
    default:
      return state;
  }
}
