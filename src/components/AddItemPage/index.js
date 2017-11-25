import React, { Component, PropTypes } from 'react';

import './styles.sass';

class AddItemPage extends Component {
  constructor(props) {
    super(props);
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
                <input id="itemName" name="itemName" type="text" className="itemName" placeholder="Ex: Golden retriever - filhotes" required />
              </div>
              <div className="priceWrapper">
                <div className="inputWrapper">
                  <label htmlFor="itemPrice">Preço unitário:</label>
                  <input min="0" id="itemPrice" name="itemPrice" type="number" className="itemPrice" placeholder="Preço" required />
                </div>
                <div className="inputWrapper">
                  <label htmlFor="itemAmount">Quantidade:</label>
                  <input min="0" id="itemAmount" name="itemAmount" type="number" className="itemAmount" placeholder="Quantidade" required />
                </div>
              </div>
              <div className="priceWrapper">
                <div className="inputWrapper">
                  <label htmlFor="itemExpiration">Validade:</label>
                  <input min="0" id="itemExpiration" name="itemExpiration" type="number" className="itemExpiration" placeholder="Quantidade" required />
                </div>
                <div className="inputWrapper">
                  <label htmlFor="itemCurrency">Id da raça:</label>
                  <input id="itemCurrency" name="itemCurrency" type="text" className="itemCurrency" placeholder="Trocar para combobox" />
                </div>
              </div>
              <div className="inputWrapper">
                <label htmlFor="itemDescription">Descrição do anúncio:</label>
                <textarea name="itemDescription" id="itemDescription" className="itemDescription" placeholder="Descrição" />
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
