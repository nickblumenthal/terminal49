import Immutable from 'immutable';

import User from '../constants/userConstants';

const initialState = Immutable.fromJS({
  isFetching: false,
  isLoggedIn: false,
  currentUser: {},
  searchHistory: []
});


export default function users(state = initialState, action = {}) {
  switch (action.type) {
    case (User.POST_LOGIN):
      return state.merge({
        isFetching: true
      });
    case (User.POST_SIGNUP):
      return state.merge({
        isFetching: true
      });
    case (User.RECEIVE_SIGNUP):
      return state.merge({
        isFetching: false,
        isLoggedIn: true,
        currentUser: {
          email: action.data.email
        }
      });
    case (User.RECEIVE_LOGIN):
      return state.merge({
        isFetching: false,
        isLoggedIn: true,
        currentUser: {
          email: action.data.email
        },
        searchHistory: action.data.search_history || []
      });
    case (User.RECEIVE_LOGOUT):
      return state.merge({
        isFetching: false,
        isLoggedIn: false,
        currentUser: {},
        searchHistory: []
      });
    case (User.RECEIVE_SEARCH_HISTORY):
      return state.merge({
        searchHistory: action.data
      });
    case (User.RECEIVE_SAVE_SEARCH):
      return state.merge({
        searchHistory: state.get('searchHistory').push(Immutable.fromJS(action.data))
      });
    default:
      return state;
  }
}
