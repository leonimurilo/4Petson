import React from 'react';
import { Route, IndexRoute} from 'react-router';

import App from './components/App/index.jsx';
import Main from './components/Main/index.jsx';
import Profile from './components/Profile/index.jsx';
import Login from './components/Login/index.jsx';
import Signup from './components/Signup/index.jsx';
import SellerSignup from './components/SellerSignup/index.jsx';
import Trades from './components/Trades/index.jsx';
import ItemPage from './components/ItemPage/index.jsx';
import Store from './components/Store/index.jsx';
import Logout from './components/Logout/index.jsx';
import ErrorPage from './components/ErrorPage/index.jsx';
import BuyItem from './components/BuyItem/index.jsx';

import requireAuth from "./utils/requireAuth";
import requireLoggedOut from "./utils/requireLoggedOut";

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Main} />
    <Route path="item/:id" component={ItemPage} />
    <Route path="buy/:id" component={BuyItem} />
    <Route path="profile" component={requireAuth(Profile)} />
    <Route path="signup" component={Signup} />
    <Route path="seller" >
      <Route path="signup" component={requireAuth(SellerSignup, true)} />
    </Route>
    <Route path="login" component={requireLoggedOut(Login)} />
    <Route path="logout" component={requireAuth(Logout)} />
    <Route path="trades" component={requireAuth(Trades)} />
    <Route path="store" component={requireAuth(Store)} />
    <Route path="*" component={ErrorPage} />
  </Route>
);
