import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk'
import TrackerReducer from '../reducers/trackerReducer';

const configureStore = (railsProps) => (
  createStore(TrackerReducer, railsProps, composeWithDevTools(applyMiddleware(thunk)))
);

export default configureStore;
