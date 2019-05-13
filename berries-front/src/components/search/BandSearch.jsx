import React, { Component } from 'react'
import Select from 'react-select'

const options = [   
  { value: true, label: 'band' },
  { value: false, label: 'individual musician' },
]

class BandSearch extends Component {
  state = {
    selectedOption: null
  }

  handleChange = (selectedOption) => {
    this.setState({ selectedOption }, () => { this.props.handleSelection('band', selectedOption) });
  }

  render() {
    const { selectedOption } = this.state;
    return (
      <div className="search-item">
        <h4>I am looking for a...</h4>
          <Select
          value={selectedOption}
          onChange={this.handleChange}
          options={options}
          isClearable
          />
      </div>
    )
  }
}

export default BandSearch