import React, { Component } from 'react'
import Select from 'react-select'

const options = [   
  { value: 'casual jam', label: 'casual jam' },
  { value: 'formal jam', label: 'formal jam' },
]

class CommitmentSearch extends Component {
  state = {
    selectedOption: null
  }

  componentDidMount() {
    // console.log(this.props.handleSelection);
    // console.log(this.state)
  }

  handleChange = (selectedOption) => {
    this.setState({ selectedOption }, () => { this.props.handleSelection('commitment', selectedOption) });
    // console.log('Option selected:', selectedOption);
  }

  render() {
    const { selectedOption } = this.state;
    return (
      <div className="search-item">
      <h4>To have a...</h4>
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

export default CommitmentSearch