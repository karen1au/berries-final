import React, { Component } from 'react'
import GenreSearch from './GenreSearch'
import InstrumentSearch from './InstrumentSearch'
import CommitmentSearch from './CommitmentSearch'
import ExperienceSearch from './ExperienceSearch'

class SearchContainer extends Component {

  render() {
    return (
      <div>
        <GenreSearch handleSelection={this.props.handleSelection} /> 
        <InstrumentSearch handleSelection={this.props.handleSelection} />
        <CommitmentSearch handleSelection={this.props.handleSelection} />
        <ExperienceSearch handleSelection={this.props.handleSelection} />
      </div>
    )
  }
}

export default SearchContainer