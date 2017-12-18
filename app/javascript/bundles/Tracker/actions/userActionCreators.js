import fetch from 'cross-fetch'
import User from '../constants/userConstants'

export function sendSignUp(email, password) {
  return function(dispatch) {
    dispatch(postSignUp(email, password));
    fetch(`/users`, {
      body: JSON.stringify({user: {email: email, password: password}}),
      headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
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
      headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
      method: 'POST'
    })
        .then((response) => response.json())
        .then((data) => dispatch(receiveLogin(data)))
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
    }
  }
}

export function receiveLogin(data) {
  return {
    type: User.RECEIVE_SIGNUP,
    data: {
      email: data.email,
    }
  }
}
