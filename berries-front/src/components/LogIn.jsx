import React, { Component } from 'react'
import { Header, Form, Button, Container} from 'semantic-ui-react'

class LogIn extends Component{
  state = {
    email: "",
    password: ""
  }

  onChange = (event) =>{
    this.setState({
      [event.target.name]:event.target.value
    })
  }


  render(){
    return(
      <Container>
        <Form onSubmit={(e) => this.props.handleLogInSubmit(e, this.state)} >
          <Header size='large'>Login</Header>
          <Form.Input icon='user' iconPosition='left' label='Email' placeholder='Email' name='email' onChange={this.onChange} required/>
          <Form.Input icon='lock' iconPosition='left' label='Password' type='password' name='password' onChange={this.onChange} required/>
          <Button type='submit'>Login</Button>
        </Form>
        <Button positive as="a" href={"/"}>Not a berry yet? Sign Up</Button>
      </Container>
    )
  }
}

export default LogIn