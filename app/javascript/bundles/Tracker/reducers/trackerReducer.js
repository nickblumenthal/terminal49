import { combineReducers } from 'redux';
import bookingReducer from './bookingReducer'
import userReducer from './userReducer'

const TrackerReducer = combineReducers({ bookingReducer, userReducer });

export default TrackerReducer;
