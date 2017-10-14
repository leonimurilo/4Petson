import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import './styles.sass';
import {login} from '../../actions/index';

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


export default connect(null, null)(Login);
