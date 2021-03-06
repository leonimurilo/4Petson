import React from 'react';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';

import routes from './routes';

import {checkLogin, fetchSpecies, fetchAnnouncements} from "./actions/index";

import './styles/global.sass';
import './favicon.ico';

import configureStore from './store/configureStore';

const store = configureStore();
store.dispatch(checkLogin());
store.dispatch(fetchSpecies());
store.dispatch(fetchAnnouncements("campinas"));

render(
  <Provider store={store}>
    <Router history={browserHistory} routes={routes} />
  </Provider>,
  document.getElementById('app')
);
