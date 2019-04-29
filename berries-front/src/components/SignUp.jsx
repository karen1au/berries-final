import React, { Component } from 'react'
import { Header, Divider, Form, Button, Message, Segment, Grid} from 'semantic-ui-react'

class SignUp extends Component{
  state = {
    email: "",
    password: "",
    password_confirmation: "",
    // errors: false,
    // errorMessage: '',
    // redirect: false
  }

  onChange = (event) =>{
    this.setState({
      [event.target.name]:event.target.value
    })
  }
  onClick = (event) =>{
    const options = {
      method: 'post',
      headers: {
        'content-type': 'application/json',
        'accept': 'application/json'
      },
      body: JSON.stringify({user: this.state})
    }
    fetch(`http://localhost:3000/api/v1/users`,options)
    .then(resp=> {
      console.log(this.state)
      resp.json()})
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
    return(
      <Segment placeholder>
        <Grid columns={2} stackable textAlign='center'>
      {this.state.errors && <Message negative>{this.state.errorMessage}</Message>}
        <Divider vertical>Or</Divider>
        <Grid.Row verticalAlign='middle'>
        <Grid.Column>
        <Form >
        <Header size='large'>Sign Up</Header>
          <Form.Input icon='user' iconPosition='left' label='Email' placeholder='Email' name='email' onChange={this.onChange} required/>
          <Form.Input icon='lock' iconPosition='left' label='Password' type='password' name='password' onChange={this.onChange} required/>
          <Form.Input label='Confirm Password' placeholder='Enter password again' type='password' name='password_confirmation' onChange={this.onChange} required/>
          <Button onClick={this.onClick}>Submit</Button>
        </Form>
        </Grid.Column>
        <Grid.Column>
        <Form >
        <Header size='large'>Login</Header>
          <Form.Input icon='user' iconPosition='left' label='Email' placeholder='Email' name='email' onChange={this.onChange} required/>
          <Form.Input icon='lock' iconPosition='left' label='Password' type='password' name='password' onChange={this.onChange} required/>
          <Button onClick={this.onClick}>Submit</Button>
        </Form>
        </Grid.Column>
        </Grid.Row>
        {/* {this.state.redirect && <Redirect to={"/"} />} */}
        </Grid>
        </Segment>
    )
  }
}

export default SignUp