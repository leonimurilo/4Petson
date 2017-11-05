import React, { Component } from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {signUpSeller} from '../../actions/index';

import LocationPicker from '../LocationPicker/index'
import './styles.sass';

class SellerSignUp extends Component {

  constructor(props) {
    super(props);
    this.state = {file: '',imagePreviewUrl: ''};
  }

  componentDidMount() {
    document.body.scrollTop = 0;
  }

  onSubmit(values){
    this.props.signUpSeller(values, () => {
        this.props.router.push("/profile");
    });
  }

  onImageSelect(e){
    console.log(e);
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result
      });
    }

    reader.readAsDataURL(file)
  }

  render() {

    let {imagePreviewUrl} = this.state;
    let $imagePreview = null;
    if (imagePreviewUrl) {
      $imagePreview = (<img src={imagePreviewUrl} />);
    } else {
      $imagePreview = (<div className="previewText">
      </div>);
    }

    return (
      <div>
        <form onSubmit={this.onSubmit.bind(this)} className="sellerSignUpWrapper">
          <h3 className="signUpHeading text-center">Upgrade to seller</h3>
          <label className=" text-center">We need you to select, using the map below, your store location and the distance in kilometers that you intend to deliver</label>
          <LocationPicker
            onLocationSelect={(a, b) => {console.log("lat:",a,"lng:",b);}}
            onRadiusChange={(r) => {console.log("radius:",r);}}
          />
          <div className="sellerInputWrapper inputWrapper">
          <div className="uploadImageWrapper">
            <input
              id="imgUpload"
              style={{display: "none"}}
              onChange={this.onImageSelect.bind(this)}
              type="file"
              accept="image/x-png,image/jpeg"
            />
            <label className="uploadButton" htmlFor="imgUpload">Choose store picture</label>
            <div className="imgPreview">
              {$imagePreview}
            </div>
          </div>
            <label className=" text-center">Now we just need some more information...</label>
            <input
              placeholder="Type your CNPJ here"
              className={`textInput`}
              type="text"
            />

          </div>
          <div className="btnWrapper sellerBtnWrapper">
            <button className="signUpBtn fbBtn">Request upgrade</button>
          </div>
        </form>
      </div>
    );
  }
}

export default connect(null, {signUpSeller})(withRouter(SellerSignUp));
