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

  render(){
    return(
      <Segment placeholder>
        <Grid columns={2} stackable textAlign='center'>
      {this.state.errors && <Message negative>{this.state.errorMessage}</Message>}
        <Divider vertical>Or</Divider>
        <Grid.Row verticalAlign='middle'>
        <Grid.Column>
        <Form onSubmit={(e) => this.props.handleSignUpSubmit(e, this.state)}>
        <Header size='large'>Sign Up</Header>
          <Form.Input icon='user' iconPosition='left' label='Email' placeholder='Email' name='email' onChange={this.onChange} required/>
          <Form.Input icon='lock' iconPosition='left' label='Password' type='password' name='password' onChange={this.onChange} required/>
          <Form.Input label='Confirm Password' placeholder='Enter password again' type='password' name='password_confirmation' onChange={this.onChange} required/>
          <Button type='submit'>Submit</Button>
        </Form>
        </Grid.Column>
        <Grid.Column>
          <Button positive as="a" href={"/login"}>Login</Button>
        </Grid.Column>
        </Grid.Row>
        {/* {this.state.redirect && <Redirect to={"/"} />} */}
        </Grid>
        </Segment>
    )
  }
}

export default SignUp