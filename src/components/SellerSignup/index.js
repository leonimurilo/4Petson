import React, { Component } from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {signUpSeller} from '../../actions/index';

import LocationPicker from '../LocationPicker/index'
import './styles.sass';

class SellerSignUp extends Component {
  componentDidMount() {
    document.body.scrollTop = 0;
  }

  onSubmit(values){
    this.props.signUpSeller(values, () => {
        this.props.router.push("/profile");
    });
  }

  render() {
    return (
      <form onSubmit={this.onSubmit.bind(this)} className="sellerSignUpWrapper">
        <h3 className="signUpHeading text-center">Upgrade to seller</h3>
        <label className=" text-center">We need you to select, using the map below, your store location and the distance in kilometers that you intend to deliver</label>
        <LocationPicker
          onLocationSelect={(a, b) => {console.log("lat:",a,"lng:",b);}}
          onRadiusChange={(r) => {console.log("radius:",r);}}
        />
        <div className="sellerInputWrapper inputWrapper">
          <label className=" text-center">Now we just need some more information...</label>
          <input
            placeholder="Type your CNPJ here"
            className={`textInput`}
            type="text"
          />
          <input
            id="imgUpload"
            style={{display: "none"}}
            type="file"
          />
          <label htmlFor="imgUpload">Choose store picture</label>
        </div>
        <div className="btnWrapper sellerBtnWrapper">
          <button className="signUpBtn fbBtn">Request upgrade</button>
        </div>
      </form>
    );
  }
}

export default connect(null, {signUpSeller})(withRouter(SellerSignUp));
