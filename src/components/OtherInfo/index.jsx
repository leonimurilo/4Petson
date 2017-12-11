import React, { Component } from "react";
import {connect} from "react-redux"

import './styles.sass';

class OtherInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      locationEditing: false,
      contactEditing: false
    };
  }

  getLocationData() {
    if (this.state.locationEditing) {
      return (
        <div className="lIWrapper" key="lIWrapper">
          <div className="inputWrapper">
            <label htmlFor="localAddress">Nome:</label>
            <input id="localAddress" className="localAddress" type="text" placeholder="Ex: João" />
          </div>
          <div className="inputWrapper">
            <label htmlFor="city">Sobrenome:</label>
            <input id="city" className="city" type="text" placeholder="Ex: Silva" />
          </div>
          <div className="inputWrapper">
            <label htmlFor="state">E-mail:</label>
            <input id="state" className="state" type="text" placeholder="Ex: user@4pet.com" />
          </div>
          <div className="inputWrapper">
            <label htmlFor="landmark">Cidade:</label>
            <input id="landmark" className="landmark" type="text" placeholder="Ex: São Paulo" />
          </div>
          <div className="inputWrapper">
            <label htmlFor="country">Estado:</label>
            <input id="country" className="country" type="text" placeholder="Ex: SP" />
          </div>
          <div className="inputWrapper">
            <label htmlFor="pincode">Endereço:</label>
            <input id="pincode" className="pinCode" type="text" placeholder="Ex: Avenida cão e gato" />
          </div>
        </div>
      );
    } else {
      let city = "Não disponível";
      let state = "Não disponível";
      let address = "Não disponível";
      if(this.props.auth.user.address){
        console.log("cidade:", this.props.auth.user.address.city);
        city = this.props.auth.user.address.city || city;
        state = this.props.auth.user.address.state || state;
        address = this.props.auth.user.address.address || address;
      }
      return (
        <div className="lIWrapper" key="lIWrapperText">
          <div className="inputWrapper">
            <label>Nome:</label>
            <p className="inputData">{this.props.auth.user.name}</p>
          </div>
          <div className="inputWrapper">
            <label>Sobrenome:</label>
            <p className="inputData">{this.props.auth.user.last_name}</p>
          </div>
          <div className="inputWrapper">
            <label>E-mail:</label>
            <p className="inputData">{this.props.auth.user.email}</p>
          </div>
          <div className="inputWrapper">
            <label>Cidade:</label>
            <p className="inputData">{city}</p>
          </div>
          <div className="inputWrapper">
            <label>Estado:</label>
            <p className="inputData">{state}</p>
          </div>
          <div className="inputWrapper">
            <label>Endereço:</label>
            <p className="inputData">{address}</p>
          </div>
        </div>
      );
    }
  }

  getContactData() {
    if (this.state.contactEditing) {
      return (
        <div className="cIWrapper" key="cIWrapper">
          <div className="inputWrapper">
            <label htmlFor="email">Nome da loja:</label>
            <input id="email" className="email" type="email" placeholder="Nome da loja" />
          </div>
          <div className="inputWrapper">
            <label htmlFor="phone">CNPJ:</label>
            <input id="phone" className="phone" type="tel" placeholder="CNPJ" />
          </div>
        </div>
      );
    } else {
      if(this.props.auth.user.active_seller){
        return (
          <div className="cIWrapper" key="cIWrapperText">
            <div className="inputWrapper">
              <label>Nome da loja:</label>
              <p className="inputData">{this.props.auth.user.active_seller.name}</p>
            </div>
            <div className="inputWrapper">
              <label>CNPJ:</label>
              <p className="inputData">{this.props.auth.user.active_seller.cnpj}</p>
            </div>
          </div>
        );
      }else{
        return null
      }
    }
  }

  getButtons(info) {
    if (!this.state.locationEditing && info === 'LOCATION') {
      return (
        <button disabled="true" className="marB20"
          onClick={() => {
            this.setState({ locationEditing: true });
          }}></button>
      );
    } else if (!this.state.contactEditing && info === 'CONTACT') {
      return (
        <button disabled="true" className="marB20"
          onClick={() => {
            this.setState({ contactEditing: true });
          }}></button>
      );
    } else {
      let buttons;
      switch (info) {
        case 'LOCATION':
          buttons = ([
            <button className="marB20"
              key="lSave"
              onClick={() => {
                this.setState({ locationEditing: false });
              }}>
              Save
            </button>,
            <button className="marB20 cancelBtn"
              key="lCancel"
              onClick={() => {
                this.setState({ locationEditing: false });
              }}>
              Cancel
            </button>
          ]);

          break;
        case 'CONTACT':
          buttons = ([
            <button className="marB20"
              key="cSave"
              onClick={() => {
                this.setState({ contactEditing: false });
              }}>
              Save
            </button>,
            <button className="marB20 cancelBtn"
              key="cCancel"
              onClick={() => {
                this.setState({ contactEditing: false });
              }}>
              Cancel
            </button>
          ]);
          break;
      }
      return buttons;
    }
  }

  render() {
    return (
      <div className="otherInfo">
        <div className="locationInfo">
          <div className="heading">
            <h3 className="normal marB20">Informações de cadastro</h3>
            {this.getButtons('LOCATION')}
          </div>
            {this.getLocationData()}
        </div>
        {this.props.auth.user.active_seller ?
          <div className="contactInfo">
            <div className="heading">
              <h3 className="normal marB20">Informações da loja</h3>
              {this.getButtons('CONTACT')}
            </div>
              {this.getContactData()}
          </div>
           : ""}

      </div>
    );
  }
}

function mapStateToProps({auth}){
  return ({
    auth
  });
}

export default connect(mapStateToProps, null)(OtherInfo);
