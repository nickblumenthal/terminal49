import { createStore } from 'redux';
import helloWorldReducer from '../reducers/trackerReducer';

const configureStore = (railsProps) => (
  createStore(helloWorldReducer, railsProps)
);

export default configureStore;