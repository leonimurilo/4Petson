import React, { Component } from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import { Link } from 'react-router';
import {signUpSeller} from '../../actions/index';

import LocationPicker from '../LocationPicker/index.jsx'
import './styles.sass';

class SellerSignUp extends Component {

  constructor(props) {
    super(props);
    this.state = {
      file: '',
      imagePreviewUrl: '',
      storeName: "",
      cnpj: "",
      lat: 0,
      lng: 0,
      radius: 0
    };
  }

  componentDidMount() {
    document.body.scrollTop = 0;
  }

  onSubmit(e){
    e.preventDefault();
    console.log(this.state);
    let values = {
      profile_picture: this.state.file,
      name: this.state.storeName,
      cnpj: this.state.cnpj,
      lat: this.state.lat,
      lng: this.state.lng,
      radius: this.state.radius
    };

    this.props.signUpSeller(values, () => {
        this.props.router.push("/");
        alert("O pedido foi enviado. Aguarde aprovação.")
    });
  }

  onStoreNameChange(e){
    this.setState({storeName: e.target.value})
  }

  onCNPJChange(e){
    this.setState({cnpj: e.target.value})
  }

  onLocationSelect(lat, lng){
    this.setState({lat, lng})
  }

  onRadiusChange(radius){
    this.setState({radius: radius})
  }

  onImageSelect(e){
    console.log(e);
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];

    console.log("reader", reader);
    console.log("file", file);

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
          <Link className="backLink" to="/profile">
            <span className="small">
              <svg fill="#000000" height="13" viewBox="0 0 18 15" width="13" xmlns="http://www.w3.org/2000/svg">
                <path d="M7 10l5 5 5-5z"/>
                <path d="M0 0h24v24H0z" fill="none"/>
              </svg>
            </span>Voltar
          </Link>
          <h2 className="signUpHeading text-center">Vire um vendedor</h2>
          <div className="sellerInputWrapper inputWrapper">
            <div className="uploadImageWrapper">
              <div className="imgPreview">
                {$imagePreview}
              </div>
              <input
                id="imgUpload"
                style={{display: "none"}}
                onChange={this.onImageSelect.bind(this)}
                type="file"
                accept="image/x-png,image/jpeg"
              />
              <label className="uploadButton" htmlFor="imgUpload">
                <div className="labelContent">
                  <img style={{width: "30px"}} src={require('../../assets/images/photo-camera.svg')} />
                    Escolher foto da loja
                </div>
              </label>
            </div>
            <div className="sellerInputDiv">
              <input
                placeholder="Nome da loja especializada"
                onChange={this.onStoreNameChange.bind(this)}
                value={this.state.storeName}
                className={`textInput`}
                type="text"
              />
              <input
                placeholder="CNPJ"
                onChange={this.onCNPJChange.bind(this)}
                value={this.state.cnpj}
                className={`textInput`}
                type="text"
              />
            </div>
          </div>
          <label className=" text-center">Selecione a localização e o raio de entrega da sua loja utilizando o mapa abaixo.</label>
          <LocationPicker
            onLocationSelect={this.onLocationSelect.bind(this)}
            onRadiusChange={this.onRadiusChange.bind(this)}
          />
          <div className="btnWrapper sellerBtnWrapper">
            <button type="submit" className="signUpBtn fbBtn">Realizar pedido</button>
          </div>
        </form>
      </div>
    );
  }
}

export default connect(null, {signUpSeller})(withRouter(SellerSignUp));
