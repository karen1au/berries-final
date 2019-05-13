import React, { Component } from 'react'
import Select from 'react-select'

class InstrumentSearch extends Component {
  state = {
    selectedOption: null,
    instruments: []
  }

  componentDidMount() {
    fetch('http://localhost:3000/api/v1/instruments.json')
    .then(res => res.json())
    .then(instrument => {
      const options = instrument.map(i => { 
      const map = {}
        map['value'] = i.name, map['label'] = i.name
        return map
      })
      this.setState({
        instruments: options
      })
    })
  }

  handleChange = (selectedOption) => {
    this.setState({ selectedOption }, () => { this.props.handleSelection('instrument', selectedOption) });
  }

  render() {
    const { selectedOption } = this.state;
    return (
      <div className="search-item">
      <h4>That plays/needs...</h4>
        <Select
          value={selectedOption}
          onChange={this.handleChange}
          options={this.state.instruments}
          isClearable
        />
      </div>
    )
  }
}

export default InstrumentSearch