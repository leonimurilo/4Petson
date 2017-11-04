import React, { Component } from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {Field, reduxForm} from "redux-form";
import {signUpSeller} from '../../actions/index';
import {renderField} from '../../utils/formUtils';

import LocationPicker from '../LocationPicker/index'
import './styles.sass';

class SellerSignUp extends Component {
  componentDidMount() {
    document.body.scrollTop = 0;
    document.querySelector('.menu').classList.remove('open');
  }

  onSubmit(values){
    this.props.signUpSeller(values, () => {
        this.props.router.push("/profile");
    });
  }

  render() {
    // function that is added in the component props by reduxForm()
    const {handleSubmit} = this.props;
    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))} className="signUpWrapper">
        <h3 className="signUpHeading text-center">Upgrade to seller</h3>
        <div className="inputWrapper">
          <Field label="CNPJ" name="cnpj" type="text" component={renderField}/>
          <Field label="Radius" name="radius" type="text" component={renderField}/>
          <LocationPicker onLocationSelect={() => {console.log("hello wilson");}}/>
          <Field label="Lat" name="lat" type="text" component={renderField}/>
          <Field label="Lng" name="lng" type="text" component={renderField}/>
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
    if(!values.cnpj || values.cnpj.length < 3){
      errors.cnpj = "Invalid cnpj";
    }
    if(!values.radius || values.radius.length < 2){
      errors.radius = "Invalid radius";
    }
    if(!values.lat || values.lat.length < 2){
      errors.lat = "Invalid lat";
    }
    if(!values.lng || values.lng.length < 2){
      errors.lng = "Invalid lng";
    }

    return errors;
}

export default reduxForm({
    validate,
    form: "SellerSignUpForm" // unique name
})(
    connect(null, {signUpSeller})(withRouter(SellerSignUp))
);
