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

  componentDidMount() {
    // console.log(this.props.handleSelection);
    // console.log(this.state)
  }

  handleChange = (selectedOption) => {
    this.setState({ selectedOption }, () => { this.props.handleSelection('band', selectedOption) });
    // console.log('Option selected:', selectedOption);
  }

  render() {
    const { selectedOption } = this.state;
    return (
      <div className="search-item">
      <h4>I am looking for:</h4>
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