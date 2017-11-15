import React, { Component } from 'react';
import {connect} from "react-redux";
import './styles.sass';
import Item from '../Item/index';

class Homepage extends Component {
  componentDidMount() {
    document.body.scrollTop = 0;
    document.querySelector('.menu').classList.remove('open');
  }
  render() {
    return (
      <div>
        <h4>{this.props.appContent.itemListTitle}</h4>
        <main className="main">

          {"1234567890".split("").map((e, i) => <Item key={i} />)}
        </main>
      </div>

    );
  }
}

function mapStateToProps({appContent}){
  return {appContent}
}

export default connect(mapStateToProps, null)(Homepage);
