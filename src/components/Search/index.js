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
      selectedBreeds: [],
      selectedSpecies: _.map(this.props.species, function(specie){
        return specie.id;
      })
    }
    this.handleSelectChange = this.handleSelectChange.bind(this);
  }

  handleSelectChange(value) {
      console.log('You have selected: ', value);
      this.setState({ selectedBreeds: value });
  }

  clearSelectedBreeds(uncheckedSpecie){
    let filteredselectedBreeds = _.filter(this.state.selectedBreeds, (breed) => {
      return breed.specie !== uncheckedSpecie
    });

    this.setState(
      {
        selectedBreeds: filteredselectedBreeds
      }
    )
  }

  onSpecieCheckboxChange(event){

    let eventSpecie = Number(event.target.value);

    if(event.target.checked){
      this.setState({selectedSpecies: _.union(this.state.selectedSpecies, [eventSpecie])})
    }else{
      this.setState({selectedSpecies: _.filter(this.state.selectedSpecies, function(id){
          return id !== eventSpecie;
        })
      });
      this.clearSelectedBreeds(eventSpecie);
    }
  }


  renderSpecies(species){
      return _.map(species, specie => {
          console.log("selectedSpecies",this.state.selectedSpecies);
          console.log(specie.id);
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

  render() {

    let filteredBreeds = _.reduce(this.props.species, (previousElem, elem) => {
      if(!this.state.selectedSpecies.includes(elem.id)){
        return previousElem;
      }
      elem.breeds = _.map(elem.breeds, (breed) => {
        breed.specie = elem.id;
        breed.label = breed.name;
        breed.value = breed.id;
        return breed
      });
      return _.concat(previousElem, elem.breeds);
    }, []);

      console.log("filteredBreeds", filteredBreeds);

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
        value={this.state.selectedBreeds}
        multi
        options={filteredBreeds}
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
