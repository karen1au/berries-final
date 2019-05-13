import React, { Component } from 'react'
import { Header, Form, Button, Container, Grid, Segment, Divider, Message} from 'semantic-ui-react'

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
        <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header style={{ color: "#4F072C"}}size='huge' textAlign='center'>Welcome back!</Header>
            <Form size='large' onSubmit={(e) => this.props.handleLogInSubmit(e, this.state)}>
              <Segment stacked>
                <Form.Input icon='mail' iconPosition='left' placeholder='Email' name='email' onChange={this.onChange} required/>
                <Form.Input icon='lock' iconPosition='left' placeholder='password' type='password' name='password' onChange={this.onChange} required/>
                <Button className="login-btn" type='submit'>Submit</Button>
              </Segment>
            </Form>
            <Divider horizontal>Or</Divider>
            <Message className="login-msg">Still fresh? <span><a href={"/"} style={{color:"#4F072C"}}>&nbsp;SignUp today</a></span></Message>
          </Grid.Column>
        </Grid>
      </Container>
    )
  }
}

export default LogIn