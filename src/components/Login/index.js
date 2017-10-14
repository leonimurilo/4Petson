import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Link, withRouter} from 'react-router';
import {Field, reduxForm} from "redux-form";
import {login} from '../../actions/index';

import './styles.sass';

class Login extends Component {
  componentDidMount() {
    document.body.scrollTop = 0;
    document.querySelector('.menu').classList.remove('open');
  }

  onSubmit(values){
    this.props.login("test@test.com","secret", () => {
        this.props.router.push("/");
    });
}

  render() {
    // function that is added in the component props by reduxForm()
    const {handleSubmit} = this.props;

    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))} className="loginWrapper">
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

function validate(values){
    const errors = {};
    return errors;
}

export default reduxForm({
    validate,
    form: "LoginForm" // unique name
})(
    connect(null, {login})(withRouter(Login))
);
