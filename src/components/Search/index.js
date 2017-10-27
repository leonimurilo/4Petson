import React, { Component } from 'react';
import {connect} from 'react-redux';
import _ from "lodash";
import Select from 'react-select';

import './styles.sass';

class Search extends Component {
  constructor(props){
    super(props);
    this.state = {
      breedsTest: [
        { value: '1', label: 'super dog', specie: "dog"},
        { value: '2', label: 'golden', specie: "dog" },
        { value: '3', label: 'cat uhu', specie: "cat" }
      ]
    }
    this.handleSelectChange = this.handleSelectChange.bind(this);
  }

  handleSelectChange(value) {
      console.log('You have selected: ', value);
      this.setState({ value });
    }


  renderSpecies(species){
      return _.map(species, specie => {
        console.log(specie.name);
        return (
          <div key={specie.id} className="specieOption">
            <input type="checkbox" name={specie.id} value={specie.id} checked={true}/>
            <label htmlFor={specie.id}>{specie.name}</label>
          </div>
        );
      });
    }

  render() {
    return (
      <div>
        <h1>Search pets</h1>
        <div className="checkBoxesContainer">
          <h3>Species:</h3>
          {this.renderSpecies(this.props.species)}
        </div>
        <Select
        name="form-field-name"
        placeholder="Select your favourite(s)"
        value={this.state.value}
        multi
        options={this.state.breedsTest}
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
