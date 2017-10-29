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
      showAddtionalOptions: false,
      breeds: [],
      selectedSpecies: _.map(this.props.species, function(specie){
        return specie.id;
      })
    };
    this.handleSelectChange = this.handleSelectChange.bind(this);
  }

  handleSelectChange(value) {
      console.log('You have selected: ', value);
      this.setState({ selectedBreeds: value });
  }

  clearSelectedBreeds(uncheckedSpecie){
    let filteredselectedBreeds = _.filter(this.state.selectedBreeds, (breed) => {
      return breed.specie !== uncheckedSpecie;
    });

    this.setState(
      {
        selectedBreeds: filteredselectedBreeds
      }
    );
  }

  onSpecieCheckboxChange(event){

    let eventSpecie = Number(event.target.value);

    if(event.target.checked){
      this.setState({selectedSpecies: _.union(this.state.selectedSpecies, [eventSpecie])});
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

  renderAddtionalSearchOptions(){
    if(this.state.showAddtionalOptions){
      console.log("showing");
      return (
        <div className="addtionalOptions">
          <div className="addtionalOptionsMenu">
          <h3>Breeds:</h3>
            <button onClick={this.onSelectAllBreedsClick.bind(this)}>Select all breeds</button>
          </div>
          <div style={{width: "100%"}}>
            <Select
            name="form-field-name"
            placeholder="Choose specific breeds"
            value={this.state.selectedBreeds}
            multi
            options={this.filterBreeds()}
            onChange={this.handleSelectChange}
            />
          </div>
        </div>
      )
    }else{
      return null
    }
  }

  filterBreeds(){
    return _.reduce([...this.props.species], (previousElem, elem) => {
      if(!this.state.selectedSpecies.includes(elem.id)){
        return previousElem;
      }
      elem.breeds = _.map(elem.breeds, (breed) => {
        breed.specie = elem.id;
        breed.label = breed.name;
        breed.value = breed.id;
        return breed;
      });
      return _.concat(previousElem, elem.breeds);
    }, []);
  }

  onSelectAllBreedsClick(event){
    event.preventDefault();
    this.setState(
      {
        selectedBreeds: this.filterBreeds()
      }
    );
  }

  componentWillMount(){
    this.setState(
      {
        selectedBreeds: this.filterBreeds()
      }
    );
  }

  // na hr de triggar a action, verificar dse ha showAddtionalOptions. se houver, entao
  // fazer search por breeds, se nao, fazer por especies (checkboxes)

  render() {
    return (
      <div className="search">
        <h1>Search pets</h1>
        <div className="checkBoxesContainer">
          <h3>Species:</h3>
          <div className="checkBoxes">
            {this.renderSpecies(this.props.species)}
          </div>
        </div>
        <button onClick={() => {
          this.setState({
            showAddtionalOptions: !this.state.showAddtionalOptions,
            selectedBreeds: []
          }
        )}}>
          {this.state.showAddtionalOptions ? "Hide specific breeds" : "Show specific breeds"}
        </button>
        {this.renderAddtionalSearchOptions()}
        <button className= "searchButton" onClick={() => {
          console.log("clicked");
          }
        }>Search</button>
      </div>
    );
  }

}

function mapStateToProps(state){
  return {species: state.species};
}

export default connect(mapStateToProps, null)(Search);
