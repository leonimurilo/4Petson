import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router';
import Modal from 'boron/DropModal';

import Search from '../Search/index'

import './styles.sass';

class Header extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    this.previousWidth = 0;
    this.menuButton = (
      <button className="menuBtn"
        onClick={
          () => {
            document.querySelector(".menu").classList.toggle("open");
          }
        }
      >
        MENU
      </button>
    );

    this.setMenuState(window.innerWidth);
    this.previousWidth = window.innerWidth;

  }

  componentDidMount() {
    window.addEventListener('resize', () => {
      this.setMenuState(window.innerWidth);
    });
  }

  setMenuState(width) {
    if (this.previousWidth !== width) {
      if (width > 768) {
        const menu = document.querySelector('div.menu');
        if(menu) {
          menu.classList.remove("open");
        }
        this.setState({menuActive: false});
      } else {
        this.setState({menuActive: true});
      }
      this.previousWidth = width;
    }
  }

  setNav() {
    console.log("checked:", this.props.isLoggedIn);
    if (this.props.isLoggedIn) {
      this.setState({ nav: this.loggedInMenu });
    } else {
      this.setState({ nav: this.loggedOutMenu });
    }
  }

  showSearchModal(){
    console.log("hello");
        this.refs.modal.show();
    }

    hideModal(){
      console.log("hello hide");
        this.refs.modal.hide();
    }

    callback(event){
        console.log(event);
    }


  render() {
    const modalStyle = {
      width: '80%',
      maxHeight: "70%",
      transition: "width 1s ease-in-out"
    };

    const backdropStyle = {
    height: "100%",
transition: "width 1s ease-in-out"
    };

    const contentStyle = {
    height: "100%",
    overflow: "auto",
    transition: "width 1s ease-in-out"
    };

    if(this.props.isLoggedIn){
      return (
        <header className="header">
          <h1>
            <Link onlyActiveOnIndex={true} to="/" className="logo">
              4Pet
            </Link>
          </h1>
          <Modal  ref={ 'modal' }
                  modalStyle = {modalStyle}
                  backdropStyle={backdropStyle}
                  contentStyle={contentStyle}
          >
            <Search></Search>
          </Modal>
          {this.state.menuActive ? this.menuButton: ""}
          <div className="menu">
            <button title="Search" className="searchButton" onClick={this.showSearchModal.bind(this)}>
              <svg xmlns="http://www.w3.org/2000/svg" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 53.627 53.627" width="20px" height="20px">
                <path d="M53.627,49.385L37.795,33.553C40.423,30.046,42,25.709,42,21C42,9.42,32.58,0,21,0S0,9.42,0,21s9.42,21,21,21  c4.709,0,9.046-1.577,12.553-4.205l15.832,15.832L53.627,49.385z M2,21C2,10.523,10.523,2,21,2s19,8.523,19,19s-8.523,19-19,19  S2,31.477,2,21z" fill="#DC7331"/>
              </svg>
            </button>
            <Link onlyActiveOnIndex={true} key={1} to="/" activeClassName="activeNavLink" className="navLink">
              Home
            </Link>
            <Link onlyActiveOnIndex={true} key={2} to="/profile" activeClassName="activeNavLink" className="navLink">
              Profile
            </Link>
            <Link onlyActiveOnIndex={true} key={3} to="/trades" activeClassName="activeNavLink" className="navLink">
              Trades
            </Link>
            <Link onlyActiveOnIndex={true} key={4} to="/logout" activeClassName="activeNavLink" className="navLink">
              Logout
            </Link>
          </div>
        </header>
      );
    }else{
      return (
        <header className="header">
          <h1>
            <Link onlyActiveOnIndex={true} to="/" className="logo">
              4Pet
            </Link>
          </h1>
          {this.state.menuActive ? this.menuButton: ""}
          <div className="menu loginMenu">
          <Link onlyActiveOnIndex={true} key={1} to="/" activeClassName="activeNavLink" className="navLink">
            Home
          </Link>
          <Link onlyActiveOnIndex={true} key={4} to="/login" activeClassName="activeNavLink" className="navLink">
            Login
          </Link>
          <Link onlyActiveOnIndex={true} key={5} to="/signup" activeClassName="activeNavLink" className="navLink">
            SignUp
          </Link>
          </div>
        </header>
      );
    }

  }
}

function mapStateToProps({isLoggedIn}){
  return ({
    isLoggedIn
  });
}

export default connect(mapStateToProps, null, null, {pure: false})(Header);
