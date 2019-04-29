import React, { Component } from 'react'
import Select from 'react-select'

const options = [
  { value: 'casual jam', label: 'casual jam' },
  { value: 'ongoing jam', label: 'ongoing jam' },
]

class CommitmentSearch extends Component {
  state = {
    selectedOption: null
  }

  componentDidMount() {
    console.log(this.props.handleSelection);
    console.log(this.state)
  }

  handleChange = (selectedOption) => {
    this.setState({ selectedOption }, () => { this.props.handleSelection('commitment', selectedOption) });
    console.log('Option selected:', selectedOption);
  }

  render() {
    const { selectedOption } = this.state;
    return (
      <div>
        <Select
          value={selectedOption}
          onChange={this.handleChange}
          options={options}
        />
      </div>
    )
  }
}

export default CommitmentSearch