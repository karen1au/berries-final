import React, { Component } from 'react'
import Select from 'react-select'

const options = [
  { value: '0-2', label: '0-2' },
  { value: '2-4', label: '2-4' },
  { value: '4-6', label: '4-6' },
  { value: '6-8', label: '6-8' },
  { value: '8-10', label: '8-10' },
  { value: '10+', label: '10+' },
]

class ExperienceSearch extends Component {
  state = {
    selectedOption: null
  }

  handleChange = (selectedOption) => {
    this.setState({ selectedOption }, () => { this.props.handleSelection('experience', selectedOption) });
  }

  render() {
    const { selectedOption } = this.state;
    return (
      <div className="search-item">
      <h4>For these many years...</h4>
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

export default ExperienceSearch