import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'
import TrackerReducer from '../reducers/trackerReducer';

const configureStore = (railsProps) => (
  createStore(TrackerReducer, railsProps, applyMiddleware(thunk))
);

export default configureStore;
