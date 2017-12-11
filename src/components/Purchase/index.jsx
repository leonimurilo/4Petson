import React, { Component } from 'react';
import { Link, withRouter } from 'react-router';
import './styles.sass';

class Purchase extends Component {

  onViewClick(event){
    this.props.router.push("/item/"+this.props.purchase.announcement.id);
  }

  render() {
    // console.log("purchase:", this.props.purchase);
    if(this.props.purchase && this.props.purchase.announcement && this.props.purchase.announcement.title){

      let $imagePreview = null;
      if (this.props.purchase.announcement.photos && this.props.purchase.announcement.photos[0] && this.props.purchase.announcement.photos[0].url) {
        $imagePreview = (<img src={this.props.purchase.announcement.photos[0].url} />);
      } else {
        $imagePreview = (<div className="previewText frm addPhotoBtn" onClick={this.props.editModal}>Adicionar foto</div>);
      }

      return (
        <div className="trWrapper">
          <div className="upper">
          <div className="imgPreviewMini imgPreview">
            {$imagePreview}
          </div>
            <div>
              <h4>
                <Link to={"item/"+this.props.purchase.announcement.id}>
                  {this.props.purchase.announcement.title}
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
        <div className="trWrapper">
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

export default withRouter(Purchase);
