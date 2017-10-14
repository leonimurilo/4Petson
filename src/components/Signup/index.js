import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Link, withRouter} from 'react-router';
import {Field, reduxForm} from "redux-form";
import {signUp} from '../../actions/index';
import {validateEmail, renderField} from '../../utils/formUtils';

import './styles.sass';

class SignUp extends Component {
  componentDidMount() {
    document.body.scrollTop = 0;
    document.querySelector('.menu').classList.remove('open');
  }

  onSubmit(values){
    this.props.signUp(values, () => {
        this.props.router.push("/");
    });
  }

  render() {
    return (
      <form className="signUpWrapper">
        <h3 className="signUpHeading text-center">SignUp</h3>
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
          <button className="signUpBtn fbBtn">Sign up</button>
        </div>
      </form>
    );
  }
}

export default SignUp;
