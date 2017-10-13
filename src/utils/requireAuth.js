import React from "react";
import {connect} from "react-redux";

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

  return connect(mapStateToProps)(Authenticate);
}
