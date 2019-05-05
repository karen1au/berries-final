import React, { Component } from 'react'
import { Form, Button, Select } from 'semantic-ui-react'

const instrumentOptions = [
  { key: '1', text: 'electric guitar', value: 'electric guitar' },
  { key: '2', text: 'drums', value: 'drums' },
  { key: '3', text: 'percussion', value: 'percussion' },
  { key: '4', text: 'bass', value: 'bass' },
  { key: '5', text: 'vocals', value: 'vocals' },
  { key: '6', text: 'acoustic guitar', value: 'acoustic guitar' },
  { key: '7', text: 'keyboard', value: 'keyboard' },
  { key: '8', text: 'violin', value: 'violin' },
  { key: '9', text: 'trumpet', value: 'trumpet' },
  { key: '10', text: 'saxophone', value: 'saxophone' },
  { key: '11', text: 'synthesizer', value: 'synthesizer' }
]

const experienceOptions = [
  { key: '1', text: '0-2', value: '0-2' },
  { key: '2', text: '2-4', value: '2-4' },
  { key: '3', text: '4-6', value: '4-6' },
  { key: '4', text: '6-8', value: '6-8' },
  { key: '5', text: '8-10', value: '8-10' },
  { key: '6', text: '10+', value: '10+' }
]

class InstrumentExperience extends Component {
  state = {
    instruments: [{
      name: '',
      experience: ''
    }]
  }

  addPair = () => {
    this.setState(prevState => ({
      instruments: [...prevState.instruments, { name: '', experience: '' }]
    }))
  }

  deletePair = (event, instrument) => {
    let instruments = [...this.state.instruments];
    instruments.splice(instrument.index, 1);
    this.setState({ instruments }, () => console.log(this.state.instruments));
    this.props.deleteInstrument(instrument.index);
  }

  createUI = () => {
    return this.state.instruments.map((instrument, index) => (
      <div key={index}>
        <Form.Group widths='equal'>
          <Form.Field control={Select} index={index} label='Instrument' name='name' options={instrumentOptions} placeholder='Instrument' onChange={this.onChange}/>
          <Form.Field control={Select} index={index} label='Years of Experience' name='experience' options={experienceOptions} placeholder='Years of Experience' onChange={this.onChange}/>
          <Button index={index} onClick={this.deletePair}>Delete</Button>
        </Form.Group>
      </div>
    ))
  }

  onChange = (event, instrument) => {
    const { name, value } = instrument;
    let instruments = [...this.state.instruments];
    instruments[instrument.index] = {...instruments[instrument.index], [name]: value};

    this.setState({ instruments }, () => console.log('STATE', this.state));
  }

  onClick = () => {
    const lastEntry = this.state.instruments[this.state.instruments.length - 1]
    this.props.addInstrument(lastEntry.name, lastEntry.experience)
    this.addPair()
  }

  render() { 
    
    return (
      <div>
        {this.createUI()}
        <Button onClick={this.onClick}>Add Instrument</Button>
        {this.props.instruments.map((instrument, index) => { 
          return (
            <p key={index}> {instrument.name} - {instrument.experience}</p>
          )
        })}
      </div>
    )
  }      
}

export default InstrumentExperience