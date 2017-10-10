import React, { Component } from 'react';
import {Link} from 'react-router';
import './styles.sass';

class Login extends Component {
  componentDidMount() {
    document.body.scrollTop = 0;
    document.querySelector('.menu').classList.remove('open');
  }

  render() {
    return (
      <form className="loginWrapper">
        <h3 className="loginHeading text-center">Login with your account or SignUp</h3>
        <input className="textInput" placeholder="E-mail" type="text"/>
        <input className="textInput" placeholder="Password" type="password"/>
        <div className="btnWrapper">
          <button className="loginBtn fbBtn">Login</button>
        </div>
        <Link to="/signup" >SignUp</Link>

      </form>
    );
  }
}

export default Login;
