import React, { Component } from 'react'
import GenreSearch from './GenreSearch'
import BandSearch from './BandSearch'
import CommitmentSearch from './CommitmentSearch'
import ExperienceSearch from './ExperienceSearch'
import InstrumentSearch from './InstrumentSearch'
import { Segment, Container, Form } from 'semantic-ui-react'

class SearchContainer extends Component {

  render() {
    return (
      <div>
        <h2 className="search-header">Find Your Jam ♭</h2>
        <br/>
        <Container className="search-container">
          <BandSearch handleSelection={this.props.handleSelection} />
          <InstrumentSearch handleSelection={this.props.handleSelection} /> 
          <ExperienceSearch handleSelection={this.props.handleSelection} />           
          <GenreSearch handleSelection={this.props.handleSelection} /> 
          <CommitmentSearch handleSelection={this.props.handleSelection} /> 
        </Container> 
          <button 
            style={{ 
              "width": "10%", 
              "display": "block", 
              "margin": "2% auto 5% auto" 
            }} 
            className="home ui button" type="submit" 
            onClick={this.props.queryResults}
          >
            Search
          </button>
      </div>
    )
  }
}

export default SearchContainer