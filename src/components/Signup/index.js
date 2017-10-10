import React, { Component } from 'react';
import './styles.sass';

class Login extends Component {
  componentDidMount() {
    document.body.scrollTop = 0;
    document.querySelector('.menu').classList.remove('open');
  }

  render() {
    return (
      <form className="loginWrapper">
        <h3 className="loginHeading text-center">SignUp</h3>
        <div className="inputWrapper">
          <input className="textInput" placeholder="Name" type="text"/>
          <input className="textInput" placeholder="Surname" type="text"/>
          <input className="textInput" placeholder="E-mail" type="email"/>
          <input className="textInput" placeholder="CPF" type="text"/>
          <input className="textInput" placeholder="Credit card number" type="text"/>
          <input className="textInput" placeholder="Address" type="text"/>
          <input className="textInput" placeholder="City" type="text"/>
          <input className="textInput" placeholder="State/Province" type="text"/>
          <input className="textInput" placeholder="ZIP/Postal code" type="text"/>
          <input className="textInput" placeholder="Country" type="text"/>
          <input className="textInput" placeholder="Password" type="password"/>
          <input className="textInput" placeholder="Confirm password" type="password"/>
        </div>
        <div className="btnWrapper">
          <button className="loginBtn fbBtn">Sign up</button>
        </div>
      </form>
    );
  }
}

export default Login;
