import React, { Component } from 'react';
import { Link, withRouter } from 'react-router';
import './styles.sass';

class Sale extends Component {

  onViewClick(event){
    this.props.router.push("/item/"+this.props.sale.announcement.id);
  }

  render() {
    // console.log("sale:", this.props.sale);
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
                <Link to={"item/"+this.props.sale.announcement.id}>
                  Você vendeu <span className="userName">{this.props.sale.announcement.title}</span> para <span className="userName">{this.props.sale.user.name} {this.props.sale.user.last_name}</span>
                </Link>
              </h4>
              <div className="btnGroup">
                <div className="tradeBtnWrapper lower">
                  <button className="normalBtn">Mais informações</button>
                </div>
                <div className="tradeBtnWrapper lower">
                  <button className="normalBtn" onClick={this.onViewClick.bind(this)}>Ver anúncio</button>
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

export default withRouter(Sale);
