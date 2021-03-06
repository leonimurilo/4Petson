import React, { Component } from 'react';
import {connect} from "react-redux";
import { Link, withRouter } from 'react-router';
import Loader from "../Loader";
import ImageGallery from "react-image-gallery";
import {fetchAnnouncement} from "../../actions";
import './styles.sass';

class ItemPage extends Component {
  constructor(props) {
    super(props);
    this.state = {didFetch: false};
  }

  componentDidMount(){
    window.scrollTo(0, 0);
    document.querySelector('.menu').classList.remove('open');
  }

  onBuyClick(event){
    this.props.router.push("/buy/"+this.props.params.id);
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
        console.log("announcement not found in the list, fetching from server using id:", this.props.params.id);
        this.props.fetchAnnouncement(this.props.params.id, () => {
          this.setState({didFetch: true});
        });
        return (<div><h3>Carregando anúncio...</h3><Loader/></div>)
      }
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

    let expiresAt = null;
    let daysLeft = null;

    try{
      expiresAt = new Date(item.expiration);
      daysLeft = Math.round((expiresAt.getTime() - new Date().getTime())/(1000*60*60*24));
    }catch(e){
      console.log("error converting announcement expiration date:", e);
    }

    console.log("FOTO", item.photos);

    return (
      <div className="itemPageWrapper">
        {item.photos && item.photos.length > 0 ?
          <div className="itemImgWrapper">
            <ImageGallery items={images} showPlayButton={false} showIndex={true} showNav={false}/>
          </div> :
          <div/>
        }

        <div className="itemInfoWrapper">
          <Link className="backLink" to="/">
            <span className="small">
              <svg fill="#000000" height="13" viewBox="0 0 18 15" width="13" xmlns="http://www.w3.org/2000/svg">
                <path d="M7 10l5 5 5-5z"/>
                <path d="M0 0h24v24H0z" fill="none"/>
              </svg>
            </span>Voltar ao catálogo
          </Link>
          <h3 className="itemName">{item.title}</h3>
          <p className="itemCost frm">R${item.price}</p>
          <p className="description">
            {item.description || "Não há descrição para o produto."}
          </p>
          <p className="seller frm">Expira em <span>{daysLeft} dias</span></p>
          {item.available_quantity==0 ?
            <p className="seller frm">*Todos os pets do Anúncio já foram adquiridos :(</p> : <div></div>
          }
          {!item.available_quantity==0 ?
            <button className="reqTradeBtn normalBtn"
                    onClick={this.onBuyClick.bind(this)}>
                    Comprar
                    </button> : null
          }

        </div>
      </div>
    );
  }
}

function mapStateToProps({announcements}){
  return {announcements};
}

export default connect(mapStateToProps, {fetchAnnouncement})(withRouter(ItemPage));
