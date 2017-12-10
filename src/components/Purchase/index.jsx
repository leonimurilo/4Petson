import React, { Component } from 'react';
import { Link } from 'react-router';
import './styles.sass';

class Purchase extends Component {
  render() {
    return (
      <div className="trWrapper">
        <div className="upper">
          <div className="userImg" />
          <div>
            <h4>
              <Link>{this.props.purchase.announcement.title}</Link>
            </h4>
            <div className="btnGroup">
              <div className="tradeBtnWrapper lower">
                <button className="normalBtn">Mais informações</button>
              </div>
              <div className="tradeBtnWrapper lower">
                <button className="normalBtn">Ver anúncio</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Purchase;