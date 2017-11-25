import React, { Component } from 'react';
import {connect} from "react-redux";
import { Link } from 'react-router';

import TradeRequest from '../TradeRequest/index';
import ProposedTrade from '../ProposedTrade/index';
import AddItemPage from '../AddItemPage/index';
import './styles.sass';

class Trades extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpened: false
    };
  }

  componentDidMount() {
    document.body.scrollTop = 0;
    document.querySelector('.menu').classList.remove('open');
  }

  closeModal() {
    this.setState({ modalOpened: false });
    document.body.classList.remove('modal-opened');
    document.body.style.marginRight = 0;
  }

  getAllProposedTrades() {
    return ([
      <ProposedTrade key="1" />,
      <ProposedTrade key="2" />
    ]);
  }

  getAllTradeRequests() {
    return ([
      <TradeRequest key="1" />,
      <TradeRequest key="2" />
    ]);
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
              <div className="allTradeRequestsWrapper">
                {this.getAllTradeRequests()}
              </div>
            </div>
              <div className="tradeProposedWrapper">
                <h3 className="unCap">Vendas</h3>
                <div className="allProposedTradesWrapper">
                  {this.getAllProposedTrades()}
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
              <div className="allTradeRequestsWrapper">
                {this.getAllTradeRequests()}
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
      auth: state.auth
    }
  );
}

export default connect(mapStateToProps, null)(Trades);
