import React, { Component } from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {logout} from '../../actions/index';

class Logout extends Component {

  componentWillMount () {
       this.props.logout(() => {
           this.props.router.push("/");
       });
   }

  render() {
    return null;
  }

}

export default connect(null, {logout})(withRouter(Logout));
