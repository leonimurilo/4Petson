import React, { Component } from 'react';
import {connect} from 'react-redux';
import _ from "lodash";
import Select from 'react-select';

import './styles.sass';

class Search extends Component {
  constructor(props){
    super(props);
    this.state = {
      options: [
        { value: 'one', label: 'One' },
        { value: 'two', label: 'Two' },
        { value: 'three', label: 'Three' }
      ]
    }
  }

  logChange(val) {
  console.log("Selected: " + JSON.stringify(val));
}

  renderRaces(races){
      return _.map(races, race => {
        console.log(race.name);
        return (
          <div key={race.id} className="raceOption">
            <input type="checkbox" name={race.id} value={race.id} checked={true}/>
            <label htmlFor={race.id}>{race.name}</label>
          </div>
        );
      });
    }

  render() {
    return (
      <div>
        <h1>Search pets</h1>
        <div className="checkBoxesContainer">
          <h3>Races:</h3>
          {this.renderRaces(this.props.races)}
        </div>
        <Select
        name="form-field-name"
        multi={true}
        options={this.state.options}
        onChange={this.logChange}
        />
      </div>
    );
  }

}

function mapStateToProps(state){
  return {races: state.races}
}

export default connect(mapStateToProps, null)(Search);
