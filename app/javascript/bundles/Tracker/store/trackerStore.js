import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import Immutable from 'immutable'
import thunk from 'redux-thunk'
import TrackerReducer from '../reducers/trackerReducer';

const configureStore = (railsProps) => (
  createStore(TrackerReducer, makeImmutable(railsProps), composeWithDevTools(applyMiddleware(thunk)))
);

// Prior state is hydrated from plain rails object - we need to make the values immutable
const makeImmutable = (priorState) => {
  Object.keys(priorState).map((key, index) => {
    priorState[key] = Immutable.fromJS(priorState[key])
  });
  return priorState;
};

export default configureStore;
