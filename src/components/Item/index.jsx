import React, { Component } from 'react';
// import {Link} from 'react-router';
import { browserHistory } from 'react-router';

import './styles.sass';

class Item extends Component {
  render() {

    let url = require('../../assets/images/vectorpaint.svg');
    try{
      url = this.props.item.photos[0].url
    }catch(e){
      // console.log(e);
    }

    return(
      <div className="item">
        <div className="content" onClick={()=>{
          browserHistory.push("/item/" + this.props.item.id);
        }}>
          <div>
            <img src={url} />
          </div>
          <div className="resume">
            <h4>{this.props.item.title}</h4>
          </div>
        </div>
      </div>
    );
  }
}

export default Item;
