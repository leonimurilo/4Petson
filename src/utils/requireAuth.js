import React from "react";
import {withRouter, Link} from "react-router";
import {connect} from "react-redux";
// import Login from "../components/Login/index";

export default function (ComposedComponent) {
  class Authenticate extends React.Component {

    componentWillMount(){
      if(!this.props.auth.token){
        console.log("User is not logged in");
        this.context.router.push("/login");
      }
    }

    render() {
      if(!this.props.auth.token){
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
    auth: React.PropTypes.shape({
      token: React.PropTypes.string
    })
  };

  Authenticate.contextTypes = {
    router: React.PropTypes.object.isRequired
  };

  function mapStateToProps({auth}) {
    return {auth};
  }

  return withRouter(connect(mapStateToProps)(Authenticate));
}
