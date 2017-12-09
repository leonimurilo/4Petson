import React, { Component, PropTypes} from 'react';
import { Link } from 'react-router';
import './styles.sass';

class UserItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let createdAt = "Indisponível";
    let expiresAt = null;
    let daysLeft = null;
    let tag = null

    let $imagePreview = null;
    if (this.props.item.photos && this.props.item.photos[0] && this.props.item.photos[0].url) {
      $imagePreview = (<img src={this.props.item.photos[0].url} />);
    } else {
      $imagePreview = (<div className="previewText frm addPhotoBtn" onClick={this.props.editModal}>Adicionar foto</div>);
    }

    console.log();

    try{
      createdAt = new Date(this.props.item.created_at);
      createdAt = createdAt.getDate() + '/' + (createdAt.getMonth() + 1) + '/' +  createdAt.getFullYear();
      expiresAt = new Date(this.props.item.expiration);
      daysLeft = Math.round((expiresAt.getTime() - new Date().getTime())/(1000*60*60*24));
      expiresAt = expiresAt.getDate() + '/' + (expiresAt.getMonth() + 1) + '/' +  expiresAt.getFullYear();
    }catch(e){
      console.log("error converting announcements date fields:", e);
    }

    if(expiresAt && daysLeft){
      if(daysLeft > 0){
        if(daysLeft < 6){
          tag = <div className="tag warningTag frm">Expira em {daysLeft} dias</div>
        }else{
          tag = <div className="tag frm">Expira em {daysLeft} dias</div>
        }
      }else{
        tag = <div className="expiredTag tag frm">Expirou há {(daysLeft*-1)} dias</div>
      }
    }

    return (
      <div className="uIWrapper">
        <div className="upper">
          <div className="imgPreview">
            {$imagePreview}
          </div>
          <div className="itemInfo">
            <h3 className="itemName">
              <Link to="item/1234">{this.props.item.title}</Link>
            </h3>
            <p className="itemCost frm">R${this.props.item.price}</p>
            <div className="dateGroup">
              {createdAt ?
              <div className="fullDate">
                <div className="frm dateTitle">Criado em:</div>
                <div className="addDate frm">{createdAt}</div>
              </div>: null }
              {expiresAt ?
              <div className="fullDate">
                <div className="frm dateTitle">Expira em:</div>
                <div className="addDate frm">{expiresAt}</div>
                {tag}
              </div>: null }
            </div>
            <div className="price frm">Restantes: {this.props.item.quantity}</div>
            <div className="tradeBtnWrapper lower">
              <button className="editBtn normalBtn">Visualizar</button>
              <button className="editBtn normalBtn" onClick={this.props.editModal}>Editar</button>
              <button className="deleteBtn normalBtn">Excluir</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default UserItem;

UserItem.propTypes = {
  editModal: PropTypes.func
};
