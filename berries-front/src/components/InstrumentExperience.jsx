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
    instrument: '',
    experience: ''
  }

  onChange = (e, { name, value }) => {
    console.log(e.target, value)
    this.setState({ [name]: value }, () => console.log('STATE', this.state))
  }

  onClick = () => {
    this.props.addInstrument(this.state.instrument, this.state.experience)
    this.setState({instrument: '', experience: ''})
  }

  render() { 
    
    return (
    <div>
      <Form.Group widths='equal'>
        <Form.Field control={Select} label='Instrument' name='instrument' options={instrumentOptions} placeholder='Instrument' onChange={this.onChange}/>
        <Form.Field control={Select} label='Years of Experience' name='experience' options={experienceOptions} placeholder='Years of Experience' onChange={this.onChange}/>
        <Button onClick={this.onClick}>Add</Button>
      </Form.Group>
      <ul>
        {this.props.instruments.map((instrument, index) => { 
          return (
            <li key={index}> {instrument.name} - {instrument.experience}</li>
            )
          })}
        </ul>
   </div>
    )
  }      
}

export default InstrumentExperience