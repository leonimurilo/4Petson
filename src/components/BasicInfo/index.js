import React, { Component } from 'react';
import {Link} from 'react-router';
import './styles.sass';

class BasicInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "Arshad Khan",
      imgSrc: ""
    };
  }
  render() {
    return(
      <div className="basicInfo">
        <div className="profilePic" />
        <div className="nameWrapper">
          <h3 className="normal">{this.state.name}</h3>
        </div>
        <Link to="/seller/signup" className="upgradeButton normalBtn">Upgrade to seller</Link>
      </div>
    );
  }
}

export default BasicInfo;
