import React, { Component } from 'react';
import {connect} from "react-redux";
import './styles.sass';
import {fetchAnnouncements} from "../../actions";
import Item from '../Item/index.jsx';
import Loader from "../Loader/index.jsx"

class Homepage extends Component {

  componentWillMount(){
    // this.props.fetchAnnouncements("campinas");
  }
  componentDidMount() {
    document.body.scrollTop = 0;
    document.querySelector('.menu').classList.remove('open');

  }
  render() {
    if(this.props.announcements){
      if(this.props.announcements.length > 0){
        return (
          <div>
            <div id="homeTitle">
              <h2>{this.props.appContent.itemListTitle}</h2>
            </div>
            <main className="main">
              {"1234567890ertyuiolkj".split("").map((e, i) => <Item key={i} />)}
            </main>
          </div>

        );
      }else{
        return (
          <div className="empty">
            <img style={{width: "100px"}} src={require('../../assets/images/open-box.svg')} />
            <h3>Nenhum pet foi encontrado :(</h3>
          </div>)
      }
    }else{
      return(
        <div className="mainLoading">
          <h3>Buscando pets mais próximos...</h3>
          <Loader></Loader>
        </div>
      );
    }

  }
}

function mapStateToProps({appContent, announcements}){
  return {appContent, announcements}
}

export default connect(mapStateToProps, {fetchAnnouncements})(Homepage);
