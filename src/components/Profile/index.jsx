import React, { Component } from 'react';

import BasicInfo from '../BasicInfo/index.jsx';
import OtherInfo from '../OtherInfo/index.jsx';
import './styles.sass';

class Profile extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
    document.querySelector('.menu').classList.remove('open');
  }
  render() {
    return (
      <div className="infoWrapper">
        <BasicInfo />
        <OtherInfo />
      </div>
    );
  }
}

export default Profile;
