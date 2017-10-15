import Axios from "axios";
import config from "../utils/config";
import { SubmissionError } from 'redux-form'

import {
  USER_SIGNED_UP,
  USER_LOGGED_OUT,
  USER_LOGGED_IN
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
      callback();
      console.log("data", data);
      dispatch(
        {
          type: USER_LOGGED_IN,
          payload: true
        }
      );

    }).catch(err => {
        console.log("Error response from server:", err.response);
        throw new SubmissionError({_error: err.response.data.message || "Could not perform the login."})
    });

  };
}

export function logout(callback) {
  callback();
  return {
    type: USER_LOGGED_OUT,
    payload: false
  };
}
