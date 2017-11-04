import Axios from "axios";
import config from "../utils/config";
import { SubmissionError } from 'redux-form';

import {
  USER_SIGNED_UP,
  USER_LOGGED_OUT,
  USER_LOGGED_IN,
  SET_AUTH_TOKEN,
  FETCH_SPECIES
} from "./types";

// the backend send which fields are wrong.
export function signUp(values, callback) {
  callback();
  const requestPromise = Axios.post(config.url.signUp, values);

  return (dispatch) => {
    return requestPromise.then(({data}) => {
      console.log("data", data);
      localStorage.setItem('auth_token', data.token);
      callback();
      dispatch(
        {
          type: USER_SIGNED_UP,
          payload: true
        }
      );

    }).catch(err => {
        console.log("Error response from server:", err.response);
        throw new SubmissionError({_error: err.response.data.message || "Could not perform the sign up."});
    });

  };
  //should return user info that will be used to display different pages (seller/buyer) as well as the profile info
  return {
    type: USER_SIGNED_UP,
    payload: {data, response: {}}
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
  let token = localStorage.getItem('auth_token');

  return (dispatch) => {
    if(token){
      Axios.get(config.url.checkUser, {params: { token: "ronaldoo" }}).then(function({data}){
        console.log(data);
        if(!data.active_seller){
        } else {
        }

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

      }).catch(function(err){
        console.log("The stored token was denied by the server. Try signing in again.");
        localStorage.removeItem('auth_token');
      });

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

export function fetchSpecies(){
  const species = [
    { id: 1, name: "Cachorro", breeds: [{ id: 1, name: "Yorskshine" }, { id: 2, name: "Bullgod" }, { id: 3, name: "Fila ou pilha?" }]},
    { id: 2, name: "Gato", breeds: [{ id: 4, name: "Siamês" },
                                    { id: 5, name: "Siamês" },
                                    { id: 6, name: "Siamês" },
                                    { id: 7, name: "Siamês" },
                                    { id: 8, name: "Siamês" },
                                    { id: 9, name: "Siamês" },
                                    { id: 10, name: "Siamês" },
                                    { id: 11, name: "Siamês" },
                                    { id: 12, name: "Siamês" },
                                    { id: 13, name: "Siamês" },
                                    { id: 14, name: "Siamês" },
                                    { id: 15, name: "Siamês" },
                                    { id: 15, name: "Siamês" },
                                    { id: 16, name: "Siamês" },
                                    { id: 17, name: "Siamês" },
                                    { id: 18, name: "Siamês" },
                                    { id: 19, name: "Siamês" },
                                    { id: 20, name: "Siamês" },
                                    { id: 21, name: "Siamês" },
                                    { id: 22, name: "Siamês" },
                                    { id: 23, name: "Siamês" },
                                    { id: 24, name: "Siamês" },
                                    { id: 25, name: "Siamês" },
                                    { id: 26, name: "Siamês" },
                                    { id: 27, name: "Siamês" },
                                    { id: 28, name: "Siamês" },
                                    { id: 29, name: "Siamês" }

    ]},
  ];
  console.log("fetch species");
  return (dispatch) => {
    dispatch(
      {
        type: FETCH_SPECIES,
        payload: species
      }
    );
  }
  // Axios.get(config.url.fetchRaces).then(function(response){
  //
  // }).catch(function(error){
  //
  // });
}


//search items: parameters: specie_ids: [1, 2] and breed_ids: [1, 2 ,3]
