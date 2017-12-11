import React, { Component, PropTypes} from 'react';
import { Link, withRouter } from 'react-router';
import './styles.sass';


class UserItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDeleting: false
    }
  }

  onDeleteAttempt(event){
    this.setState({isDeleting: true});
  }

  onDeleteConfirmed(event){
    if(this.props.onItemDeleted){
      this.props.onItemDeleted(this.props.item.id);
    }else{
      alert("No deletion callback was passed to the item");
    }
  }

  onViewClick(event){
    this.props.router.push("/item/"+this.props.item.id);
  }

  render() {
    if(!this.props.item){
      return (<div>No item to display...</div>);
    }
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

    if(this.props.item.available_quantity == 0){
      tag = <div className="tag blueTag frm">Pets comprados</div>
    }else{
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
    }

    return (
      <div className="uIWrapper">
        <div className="upper">
          <div className="imgPreview">
            {$imagePreview}
          </div>
          <div className="itemInfo">
            <h3 className="itemName">
              <Link to={"item/"+this.props.item.id}>{this.props.item.title}</Link>
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
            <div className="price frm">Restantes: {this.props.item.available_quantity} de {this.props.item.quantity}</div>
            <div className="tradeBtnWrapper lower">
              <button className="editBtn normalBtn" onClick={this.onViewClick.bind(this)}>Visualizar</button>
              {this.state.isDeleting ?
                <button className="deleteBtn normalBtn" onClick={this.onDeleteConfirmed.bind(this)}>Confirmar exclusão</button> :
                <button className="deleteBtn normalBtn" onClick={this.onDeleteAttempt.bind(this)}>Excluir</button>
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(UserItem);

UserItem.propTypes = {
  editModal: PropTypes.func
};
