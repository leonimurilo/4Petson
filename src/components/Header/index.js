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
    if (this.props.auth.token) {
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
      maxWidth: 800,
      overflow: "auto",
      height: "70%",
      maxHeight: "70%",
    };

    const backdropStyle = {
    height: "100%",
    overflow: "auto",
    maxHeight: "100%",
    };

    const contentStyle = {
    height: "100%",
    overflow: "auto",
    };

    // const unloggedMenu = (
    //
    // );
    //
    // const buyerMenu = (
    //
    // );
    //
    // const sellerMenu = (
    //
    // );

    if(this.props.auth.token){
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
          <div className="menu loginMenu">
            <button title="Search" className="searchButton" onClick={this.showSearchModal.bind(this)}>
              <img style={{width: "18px"}} src={require('../../assets/images/search.svg')} />
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

function mapStateToProps({auth}){
  return ({
    auth
  });
}

export default connect(mapStateToProps, null, null, {pure: false})(Header);
