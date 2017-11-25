import React, { Component, PropTypes } from 'react';
import {connect} from "react-redux"

import './styles.sass';

class AddItemPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [
        // {imagePreviewUrl: "", file: ""}
      ],
      descriptionCharLimit: 1400,
      title: "",
      price: 100,
      amount: 1,
      expirationDate: "",
      breedId: 0,
      description: ""
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.modalWrapper.classList.add(this.props.openClass);
    }, 50);
  }

  close() {
    this.modalWrapper.classList.remove(this.props.openClass);
    setTimeout(() => {
      this.props.close();
    }, 850);
  }

  onDescriptionChange(event){
    this.setState({
      description: event.target.value,
    });
  }

  onBreedIdChange(event){
    this.setState({
      breedId: event.target.value,
    });
  }

  onTitleChange(event){
    this.setState({
      title: event.target.value,
    });
  }

  onPriceChange(event){
    this.setState({
      price: event.target.value,
    });
  }

  onAmountChange(event){
    this.setState({
      amount: event.target.value,
    });
  }

  onExpirationDateChange(event){
    this.setState({
      expirationDate: event.target.value,
    });
  }



  render() {
    return (
      <div className="addItemWrapper" ref={node => { this.modalWrapper = node; }}>
        <div className="hider" />
        <div className="modal">
          <div className="heading">
            <h3>Novo anúncio</h3>
          </div>
          <div className="itemWrapper">
            <div className="itemPicWrapper">
              <div className="img" />
              <p className="imgText frm">Adicionar fotos</p>
            </div>
            <div className="itemInfoWrapper">
              <div className="inputWrapper">
                <label htmlFor="itemName">Título do anúncio:</label>
                <input  id="itemName"
                name="itemName"
                type="text"
                className="itemName"
                placeholder="Ex: Golden retriever - filhotes"
                value={this.state.title}
                onChange={this.onTitleChange.bind(this)}
              />
              </div>
              <div className="priceWrapper">
                <div className="inputWrapper">
                  <label htmlFor="itemPrice">Preço unitário (R$):</label>
                  <input  min="0"
                          id="itemPrice"
                          name="itemPrice"
                          type="number"
                          className="itemPrice"
                          placeholder="Preço"
                          value={this.state.price}
                          onChange={this.onPriceChange.bind(this)}
                  />
                </div>
                <div className="inputWrapper">
                  <label htmlFor="itemAmount">Quantidade:</label>
                  <input  min="0"
                          id="itemAmount"
                          name="itemAmount"
                          type="number"
                          className="itemAmount"
                          placeholder="Quantidade"
                          value={this.state.amount}
                          onChange={this.onAmountChange.bind(this)}
                  />
                </div>
              </div>
              <div className="priceWrapper">
                <div className="inputWrapper">
                  <label htmlFor="itemExpiration">Validade:</label>
                  <input  min="0"
                          id="itemExpiration"
                          name="itemExpiration"
                          type="date"
                          className="itemExpiration"
                          value={this.state.expirationDate}
                          onChange={this.onExpirationDateChange.bind(this)}
                  />
                </div>
                <div className="inputWrapper">
                  <label htmlFor="itemBreed">Id da raça:</label>
                  <input  id="itemBreed"
                          name="itemBreed"
                          type="text"
                          className="itemBreed"
                          placeholder="Trocar para combobox"
                          value={this.state.breedId}
                          onChange={this.onBreedIdChange.bind(this)}
                  />
                </div>
              </div>
              <div className="inputWrapper">
                <label htmlFor="itemDescription">Descrição do anúncio:</label>
                <textarea name="itemDescription"
                          maxLength={this.state.descriptionCharLimit}
                          id="itemDescription"
                          value={this.state.description}
                          onChange={this.onDescriptionChange.bind(this)}
                          className="itemDescription"
                          placeholder="Descrição"
                />
              </div>
            </div>
          </div>
          <div className="buttonWrapper">
            <button className="saveItemBtn" onClick={this.close.bind(this)}>Criar anúncio</button>
            <button className="cancelItemBtn" onClick={this.close.bind(this)}>Cancelar</button>
          </div>
        </div>
      </div>
    );
  }
}

AddItemPage.propTypes = {
  close: PropTypes.func,
  openClass: PropTypes.string
};

export default AddItemPage;
