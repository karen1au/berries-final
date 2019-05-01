import React, { Component } from 'react'
import { Form, Button, Container, Input, Radio, Message, Redirect, Select } from 'semantic-ui-react'

class ProfileEdit extends Component{
  state = { 
    user: {
    // name: "",
    // email: "",
    // password: "",
    // password_confirmation: "",
    // avatar: "",
    // band: '',
    // location: "",
    // commitment: "",
    // soundcloud: "",
    // youtube: ""
    // errors: false,
    // errorMessage: '',
    // redirect: false
    }
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

  toggleChange = (e, { value }) => this.setState({ user: {...this.state.user, band: value} }, () => console.log(this.state))

  onChange = (event) =>{
    this.setState({
      [event.target.name]:event.target.value
    })
  } 

  onClick = (event) =>{
    const options = {
      method: 'put',
      headers: {
        'content-type': 'application/json',
        'accept': 'application/json'
      },
      body: JSON.stringify({ user: this.state })
    }
    console.log(options.body)
    fetch(`http://localhost:3000/api/v1/users/1`, options)
    .then(res => console.log(res.json()))
    // .then(this.handleResponse)
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
    const options = [
      { key: 'c', text: 'Casual Jam', value: 'causal jam' },
      { key: 'o', text: 'Ongoing Jam', value: 'ongoing jam' },
    ]
    return(
      <Container>
        {this.state.errors && <Message negative>{this.state.errorMessage}</Message>}
        <Form >
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
          <Form.Input label='Name' defaultValue={this.state.user.name} placeholder='Enter your name' name='name' required onChange={this.onChange}/>
          <Form.Input label='Email'defaultValue={this.state.user.email} placeholder='Email' name='email' required onChange={this.onChange}/>
          <Form.Input label='Password'  defaultValue={this.state.user.password} placeholder='Password' type='password' name='password' required onChange={this.onChange}/>
          <Form.Input label='Confirm Password' defaultValue={this.state.user.password_confirmation} placeholder='Password' type='password' name='password_confirmation' required onChange={this.onChange}/>
          <Form.Input label='Location' defaultValue={this.state.user.location} placeholder='Enter your address / city' name='location' required onChange={this.onChange} />
          <Form.Field control={Select} defaultValue={this.state.user.commitment} label='Commitment' options={options} placeholder='Commitment' onChange={this.onChange}/>
          <Form.Group widths='equal'>
          <Form.Field control={Input} defaultValue={this.state.user.soundcloud} label='Soundcloud' placeholder='username' name='soundcloud' onChange={this.onChange}/>
          <Form.Field control={Input} defaultValue={this.state.user.youtube} label='Youtube' placeholder='username' name='youtube' onChange={this.onChange}/>
          </Form.Group>
          <Button onClick={this.onClick}>Submit</Button>
        </Form>
        {this.state.redirect && <Redirect to={"/"} />}
      </Container>
    )
  }
}

export default ProfileEdit