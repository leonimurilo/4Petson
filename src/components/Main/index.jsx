import React, { Component } from 'react';
import {connect} from "react-redux";
import './styles.sass';
import {fetchAnnouncements} from "../../actions";
import Item from '../Item/index.jsx';
import Loader from "../Loader/index.jsx";
import _ from "lodash";

class Homepage extends Component {

  componentDidMount() {
    window.scrollTo(0, 0);
    document.querySelector('.menu').classList.remove('open');
    this.props.fetchAnnouncements("campinas");
  }

  renderAnnouncements(){
    return _.map(this.props.announcements, function(element, index){
      return (<Item key={index} item={element}/>);
    });
  }

  render() {

    if(this.props.announcements){
      let isEmpty = Object.keys(this.props.announcements).length === 0 && this.props.announcements.constructor === Object;
      console.log("anuncios:", this.props.announcements);
      console.log("anuncios:", isEmpty);
      if(!isEmpty){
        console.log("aqui1");
        return (
          <div className="mainWrapper">
            <div id="homeTitle">
              <h2>{this.props.appContent.itemListTitle}</h2>
            </div>
            <main className="main">
              {this.renderAnnouncements()}
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
