import React, { Component } from 'react'
import GenreSearch from './GenreSearch'
import InstrumentSearch from './InstrumentSearch'
import CommitmentSearch from './CommitmentSearch'
import ExperienceSearch from './ExperienceSearch'
import { Segment, Container, Form } from 'semantic-ui-react'

class SearchContainer extends Component {

  render() {
    return (
      <div>
        <Container className="search-container">
          <GenreSearch handleSelection={this.props.handleSelection} /> 
          <CommitmentSearch handleSelection={this.props.handleSelection} /> 
          <InstrumentSearch handleSelection={this.props.handleSelection} /> 
          <ExperienceSearch handleSelection={this.props.handleSelection} /> 
        </Container> 
      </div>
    )
  }
}

export default SearchContainer