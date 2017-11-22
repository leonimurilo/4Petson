import Axios from "axios";
import config from "../utils/config";
import { SubmissionError } from 'redux-form';

import {
  USER_SIGNED_UP,
  USER_LOGGED_OUT,
  SET_AUTH_TOKEN,
  USER_LOGGED_IN,
  FETCH_SPECIES,
  FETCH_OFFERS
} from "./types";



export function signUpSeller(values, callback) {
  console.log("fake action triggered");
  callback();
  return {
    type: "fake",
    payload: null
  }
}

// the backend send which fields are wrong.
export function signUp(values, callback) {
  const requestPromise = Axios.post(config.url.signUp, values);

  return (dispatch) => {
    return requestPromise.then(({data}) => {
      console.log("data", data);
      localStorage.setItem('auth_token', data.token);
      callback();
      dispatch(
        {
          type: USER_SIGNED_UP,
          payload: data
        }
      );

    }).catch(err => {
        console.log("Error response from server:", err.response);
        throw new SubmissionError({_error: err.response.data.message || "Could not perform the sign up."});
    });

  };

}

export function login(email, password, callback) {
  const requestPromise = Axios.post(config.url.signIn,
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
          type: USER_LOGGED_IN,
          payload: data
        }
      );

    }).catch(err => {
        console.log("Error response from server:", err.response);
        throw new SubmissionError({_error: err.response.data.message || "Could not perform the login."});
    });

  };
}

export function checkLogin() {
  let token = localStorage.getItem('auth_token');

  return (dispatch) => {
    dispatch(
      {
        type: SET_AUTH_TOKEN,
        payload: token
      }
    );

    if(token){
      Axios.get(config.url.checkUser, {params: { token }}).then(function({data}){
        console.log(data);
        if(!data.active_seller){
        } else {
        }
        dispatch(
          {
            type: USER_LOGGED_IN,
            payload: {
              token,
              user: data
            }
          }
        );

      }).catch(function(err){
        console.log("The stored token was denied by the server. Try signing in again.");
        dispatch(
          {
            type: USER_LOGGED_OUT,
            payload: false
          }
        );
      });

    }
  };

}

// manual logout on console: localStorage.clear();
export function logout(callback) {
  callback();
  return (dispatch) => {
    dispatch({
      type: USER_LOGGED_OUT,
      payload: false
    });
  };
}

export function fetchSpecies(){
  return (dispatch) => {
    Axios.get(config.url.fetchRaces).then(function(response){
      console.log(response);
      dispatch(
        {
          type: FETCH_SPECIES,
          payload: response.data
        }
      );
    }).catch(function(error){

    });
  };

}

export function fetchOffers() {
  return (dispatch) => {
    let mock = {

    }
    dispatch(
      {
        type: FETCH_SPECIES,
        payload: mock
      }
    );
  }
}
