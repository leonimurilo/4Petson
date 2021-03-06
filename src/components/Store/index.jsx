import React, {Component} from 'react';
import {connect} from 'react-redux';

import UserItem from '../UserItem/index.jsx';
import AddItemPage from '../AddItemPage/index.jsx';
import './styles.sass';

import {fetchSellerAnnouncements, deleteAnnouncement} from "../../actions";

class Store extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpened: false
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    document.querySelector('.menu').classList.remove('open');
    this.props.fetchSellerAnnouncements();
  }

  onItemDeleted(announcementId){
    this.props.deleteAnnouncement(announcementId);
  }

  closeModal() {
    this.setState({modalOpened: false});
    document.body.classList.remove('modal-opened');
    document.body.style.marginRight = 0;
  }

  getModal() {
    if (this.state.modalOpened) {
      return <AddItemPage openClass="open" close={this.closeModal.bind(this)}/>;
    } else {
      return;
    }
  }

  openModal() {
    const scrollBar = document.querySelector('.scrollbar-measure');
    const scrollBarWidth = scrollBar.offsetWidth - scrollBar.clientWidth;
    document.body.classList.add('modal-opened');
    document.body.style.marginRight = `${scrollBarWidth}px`;
    this.setState({modalOpened: true});
  }

  render() {
    return (<div className="myItemsWrapper">
      {this.getModal()}
      <div className="addTradeWrapper">
        <button onClick={() => {
            this.openModal();
          }} className="tradeBtn addItemBtn">
          + Novo anúncio
        </button>
      </div>
      {
        this.props.sellerAnnouncements.map((element, index) => {
          return <UserItem  key={element.id}
                            item={element}
                            editModal={this.openModal.bind(this)}
                            onItemDeleted={this.onItemDeleted.bind(this)}
                           />
        })
      }
    </div>);
  }
}

function mapStateToProps({sellerAnnouncements}){
  return {
    sellerAnnouncements
  }
}

export default connect(mapStateToProps, {fetchSellerAnnouncements, deleteAnnouncement})(Store);
