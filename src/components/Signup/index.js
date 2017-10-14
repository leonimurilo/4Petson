import React, { Component } from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {Field, reduxForm} from "redux-form";
import {signUp} from '../../actions/index';
import {validateEmail, validateCPF, renderField} from '../../utils/formUtils';

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
    // function that is added in the component props by reduxForm()
    const {handleSubmit} = this.props;
    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))} className="signUpWrapper">
        <h3 className="signUpHeading text-center">SignUp</h3>
        <div className="inputWrapper">
          <Field label="Name" name="name" type="text" component={renderField}/>
          <Field label="Surname" name="surname" type="text" component={renderField}/>
          <Field label="E-mail" name="email" type="email" component={renderField}/>
          <Field label="CPF" name="cpf" type="text" component={renderField}/>
          <Field label="Credit card number" name="creditCardNumber" type="text" component={renderField}/>
          <Field label="Address" name="adress" type="text" component={renderField}/>
          <Field label="City" name="city" type="text" component={renderField}/>
          <Field label="State/Province" name="state" type="text" component={renderField}/>
          <Field label="ZIP/Postal code" name="zip" type="text" component={renderField}/>
          <Field label="Country" name="country" type="text" component={renderField}/>
          <Field label="Password" name="password" type="password" component={renderField}/>
          <Field label="Confirm password" name="confirmPassword" type="password" component={renderField}/>
        </div>
        <div className="btnWrapper">
          <button className="signUpBtn fbBtn">Sign up</button>
        </div>
      </form>
    );
  }
}

function validate(values){
    const errors = {};
    if(!values.name || values.name.length < 3){
      errors.name = "Invalid name";
    }
    if(!values.surname || values.surname.length < 2){
      errors.surname = "Invalid surname";
    }
    if(!validateEmail(values.email)){
      errors.email = "Invalid E-mail";
    }
    if(!validateCPF(values.cpf)){
      errors.cpf = "Invalid CPF";
    }
    if(!values.creditCardNumber || values.creditCardNumber.length < 12){
      errors.creditCardNumber = "Invalid credit card number";
    }
    if(!values.adress || values.adress.length < 10){
      errors.adress = "Invalid adress";
    }
    if(!values.city || values.city.length < 2){
      errors.city = "Invalid city";
    }
    if(!values.state || values.state.length < 2){
      errors.state = "Invalid state/province";
    }
    if(!values.zip || values.zip.length < 5){
      errors.zip = "Invalid ZIP/Postal code";
    }
    if(!values.country || values.country.length < 3){
      errors.country = "Invalid country";
    }
    if(!values.password || values.password.length < 8){
      errors.password = "Invalid password";
    }
    if(!values.confirmPassword || values.confirmPassword.length < 8){
      errors.confirmPassword = "Password confirmation too short";
    }
    if(values.confirmPassword && values.password){
      if(values.confirmPassword !== values.password && values.password.length >= 8){
        errors.confirmPassword = "Password confirmation doesn't match";
      }
    }

    return errors;
}

export default reduxForm({
    validate,
    form: "SignUpForm" // unique name
})(
    connect(null, {signUp})(withRouter(SignUp))
);
