import React from "react";
import {withRouter, Link} from "react-router";
import {connect} from "react-redux";
// import Login from "../components/Login/index";

export default function (ComposedComponent) {
  class RequireLoggedOut extends React.Component {

    componentWillMount(){
      if(this.props.isLoggedIn){
        console.log("User is logged in and cannot do it again without logging out.");
        this.context.router.push("/");
      }
    }

    render() {
      if(this.props.isLoggedIn){
        return null;
        // return (<div><Link to="/" activeClassName="activeNavLink" className="navLink">Go home</Link></div>);
      }
      return (
        <ComposedComponent {...this.props}/>
      );
    }
  }

  RequireLoggedOut.propTypes = {
    isLoggedIn: React.PropTypes.bool.isRequired
  };

  RequireLoggedOut.contextTypes = {
    router: React.PropTypes.object.isRequired
  };

  function mapStateToProps({isLoggedIn}) {
    return {isLoggedIn};
  }

  return withRouter(connect(mapStateToProps)(RequireLoggedOut));
}
