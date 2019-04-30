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
  onClick = (event) =>{
    const options = {
      method: 'post',
      credentials: 'include',
      headers: {
        'content-type': 'application/json',
        'accept': 'application/json'
      },
      body: JSON.stringify({user: this.state})
    }
    fetch(`http://localhost:3000/api/v1/auth`,options)
    .then(resp=> {
      console.log(this.state)
      resp.json()})
  }


  render(){
    return(
      <Container>
        <Form >
          <Header size='large'>Login</Header>
          <Form.Input icon='user' iconPosition='left' label='Email' placeholder='Email' name='email' onChange={this.onChange} required/>
          <Form.Input icon='lock' iconPosition='left' label='Password' type='password' name='password' onChange={this.onChange} required/>
          <Button onClick={()=>this.props.login({auth: this.state})}>Login</Button>
        </Form>
        <Button positive as="a" href={"/"}>Not a berry yet? Sign Up</Button>
      </Container>
    )
  }
}

export default LogIn