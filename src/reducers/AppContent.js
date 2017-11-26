import {SET_ITEM_LIST_TITLE} from '../actions/types';
import _ from "lodash";

const defaultState = {
  itemListTitle: "Destaques"
};

export default function (state = defaultState, action) {
  switch (action.type){
    case SET_ITEM_LIST_TITLE: {
      let newState = _.cloneDeep(state);
      newState.itemListTitle = action.payload;
      return newState;
    }
    default:
      return state;
  }
}
