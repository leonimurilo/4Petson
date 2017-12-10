import React, { Component } from 'react';
// import {Link} from 'react-router';
import { browserHistory } from 'react-router';

import './styles.sass';

class Item extends Component {
  render() {

    let url = require('../../assets/images/search.svg');

    return(
      <div className="item">
        <div className="content" onClick={()=>{
          browserHistory.push("/item/" + this.props.item.id);
        }}>
          <img style={{width: "50px"}} src={url} />
        </div>
      </div>
    );
  }
}

export default Item;
