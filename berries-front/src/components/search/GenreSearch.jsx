import React, { Component } from 'react'
import Select from 'react-select'

class GenreSearch extends Component {
  state = {
    selectedOption: null,
    genres: [],
    instruments: []
  }

  componentDidMount() {
    fetch('http://localhost:3000/api/v1/genres.json')
    .then(res => res.json())
    .then(genre => {
      const options = genre.map(g => {
      const map = {}
        map['value'] = g.name, map['label'] = g.name
        return map
      })
      this.setState({
        genres: options
      })
    })
  }

  handleChange = (selectedOption) => {
    this.setState({ selectedOption }, () => { this.props.handleSelection('genre', selectedOption) });
  }

  render() {
    const { selectedOption } = this.state;
    return (
      <div style={{"margin": "0 2%"}} className="search-item">
      <h4>In the style...</h4>
        <Select
          onChange={this.handleChange}
          options={this.state.genres}
          isClearable
          value={selectedOption}
        />
      </div>
    )
  }
}

export default GenreSearch