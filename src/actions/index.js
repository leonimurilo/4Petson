// import axios from "axios";
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
  callback();
  return {
    type: USER_LOGGED_IN,
    payload: true
  };
}

export function logout(callback) {
  callback();
  return {
    type: USER_LOGGED_OUT,
    payload: false
  };
}
