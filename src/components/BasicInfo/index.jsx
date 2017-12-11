import React, { Component } from 'react';
import {Link} from 'react-router';
import {connect} from "react-redux";
import './styles.sass';

class BasicInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imgSrc: ""
    };
  }
  render() {

    let $imagePreview = null;
    if (this.props.auth && this.props.auth.user && this.props.auth.user.active_seller && this.props.auth.user.active_seller.image && this.props.auth.user.active_seller.image.url) {
      $imagePreview = (<img src={this.props.auth.user.active_seller.image.url} />);
    }

    return(
      <div className="basicInfo">
      {$imagePreview ?
      <div className="imgPreview">
        {$imagePreview}
      </div> : <div/>
      }
        <div className="nameWrapper">
          <h3 className="normal">{this.props.auth.user.name + " " + this.props.auth.user.last_name}</h3>
        </div>
        {!this.props.auth.user.active_seller ?
          <div className="upgradeButtonWrapper">
          <Link to="/seller/signup" className="upgradeButton normalBtn">Quero ser vendedor</Link>
          </div>
          :
          ""
        }
      </div>
    );
  }
}

function mapStateToProps(state){
  return (
    {
      auth: state.auth
    }
  );
}

export default connect(mapStateToProps, null)(BasicInfo);
