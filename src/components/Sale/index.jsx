import React, { Component } from 'react';
import { Link } from 'react-router';
import './styles.sass';

class Sale extends Component {
  render() {
    return (
      <div className="ptWrapper">
        <div className="upper">
          <div className="userImg" />
          <h4>
            You have proposed <Link>Wilson</Link> for trading <Link>Eloquent Javascript</Link>
          </h4>
        </div>
        <div className="tradeBtnWrapper lower">
          <button className="cancelBtn normalBtn">Mais informações</button>
        </div>
      </div>
    );
  }
}

export default Sale;