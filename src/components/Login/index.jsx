import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Link, withRouter} from 'react-router';
import {Field, reduxForm} from "redux-form";
import {login} from '../../actions/index';
import {validateEmail, renderField} from '../../utils/formUtils';
import './styles.sass';

class Login extends Component {

  componentDidMount() {
    window.scrollTo(0, 0);
    document.querySelector('.menu').classList.remove('open');
  }

  // values contains all the input values of the form
  onSubmit(values){
    return this.props.login(values.email, values.password, () => {
        this.props.router.push("/");
    });
  }

  render() {
    // function that is added in the component props by reduxForm()
    const {handleSubmit, error} = this.props;

    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))} className="loginWrapper">
        <h3 className="loginHeading text-center">Entre com sua conta</h3>
        <Field
          label="E-mail"
          name="email"
          type="email"
          component={renderField}
        />
        <Field
          label="Senha"
          name="password"
          type="password"
          component={renderField}
        />
        <label className="errorMessage">{error}</label>
        <div className="btnWrapper">
          <button type="submit" className="loginBtn fbBtn">Login</button>
        </div>
        <Link to="/signup" >Criar nova conta</Link>

      </form>
    );
  }
}

function validate(values){
    const errors = {};
    if(!validateEmail(values.email)){
      errors.email = "Invalid E-mail";
    }

    if(!values.password || values.password.length < 8){
      errors.password = "Enter a password that is at least 8 characters long!";
    }

    return errors;
}

export default reduxForm({
    validate,
    form: "LoginForm" // unique name
})(
    connect(null, {login})(withRouter(Login))
);
