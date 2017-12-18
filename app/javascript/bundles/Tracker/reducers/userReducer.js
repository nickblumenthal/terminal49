import Immutable from 'immutable';

import User from '../constants/userConstants';

const initialState = Immutable.fromJS({
  isFetching: false,
  isLoggedIn: false,
  currentUser: {}
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
    default:
      return state;
  }
}
