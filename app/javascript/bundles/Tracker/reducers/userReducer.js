import Immutable from 'immutable';

import User from '../constants/userConstants';

const initialState = Immutable.fromJS({
  isFetching: false,
  isLoggedIn: false,
  currentUser: {},
  searchHistory: [],
  errors: {}
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
        isLoggedIn: action.data.errors ? false : true,
        currentUser: {
          email: action.data.email
        },
        errors: Immutable.fromJS(action.data.errors)
      });
    case (User.RECEIVE_LOGIN):
      return state.merge({
        isFetching: false,
        isLoggedIn: action.data.errors ? false : true,
        currentUser: {
          email: action.data.email
        },
        errors: Immutable.fromJS(action.data.errors),
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
    case (User.RECEIVE_REMOVE_SEARCH):
      let idx = state.get('searchHistory').findIndex((search) => search.get('id') == action.data.id);
      return state.merge({
        searchHistory: state.get('searchHistory').remove(idx)
      });
    case (User.CLEAR_HISTORY):
      return state.merge({
        searchHistory: Immutable.fromJS([])
      });
    default:
      return state;
  }
}
