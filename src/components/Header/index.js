import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router';
import Modal from 'boron/OutLineModal';

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
    if(this.props.isLoggedIn){
      return (
        <header className="header">
          <h1>
            <Link onlyActiveOnIndex={true} to="/" className="logo">
              4Pet
            </Link>
          </h1>
          <Modal ref={ 'modal' } modalStyle={{width: '80%'}}>
            <h1>hello</h1>
          </Modal>
          {this.state.menuActive ? this.menuButton: ""}
          <div className="menu">
            <button className="search" onClick={this.showSearchModal.bind(this)}>Search</button>
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
