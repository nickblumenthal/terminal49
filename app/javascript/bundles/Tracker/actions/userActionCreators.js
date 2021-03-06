import fetch from 'cross-fetch'
import User from '../constants/userConstants'
import {getCsrfToken, writeCsrfToken} from '../utils/getCsrfToken'

export function sendSignUp(email, password) {
  return function(dispatch) {
    dispatch(postSignUp(email, password));
    fetch(`/users`, {
      body: JSON.stringify({user: {email: email, password: password}}),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-CSRF-Token': getCsrfToken()
      },
      method: 'POST'
    })
        .then((response) => response.json())
        .then((data) => dispatch(receiveSignUp(data)))
  }
}

export function sendLogin(email, password) {
  return function(dispatch) {
    dispatch(postLogin(email, password));
    fetch(`/users/sign_in`, {
      body: JSON.stringify({user: {email: email, password: password}}),
      headers: {'Accept': 'application/json', 'Content-Type': 'application/json', 'X-CSRF-Token': getCsrfToken()},
      method: 'POST'
    })
        .then((response) => response.json())
        .then((data) => {
          dispatch(receiveLogin(data));
          writeCsrfToken(data.csrf_token);
        })
  }
}

export function sendLogout() {
  return function(dispatch) {
    fetch(`/users/sign_out`, {
      headers: {'Accept': 'application/json', 'Content-Type': 'application/json', 'X-CSRF-Token': getCsrfToken()},
      method: 'DELETE'
    })
        .then((response) => {
          if(response.status == 200) {
            dispatch(receiveLogout());
            return response.json();
          } else {
            console.log(response.status)
          }
        })
        .then((data) => writeCsrfToken(data.csrf_token))
  }
}

export function sendSaveSearch(blId) {
  return function(dispatch) {
    fetch(`/user/user_search_histories`, {
      body: JSON.stringify({user_search_history: {bl_id: blId}}),
      headers: {'Accept': 'application/json', 'Content-Type': 'application/json', 'X-CSRF-Token': getCsrfToken()},
      method: 'POST'
    })
        .then((response) => response.json())
        .then((data) => dispatch(receiveSaveSearch(data)))
  }
}

export function fetchSearchHistory() {
  return function(dispatch) {
    fetch(`/user/user_search_histories`, {
      headers: {'Accept': 'application/json', 'Content-Type': 'application/json', 'X-CSRF-Token': getCsrfToken()},
    })
        .then((response) => response.json())
        .then((data) => dispatch(receiveSearchHistory(data)))
  }
}

export function sendRemoveSearch(id) {
  return function(dispatch) {
    dispatch(receiveRemoveSearch(id));
    fetch(`/user/user_search_histories/${id}`, {
      headers: {'Accept': 'application/json', 'Content-Type': 'application/json', 'X-CSRF-Token': getCsrfToken()},
      method: 'DELETE'
    })
  }
}


export function sendClearSearchHistory() {
  return function(dispatch) {
    dispatch(clearHistory());
    fetch(`/user/users_search_histories/clear`, {
      headers: {'Accept': 'application/json', 'Content-Type': 'application/json', 'X-CSRF-Token': getCsrfToken()},
      method: 'DELETE'
    })
  }
}

export function postSignUp(email, password) {
  return {
    type: User.POST_SIGNUP,
    data: {
      email: email,
      password: password
    }
  }
}

export function postLogin(email, password) {
  return {
    type: User.POST_LOGIN,
    data: {
      email: email,
      password: password
    }
  }
}

export function receiveSignUp(data) {
  return {
    type: User.RECEIVE_SIGNUP,
    data: {
      email: data.email,
      errors: data.errors
    }
  }
}

export function receiveLogin(data) {
  let errors = undefined;
  if(data.error) {
    errors = {"Login": [data.error]};
  }
  return {
    type: User.RECEIVE_LOGIN,
    data: {
      email: data.email,
      errors: errors
    }
  }
}

export function receiveLogout(data) {
  return {
    type: User.RECEIVE_LOGOUT,
    data: {}
  }
}

export function receiveSearchHistory(data) {
  return {
    type: User.RECEIVE_SEARCH_HISTORY,
    data: data
  }
}

export function clearHistory() {
  return {
    type: User.CLEAR_HISTORY,
    data: {}
  }
}

export function receiveSaveSearch(data) {
  return {
    type: User.RECEIVE_SAVE_SEARCH,
    data: data
  }
}

export function receiveRemoveSearch(id) {
  return {
    type: User.RECEIVE_REMOVE_SEARCH,
    data: id
  }
}


