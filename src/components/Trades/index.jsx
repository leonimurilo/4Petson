import React, { Component } from 'react';
import {connect} from "react-redux";
import { Link } from 'react-router';

import Purchase from '../Purchase/index.jsx';
import Sale from '../Sale/index.jsx';
import AddItemPage from '../AddItemPage/index.jsx';
import './styles.sass';

import {fetchPurchases, fetchSales} from "../../actions";

class Trades extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpened: false
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    document.querySelector('.menu').classList.remove('open');
    this.props.fetchPurchases();
    this.props.fetchSales();
  }

  closeModal() {
    this.setState({ modalOpened: false });
    document.body.classList.remove('modal-opened');
    document.body.style.marginRight = 0;
  }

  getAllSales() {
    // console.log(this.props);
    if(!this.props.sales || this.props.sales.length == 0){
      return (<div><h4>Você ainda não vendeu nada</h4></div>);
    }
    return this.props.sales.map(function(element, index){
      return (<Sale key={index} sale={element}/>);
    });
  }

  getAllPurchases() {
    // console.log(this.props);
    if(!this.props.purchases || this.props.purchases.length == 0){
      return (<div><h4>Você ainda não comprou nada</h4></div>);
    }
    return this.props.purchases.map(function(element, index){
      return (<Purchase key={index} purchase={element}/>);
    });
  }

  getModal() {
    if (this.state.modalOpened) {
      return <AddItemPage key="modal" openClass="open" close={this.closeModal.bind(this)} />;
    } else {
      return;
    }
  }

  openModal() {
    const scrollBar = document.querySelector('.scrollbar-measure');
    const scrollBarWidth = scrollBar.offsetWidth - scrollBar.clientWidth;
    document.body.classList.add('modal-opened');
    document.body.style.marginRight = `${scrollBarWidth}px`;
    this.setState({ modalOpened: true });
  }

  render() {
    if(this.props.auth.user.active_seller){
      return (
        <div className="tradesWrapper">
          {this.getModal()}
          <div className="addTradeWrapper">
            <Link to="store"><button className="tradeBtn allItemsBtn">Minha loja</button></Link>
            <button
              onClick={() => {
                this.openModal();
              }}
              className="tradeBtn addItemBtn">
              + Novo anúncio
            </button>
          </div>
          <div className="tradesInfoWrapper">
            <div className="tradeReqWrapper">
              <h3 className="unCap">Compras</h3>
              <div className="allPurchasesWrapper">
                {this.getAllPurchases()}
              </div>
            </div>
            <div className="tradeProposedWrapper">
              <h3 className="unCap">Vendas</h3>
              <div className="allSalesWrapper">
                {this.getAllSales()}
              </div>
            </div>
          </div>
        </div>
      );
    }else{
      return (
        <div className="tradesWrapper">
          {this.getModal()}
          <div className="tradesInfoWrapper">
            <div className="tradeReqWrapper">
              <h3 className="unCap">Compras</h3>
              <div className="allPurchasesWrapper">
                {this.getAllPurchases()}
              </div>
            </div>
          </div>
        </div>
      );
    }

  }
}

function mapStateToProps(state){
  return (
    {
      auth: state.auth,
      purchases: state.purchases,
      sales: state.sales
    }
  );
}

export default connect(mapStateToProps, {fetchPurchases, fetchSales})(Trades);
