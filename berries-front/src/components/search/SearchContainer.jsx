import React, { Component } from 'react'
import GenreSearch from './GenreSearch'
import InstrumentSearch from './InstrumentSearch'
import CommitmentSearch from './CommitmentSearch';

class SearchContainer extends Component {

  render() {
    return (
      <div>
        <GenreSearch /> 
        <InstrumentSearch />
        <CommitmentSearch handleSelection={this.props.handleSelection} />
        <button type="submit" onClick={this.queryResults}>Submit</button>
      </div>
    )
  }
}

export default SearchContainer