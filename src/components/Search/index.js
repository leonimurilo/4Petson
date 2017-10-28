import React, { Component } from 'react';
import {connect} from 'react-redux';
import _ from "lodash";
import Select from 'react-select';
import 'react-select/dist/react-select.css';

import './styles.sass';

class Search extends Component {
  constructor(props){
    super(props);
    this.state = {
      breeds: [],
      selectedSpecies: []
    }
    this.handleSelectChange = this.handleSelectChange.bind(this);
  }

  handleSelectChange(value) {
      console.log('You have selected: ', value);
      this.setState({ value });
  }

  onSpecieCheckboxChange(event){
    if(event.target.checked){
      this.setState({selectedSpecies: _.union(this.state.selectedSpecies, [Number(event.target.value)])})
    }else{
      this.setState({selectedSpecies: _.filter(this.state.selectedSpecies, function(id){
          return id !== Number(event.target.value);
        })
      });
    }
  }


  renderSpecies(species){
      console.log("state",this.state.selectedSpecies);
      return _.map(species, specie => {
        return (
          <div key={specie.id} className="specieOption">
            <input type="checkbox"
              onChange={this.onSpecieCheckboxChange.bind(this)}
              name={specie.id} value={specie.id}
              checked={this.state.selectedSpecies.includes(specie.id)}/>
            <label htmlFor={specie.id}>{specie.name}</label>
          </div>
        );
      });
    }

  componentWillMount(){
    let x = _.map(_.reduce(this.props.species, function(previousElem, elem){
      return _.concat(previousElem, elem.breeds);
    }, []), function(item){
      item.label = item.name;
      item.value = item.id;
      return item;
    });

    console.log("list", x);
    this.setState({
      breeds: x
    });
  }

  render() {
    return (
      <div>
        <h1>Search pets</h1>
        <div className="checkBoxesContainer">
          <h3>Species:</h3>
          <div>
            {this.renderSpecies(this.props.species)}
          </div>
        </div>
        <Select
        name="form-field-name"
        placeholder="Filter by breeds"
        value={this.state.value}
        multi
        options={this.state.breeds}
        onChange={this.handleSelectChange}
        />
      </div>
    );
  }

}

function mapStateToProps(state){
  return {species: state.species}
}

export default connect(mapStateToProps, null)(Search);
