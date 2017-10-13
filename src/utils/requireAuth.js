import React from "react";
import {withRouter, Link} from "react-router";
import {connect} from "react-redux";
// import Login from "../components/Login/index";

export default function (ComposedComponent) {
  console.log("Auth");
  class Authenticate extends React.Component {

    componentWillMount(){
      if(!this.props.isLoggedIn){
        console.log("User is not logged in");
        this.context.router.push("/login");
      }
    }

    render() {
      if(!this.props.isLoggedIn){
        return (<div><Link to="/login" activeClassName="activeNavLink" className="navLink">Sign in</Link></div>);
        // return (<Login/>);
        // return null;
      }
      return (
        <ComposedComponent {...this.props}/>
      );
    }
  }

  Authenticate.propTypes = {
    isLoggedIn: React.PropTypes.bool.isRequired
  };

  Authenticate.contextTypes = {
    router: React.PropTypes.object.isRequired
  };

  function mapStateToProps({isLoggedIn}) {
    return {isLoggedIn};
  }

  return withRouter(connect(mapStateToProps)(Authenticate));
}
