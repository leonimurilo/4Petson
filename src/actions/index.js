import Axios from "axios";
import config from "../utils/config";
import { SubmissionError } from 'redux-form';

import {
  USER_SIGNED_UP,
  USER_LOGGED_OUT,
  USER_LOGGED_IN,
  SET_AUTH_TOKEN
} from "./types";

export function signUp(data, callback) {
  callback();
  //should return user info that will be used to display different pages (seller/buyer) as well as the profile info
  return {
    type: USER_SIGNED_UP,
    payload: {data, response: {}}
  };
}

export function login(email, password, callback) {
  const requestPromise = Axios.post(config.url.auth,
        {
            email,
            password
        });

  return (dispatch) => {
    return requestPromise.then(({data}) => {
      console.log("data", data);
      localStorage.setItem('auth_token', data.token);
      callback();
      dispatch(
        {
          type: SET_AUTH_TOKEN,
          payload: data.token
        }
      );

      dispatch(
        {
          type: USER_LOGGED_IN,
          payload: true
        }
      );

    }).catch(err => {
        console.log("Error response from server:", err.response);
        throw new SubmissionError({_error: err.response.data.message || "Could not perform the login."});
    });

  };
}

export function checkLogin() {
  return (dispatch) => {
    let token = localStorage.getItem('auth_token');
      if(token){
      dispatch(
        {
          type: SET_AUTH_TOKEN,
          payload: token
        }
      );
        console.log("here2");

      dispatch(
        {
          type: USER_LOGGED_IN,
          payload: true
        }
      );
    }
  };

}

// manual logout on console: localStorage.clear();
export function logout(callback) {
  localStorage.removeItem('auth_token');
  callback();
  return (dispatch) => {

    dispatch({
      type: SET_AUTH_TOKEN,
      payload: ""
    });

    dispatch({
      type: USER_LOGGED_OUT,
      payload: false
    });


  };
}
