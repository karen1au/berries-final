import React, { Component } from 'react'
import GenreSearch from './GenreSearch'
import InstrumentSearch from './InstrumentSearch'

class SearchContainer extends Component {

  render() {
    return (
      <div>
        <GenreSearch />
        <InstrumentSearch />
      </div>
    )
  }
}

export default SearchContainer