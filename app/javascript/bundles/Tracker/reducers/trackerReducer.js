import { combineReducers } from 'redux';
import { HELLO_WORLD_NAME_UPDATE } from '../constants/trackerConstants';
import bookingReducer from './bookingReducer'

const TrackerReducer = combineReducers({ bookingReducer });

export default TrackerReducer;
