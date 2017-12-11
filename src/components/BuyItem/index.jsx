import React, { Component } from 'react';
import {connect} from "react-redux";
import { Link, withRouter } from 'react-router';
import Loader from "../Loader";
import ImageGallery from "react-image-gallery";
import {fetchAnnouncement, buyAnnouncement} from "../../actions";
import './styles.sass';

class BuyItem extends Component {
  constructor(props) {
    super(props);
    this.state = {didFetch: false};
  }

  componentDidMount(){
    window.scrollTo(0, 0);
    document.querySelector('.menu').classList.remove('open');
  }

  onBuyConfirmed(event){
    this.props.buyAnnouncement(this.props.params.id, () => {
      alert("Compra realizada com sucesso! Seu novo bichinho será entregue em breve.");
      this.props.router.push("/");
    });
  }

  render() {
    if(!this.props.params.id)
      return null
    let item = null;
    if(this.props.announcements)
      item = this.props.announcements[this.props.params.id];

    if(item === null){
      return (<div><h3>Carregando anúncio...</h3><Loader/></div>)
    }

    if(item === undefined){
      if(this.state.didFetch){
        return (<div><h3>Anúncio não encontrado</h3></div>);
      }else{
        console.log("announcement not found in the list, fetching from server...");
        this.props.fetchAnnouncement(this.props.params.id, () => {
          this.setState({didFetch: true});
        });
        return (<div><h3>Carregando anúncio...</h3><Loader/></div>)
      }
    }

    let expiresAt = null;
    let daysLeft = null;

    try{
      expiresAt = new Date(item.expiration);
      daysLeft = Math.round((expiresAt.getTime() - new Date().getTime())/(1000*60*60*24));
    }catch(e){
      console.log("error converting announcements date fields:", e);
    }

    if(item.available_quantity == 0 || daysLeft < 0 ){
      return (<div>
                <h3>Anúncio expirou</h3>
                <Link className="backLink" to="/">Ir para catálogo</Link>
              </div>);
    }

    let images = [];
    if(item.photos){
      images = item.photos.map(function(element){
        return {
          original: element.url,
          thumbnail: element.url
        }
      });
    }

    return (
      <div className="itemPageWrapper buyItemPageWrapper">
        <div className="itemInfoWrapper buyItemInfoWrapper">
          <Link className="backLink" to={"/item/"+this.props.params.id}>
            <span className="small">
              <svg fill="#000000" height="13" viewBox="0 0 18 15" width="13" xmlns="http://www.w3.org/2000/svg">
                <path d="M7 10l5 5 5-5z"/>
                <path d="M0 0h24v24H0z" fill="none"/>
              </svg>
            </span>Voltar para o anúncio
          </Link>
          <h1 className="itemName buyItemName">Confirmar compra</h1>
          <h2 className="itemName">{item.title}</h2>
          <p className="itemCost frm">R${item.price} serão cobrados de seu cartão</p>
          <p className="description">
            {item.description || "Não há descrição para o produto."}
          </p>
          {this.state.didFetch ?
            <p className="seller frm">*Anúncio não listado por proximidade</p> : <div></div>
          }
        </div>
        <div className="buySeparator"></div>
        <button className="buyNormalBtn" onClick={this.onBuyConfirmed.bind(this)}>
          <div>Confirmar compra<img src={require('../../assets/images/credit-card.svg')}/></div>
        </button>
      </div>
    );
  }
}

function mapStateToProps({announcements}){
  return {announcements};
}

export default connect(mapStateToProps, {fetchAnnouncement, buyAnnouncement})(withRouter(BuyItem));
