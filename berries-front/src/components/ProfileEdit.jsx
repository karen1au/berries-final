import React, { Component } from 'react'
import { Form, Button, Container, Input, Radio, Message, Redirect, Select, FormGroup } from 'semantic-ui-react'
import InstrumentExperience from './InstrumentExperience';

class ProfileEdit extends Component{
  state = { 
    user: {
    // errors: false,
    // errorMessage: '',
    // redirect: false
    },
    genre: [],
    instrument: []
    
  }

  componentDidMount() {
    console.log('test');
    fetch('http://localhost:3000/api/v1/users/1')
    .then(res => res.json())
    .then(user => {
      console.log(user)
      this.setState({
        user }, () => console.log(this.state))
    })
  }

  toggleChange = (e, { value }) => this.setState({ user: {...this.state.user, band: value}}, () => console.log(this.state))

  onChange = (e, { name, value }) => {
    console.log(e.target, value)
    this.setState({ user: {...this.state.user, [name]: value }}, () => console.log('STATE', this.state))
  }

  onGenreChange = (e, { name, value }) => {
    console.log('name', name, 'value', value)
    this.setState({[name]: value }, () => console.log('STATE', this.state))
  }

  addInstrument = (name, years) => {
    const newInstrument = {
      name: name,
      experience: years
    }
    this.state.instrument.push(newInstrument)
  }

  onClick = () =>{
    const options = {
      method: 'put',
      headers: {
        'content-type': 'application/json',
        'accept': 'application/json'
      },
      body: JSON.stringify({ user: this.state.user, genre: this.state.genre, instrument: this.state.instrument })
    }
    console.log('options body', options.body)
    fetch(`http://localhost:3000/api/v1/users/1`, options)
    .then(res => res.json())
    .then(console.log(this.state))
  }

  // handleResponse = (resp) => {
  //   if (resp.status === 400){
  //     this.setState({errors: true, errorMessage: resp.messages[0]})
  //   } else if (resp.status === 200){
  //     this.props.logIn({auth: {email: this.state.email, password:this.state.password}})
  //     this.setState({redirect:true})
  //   }
  // }

  render(){ 
    const commitmentOptions = [
      { key: 'c', text: 'Casual Jam', value: 'causal jam' },
      { key: 'o', text: 'Ongoing Jam', value: 'ongoing jam' }
    ]
    const genreOptions = [
      { key: '1', text: 'African', value: 'african' },
      { key: '2', text: 'Blues', value: 'blues' },
      { key: '3', text: 'Classical', value: 'classical' },
      { key: '4', text: 'Country', value: 'country' },
      { key: '5', text: 'Electronic', value: 'electronic' },
      { key: '6', text: 'Hip-Hop', value: 'hip-hop' },
      { key: '7', text: 'Latin', value: 'latin' },
      { key: '8', text: 'Pop', value: 'pop' },
      { key: '9', text: 'R&B', value: 'r&b' },
      { key: '10', text: 'Reggae', value: 'reggae' },
      { key: '11', text: 'Religious', value: 'religious' },
      { key: '12', text: 'Rock', value: 'rock' },
      { key: '13', text: 'Punk', value: 'punk' },
      { key: '14', text: 'Metal', value: 'metal' },
      { key: '15', text: 'Jazz', value: 'jazz' },
      { key: '16', text: 'Funk', value: 'funk' },
      { key: '17', text: 'Soul', value: 'soul' },
      { key: '18', text: 'Dance', value: 'dance' }
    ]

    const instrumentOptions = [
      { key: '1', text: 'electric guitar', value: 'electric guitar' },
      { key: '2', text: 'drums', value: 'drums' },
      { key: '3', text: 'percussion', value: 'percussion' },
      { key: '4', text: 'bass', value: 'bass' },
      { key: '5', text: 'vocals', value: 'electronic' },
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

    return(
      <Container>          
        {this.state.errors && <Message negative>{this.state.errorMessage}</Message>}
        <Form >
        <img class="ui small circular image" src={this.state.user.avatar}/>
          <Form.Group inline>
            <Form.Field>
              <Radio
                label='Band'
                name='radioGroup'
                value={true}
                checked={this.state.user.band}
                onChange={this.toggleChange}
              />
            </Form.Field>
            <Form.Field>
              <Radio
                label='Individual'
                name='radioGroup'
                value={false}
                checked={!this.state.user.band}
                onChange={this.toggleChange}
              />
            </Form.Field>
          </Form.Group>
            <Form.Input label='Name'  defaultValue={this.state.user.name} placeholder='Enter your name' name='name' required onChange={this.onChange}/>
            <Form.Input label='Email' defaultValue={this.state.user.email} placeholder='Email' name='email' required onChange={this.onChange}/>
            <Form.Input label='Password'  defaultValue={this.state.user.password} placeholder='Password' type='password' name='password' onChange={this.onChange}/>
            <Form.Input label='Confirm Password' defaultValue={this.state.user.password_confirmation} placeholder='Password' type='password' name='password_confirmation' onChange={this.onChange}/>
            <Form.Input label='Location' defaultValue={this.state.user.location} placeholder='Enter your address / city' name='location' required onChange={this.onChange} />
            <Form.Field control={Select} defaultValue={this.state.genre} label='Genre' name='genre' fluid multiple selection options={genreOptions} placeholder='Genre' onChange={this.onGenreChange}/>            
            <Form.Field control={Select} defaultValue={this.state.user.commitment} label='Commitment' name='commitment' options={commitmentOptions} placeholder='Commitment' onChange={this.onChange}/>
            <InstrumentExperience addInstrument={this.addInstrument} instruments={this.state.instrument}/> 
          <Form.Group widths='equal'>
            {/* <div class="ui labeled input">
              <div class="ui label">
                http://www.soundcloud.com/
              </div> */}
            <Form.Field control={Input} defaultValue={this.state.user.soundcloud} label='Soundcloud' placeholder='username' name='soundcloud' onChange={this.onChange}/>
            {/* </div>
            <div class="ui labeled input">
              <div class="ui label">
                http://www.youtube.com/
              </div> */}
            <Form.Field control={Input} defaultValue={this.state.user.youtube} label='Youtube' placeholder='username' name='youtube' onChange={this.onChange}/>
            {/* </div> */}
          </Form.Group>
          <Button onClick={this.onClick}>Update Profile</Button>
        </Form>
        {this.state.redirect && <Redirect to={"/"} />}
      </Container>
    )
  }
}

export default ProfileEdit