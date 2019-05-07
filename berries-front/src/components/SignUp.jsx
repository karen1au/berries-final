import React, { Component } from 'react'
import { Header, Divider, Form, Button, Message, Segment, Grid, Image} from 'semantic-ui-react'

class SignUp extends Component{
  state = {
    band: false,
    email: "",
    password: "",
    password_confirmation: ""
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
      <div className="background-img">
      <div className="signup-form">

      <style>{`
        body > div,
        body > div > div,
        body > div > div > div.login-form {
          height: 100%;
        }
      `}
    </style>
     <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header style={{ color: "#4F072C"}}size='huge' textAlign='center'>BERRIES</Header>
        <Header size='medium'>Find your jam today♭</Header>
        <Form size='large' onSubmit={(e) => this.props.handleSignUpSubmit(e, this.state)}>
          <Segment stacked>
          <Form.Input icon='mail' iconPosition='left' placeholder='Email' name='email' onChange={this.onChange} required/>
          <Form.Input icon='lock' iconPosition='left' placeholder='password' type='password' name='password' onChange={this.onChange} required/>
          <Form.Input icon='lock' iconPosition='left' placeholder='Enter password again' type='password' name='password_confirmation' onChange={this.onChange} required/>
          <Button className="signup-btn" type='submit'>Submit</Button>
          </Segment>
        </Form>
        <Divider horizontal>Or</Divider>
        <Message className="login-msg">Already a berry? <span><a href={"/login"} style={{color:"#4F072C"}}>&nbsp;Login</a></span></Message>
      </Grid.Column>
      </Grid>
      </div>
      </div>
    )
  }
}

export default SignUp