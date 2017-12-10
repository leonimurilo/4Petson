import React, { Component } from 'react';
import { Link } from 'react-router';
import './styles.sass';

class Sale extends Component {
  render() {
    console.log("sale:", this.props.sale);
    if(this.props.sale && this.props.sale.announcement && this.props.sale.announcement.title
      && this.props.sale.user.name && this.props.sale.user.last_name
    ){
      return (
        <div className="ptWrapper">
          <div className="upper">
            <div className="userImg">
            </div>
            <div>
              <h4>
                <Link>
                  Você vendeu <span className="userName">{this.props.sale.announcement.title}</span> para <span className="userName">{this.props.sale.user.name} {this.props.sale.user.last_name}</span>
                </Link>
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
    }else{
      return (
        <div className="ptWrapper">
          <div className="upper">
            <div className="userImg" />
            <div style={{marginTop: 20}}>
              <h4>
                 Item Indisponível
              </h4>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default Sale;
