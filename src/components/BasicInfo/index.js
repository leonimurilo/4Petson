import React, { Component } from 'react';

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
        <button className="upgradeButton normalBtn">Upgrade to seller</button>
      </div>
    );
  }
}

export default BasicInfo;
