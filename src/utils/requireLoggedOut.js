import React from "react";
import {withRouter, Link} from "react-router";
import {connect} from "react-redux";
// import Login from "../components/Login/index";

export default function (ComposedComponent) {
  class RequireLoggedOut extends React.Component {

    componentWillMount(){
      if(this.props.auth.token){
        console.log("User is logged in and cannot do it again without logging out.");
        this.context.router.push("/");
      }
    }

    render() {
      if(this.props.auth.token){
        return null;
        // return (<div><Link to="/" activeClassName="activeNavLink" className="navLink">Go home</Link></div>);
      }
      return (
        <ComposedComponent {...this.props}/>
      );
    }
  }

  RequireLoggedOut.propTypes = {
    auth: React.PropTypes.shape({
      token: React.PropTypes.string
    })
  };

  RequireLoggedOut.contextTypes = {
    router: React.PropTypes.object.isRequired
  };

  function mapStateToProps({auth}) {
    return {auth};
  }

  return withRouter(connect(mapStateToProps)(RequireLoggedOut));
}
