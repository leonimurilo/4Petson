import Axios from "axios";
import config from "../utils/config";
import { SubmissionError } from 'redux-form';

import {
  USER_SIGNED_UP,
  USER_LOGGED_OUT,
  SET_AUTH_TOKEN,
  USER_LOGGED_IN,
  FETCH_SPECIES,
  SELLER_SIGN_UP,
  CREATE_ANNOUNCEMENT,
  DELETE_ANNOUNCEMENT,
  FETCH_ANNOUNCEMENTS,
  FETCH_SELLER_ANNOUNCEMENTS
} from "./types";

const GMAPS_API_KEY = "AIzaSyDNQUXZkRY5hvPA3CkUlYHh9x9-xJJ2kZA";
const GMAPS_API_URL = `http://api.openweathermap.org/data/2.5/forecast?appid=${GMAPS_API_KEY}`;

export function signUpSeller(values, callback) {
  let token = localStorage.getItem('auth_token');

  let formData = new FormData();
  formData.append('profile_picture', values.profile_picture);
  formData.append('name', values.name);
  formData.append('cnpj', values.cnpj);
  formData.append('lat', values.lat);
  formData.append('lng', values.lng);
  console.log(values.radius);
  formData.append('radius', values.radius);
  formData.append('token', token);
  const requestConfig = {
      headers: { 'content-type': 'multipart/form-data' }
  };

  console.log(config.url.sellerSignUp);

  const requestPromise = Axios.post(config.url.sellerSignUp, formData, requestConfig);

  return (dispatch) => {
    return requestPromise.then(({data}) => {
      console.log("data", data);
      callback();
      dispatch(
        {
          type: SELLER_SIGN_UP,
          payload: data
        }
      );

    }).catch(err => {
        console.log("Error response from server:", err);
    });
  };
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
        console.log("The stored token was denied by the server. Try signing in again.", err);
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
      dispatch(
        {
          type: FETCH_SPECIES,
          payload: response.data
        }
      );
    }).catch(function(error){
      console.log(error);
    });
  };

}

export function fetchAnnouncements(userCityName) {
  return (dispatch) => {

    let requestAndDispatch = function(lat, lng){
      Axios.get(config.url.fetchAnnouncements, {
        params: {lat, lng}
      }).then(function(response){
        console.log("announcements:", response.data);
        dispatch(
          {
            type: FETCH_ANNOUNCEMENTS,
            payload: response.data
          }
        );
      }).catch(function(error){
        console.log(error);
      });
    }

    let getLocationByCity = function(){
      // use google maps to get location object with lat and long
      return {lat: "", lng: ""}
    }

    let onLocationAuthorized = function(location) {
      let lat = location.coords.latitude;
      let lng = location.coords.longitude;
      console.log("Location accuracy:", location.coords.accuracy);
      if(location.coords.accuracy > 15000){ // 15km error
        lat, lng = getLocationByCity();
      }

      requestAndDispatch(lat, lng);

    };

    let onLocationDenied = function(error) {
      console.log("User denied location usage:", error);
      console.log("Getting location from google maps based on user city...");

      let lat, lng = getLocationByCity();
      requestAndDispatch(lat, lng);
    };

    try{
      navigator.geolocation.getCurrentPosition(onLocationAuthorized, onLocationDenied);
    }catch(error){
      console.log("Error during fetchAnnouncements:", error);
    }
  };
}

export function createAnnouncement(values, photos, callback){
  values.token = localStorage.getItem('auth_token');
  console.log("values", values);
  const requestPromise = Axios.post(config.url.createAnnouncement, values);

  return (dispatch) => {
    return requestPromise.then(({data}) => {
      console.log("data", data);
      callback();
      dispatch(
        {
          type: CREATE_ANNOUNCEMENT,
          payload: data
        }
      );

    }).catch(err => {
      if(err.response){
        console.log("Error response from server:", err.response);
      }else if(err.request){
        console.log("Could not reach server:", err.response);
      }else{
        console.log("Non request error happened:", err);
      }
    });

  };

}

export function deleteAnnouncement(announcementId){
  let values = {
    token: localStorage.getItem('auth_token'),
    announcement_id: announcementId
  }

  Axios.delete(config.url.deleteAnnouncement, values).then(({data}) => {
    console.log("delete announcement responded:", data);
    dispatch(
      {
        type: DELETE_ANNOUNCEMENT,
        payload: announcementId
      }
    );

  }).catch(err => {
    if(err.response){
      console.log("Error response from server:", err.response);
    }else if(err.request){
      console.log("Could not reach server:", err.response);
    }else{
      console.log("Non request error happened:", err);
    }
  });

}

export function fetchSellerAnnouncements(){
  let token = localStorage.getItem('auth_token');

  return (dispatch) => {
    Axios.get(config.url.fetchSellerAnnouncements, {
      params: {
        token
      }
    }).then(function(response){
      console.log(response);
      dispatch(
        {
          type: FETCH_SELLER_ANNOUNCEMENTS,
          payload: response.data
        }
      );
    }).catch(function(error){
      console.log(error);
    });
  };

}
