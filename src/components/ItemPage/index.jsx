import React, { Component } from 'react';
import {connect} from "react-redux";
import { Link } from 'react-router';
import Loader from "../Loader";
import './styles.sass';

class ItemPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount(){
    document.body.scrollTop = 0;
    document.querySelector('.menu').classList.remove('open');
  }

  render() {
    let item = null;
    if(this.props.announcements){
       item = this.props.announcements.find((element, index) => {
        return element.id == this.props.params.id;
      });
    }

    if(!item){
      return(<div><h3>Carregando anúncio...</h3><Loader/></div>)
    }
    return (
      <div className="itemPageWrapper">
        <div className="itemImgWrapper" />
        <div className="itemInfoWrapper">
          <Link className="backLink" to="/">
            <span className="small">
              <svg fill="#000000" height="13" viewBox="0 0 18 15" width="13" xmlns="http://www.w3.org/2000/svg">
                <path d="M7 10l5 5 5-5z"/>
                <path d="M0 0h24v24H0z" fill="none"/>
              </svg>
            </span>All Items
          </Link>
          <h3 className="itemName">Eloquent Javascript</h3>
          <p className="itemCost frm">$40</p>
          <p className="description">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ea nulla modi, odit explicabo hic doloremque commodi ab molestiae. Iure voluptatem labore et aliquid soluta inventore expedita quam vel a earum!
          </p>
          <p className="seller frm">By <span>Wilson</span></p>
          <button className="reqTradeBtn normalBtn">Request Trade</button>
        </div>
      </div>
    );
  }
}

function mapStateToProps({announcements}){
  return {announcements};
}

export default connect(mapStateToProps, null, null, {pure: false})(ItemPage);
