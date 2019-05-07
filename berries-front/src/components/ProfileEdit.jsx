import React, { Component } from 'react'
import { Form, Button, Container, Image, Input, Radio, Select, Segment, Modal } from 'semantic-ui-react'
import InstrumentExperience from './InstrumentExperience';
import UserGenres from './UserGenres';

class ProfileEdit extends Component{
  state = { 
    user: {},
    genre: [],
    instrument: [],
    modal: false
  }

  componentDidMount() {
    fetch(`http://localhost:3000/api/v1/users/${this.props.current_user}`)
    .then(res => res.json())
    .then(user => {
      console.log(user);
      this.setState({ user })
    })
  }

  toggleStatus = (e, { value }) => {
    this.setState({ user: {...this.state.user, band: value}}, () => console.log(this.state))
  }

  onChange = (e, { name, value }) => {
    this.setState({ user: {...this.state.user, [name]: value }}, () => console.log('STATE', this.state))
  }

  onGenreChange = (e, { name, value }) => {
    this.setState({[name]: value }, () => console.log('STATE', this.state))
  }

  addInstrument = (name, years) => {
    const newInstrument = {
      name: name,
      experience: years
    }
    this.state.instrument.push(newInstrument);
  }

  deleteInstrument = (index) => {
    this.state.instrument.splice(index, 1)
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
    console.log(this.props.current_user)
    fetch(`http://localhost:3000/api/v1/users/${this.props.current_user}`, options)
    .then(this.setState({modal: true}), () => console.log(this.state))
  }

  render(){
    
    console.log(this.state);

    const commitmentOptions = [
      { key: 'c', text: 'Casual Jam', value: 'causal jam' },
      { key: 'o', text: 'Formal Jam', value: 'formal jam' }
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

    return(
      <Container >  
        <h2 style={{ color: "#4F072C"}}>Update Your Berries Profile</h2>        
        {/* {this.state.errors && <Message negative>{this.state.errorMessage}</Message>} */}
        <Form >
          <Segment className="profile">
            <h3 style={{ color: "#4F072C"}}>Personal Information</h3>
            <Image size="small" src={this.state.user.avatar}/>
            <br/>
            <Form.Input label='Avatar URL' defaultValue={this.state.user.avatar} placeholder='Change your avatar' name='avatar' onChange={this.onChange} />
            <Form.Input label='Name' defaultValue={this.state.user.name} placeholder='Enter your name' name='name' required onChange={this.onChange} />
            <Form.Input label='Email' defaultValue={this.state.user.email} placeholder='Email' name='email' required onChange={this.onChange }/>
            <Form.Input label='Password' defaultValue={this.state.user.password} placeholder='Password' type='password' name='password' onChange={this.onChange} />
            <Form.Input label='Confirm Password' defaultValue={this.state.user.password_confirmation} placeholder='Re-enter Password' type='password' name='password_confirmation' onChange={this.onChange} />
            <Form.Input label='Location' defaultValue={this.state.user.location} placeholder='Enter your address / city' name='location' required onChange={this.onChange} />
            <Form.Input label='Description' defaultValue={this.state.user.description} placeholder='Tell us about yourself!' name='description' onChange={this.onChange} />
          </Segment>
          <Segment className="profile">
          <h3 style={{ color: "#4F072C"}}>Musical Background</h3>
            <h5>Are you an individual musician or a band?</h5>
            <Form.Group inline>
            <Form.Field >
              <Radio
                label='Individual Musician'
                name='radioGroup'
                value={false}
                checked={!this.state.user.band}
                onChange={this.toggleStatus}
              />
            </Form.Field>
            <Form.Field >
              <Radio
                label='Band'
                name='radioGroup'
                value={true}
                checked={this.state.user.band}
                onChange={this.toggleStatus}
              />
            </Form.Field>
            </Form.Group>
              <Form.Field control={Select} defaultValue={this.state.user.commitment} label='What are you looking for?' name='commitment' options={commitmentOptions} placeholder='Commitment' onChange={this.onChange} />
              <Form.Field control={Select} label='Add your genres' name='genre' fluid multiple selection options={genreOptions} placeholder='Genre' onChange={this.onGenreChange}/>
              <UserGenres current_user={this.props.current_user}/>
              <h4>Add your instruments</h4>
              <h5>Individuals please add the instruments you play.  Bands please add the instruments you need.</h5>           
              <InstrumentExperience addInstrument={this.addInstrument} deleteInstrument={this.deleteInstrument} instruments={this.state.instrument}/> 
            <h4>Add your music</h4>
            <Form.Group widths='equal'>
              <Form.Field control={Input} defaultValue={this.state.user.soundcloud} label='Soundcloud Username' placeholder='soundcloud.com/' name='soundcloud' onChange={this.onChange} />
              <Form.Field control={Input} defaultValue={this.state.user.youtube} label='YouTube Username' placeholder='youtube.com/' name='youtube' onChange={this.onChange} />
            </Form.Group>
          </Segment>
          <Modal trigger={<Button className="profile" onClick={this.onClick}>Update Profile</Button>}>
            <Modal.Header>Profile Updated!</Modal.Header>
            <Modal.Content>
              <Button className="profile" href='/'>Start Searching For Jams!</Button>
            </Modal.Content>
          </Modal> 
        </Form>
        {/* {this.state.redirect && <Redirect to={"/"} />} */}
      </Container>
    )
  }
}

export default ProfileEdit