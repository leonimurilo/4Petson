// import axios from "axios";
import {
  USER_LOGGED_OUT,
  USER_LOGGED_IN
} from "./types";

export function login(email, password, callback) {
  console.log("login")
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
