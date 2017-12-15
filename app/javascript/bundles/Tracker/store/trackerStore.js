import { createStore } from 'redux';
import TrackerReducer from '../reducers/trackerReducer';

const configureStore = (railsProps) => (
  createStore(TrackerReducer, railsProps)
);

export default configureStore;
