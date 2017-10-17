import React from 'react';
import { Route, IndexRoute} from 'react-router';

import App from './components/App/index';
import Main from './components/Main/index';
import Profile from './components/Profile/index';
import Login from './components/Login/index';
import Signup from './components/Signup/index';
import Trades from './components/Trades/index';
import ItemPage from './components/ItemPage/index';
import MyItems from './components/MyItems/index';
import Logout from './components/Logout/index';
import ErrorPage from './components/ErrorPage/index';
import requireAuth from "./utils/requireAuth";

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Main} />
    <Route path="item/:id" component={ItemPage} />
    <Route path="profile" component={requireAuth(Profile)} />
    <Route path="signup" component={Signup} />
    <Route path="login" component={Login} />
    <Route path="logout" component={requireAuth(Logout)} />
    <Route path="trades" component={requireAuth(Trades)} />
    <Route path="myItems" component={requireAuth(MyItems)} />
    <Route path="*" component={ErrorPage} />
  </Route>
);
