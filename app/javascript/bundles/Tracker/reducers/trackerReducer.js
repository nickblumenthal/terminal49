import { combineReducers } from 'redux';
import { HELLO_WORLD_NAME_UPDATE } from '../constants/trackerConstants';
import bookingReducer from './bookingReducer'

const name = (state = '', action) => {
  switch (action.type) {
    case HELLO_WORLD_NAME_UPDATE:
      return action.text;
    default:
      return state;
  }
};

const TrackerReducer = combineReducers({ name, bookingReducer });

export default TrackerReducer;
