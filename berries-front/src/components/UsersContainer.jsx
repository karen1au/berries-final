import { Button, Container, Header, Image } from 'semantic-ui-react'
import React, { Component } from 'react'
import Auth from '../services/Auth'
import UserContainer from './UserContainer'
// import { ActionCable } from 'react-actioncable-provider';

class UsersContainer extends Component {
  constructor() {
    super();
    this.state = {
      sender: Auth.getCookie(),
      receiver: "",
      noti_type:""
    }
  }
  
  onChange = (event) =>{
    this.setState({
      receiver: event.target.name,
      noti_type: "jam request"
    })
  }
  
  handleConnectClick = (e, data) => {
    e.preventDefault();
    const options = {
      method: 'post',
      headers: {
        'content-type': 'application/json',
        'accept': 'application/json'
      },
      body: JSON.stringify(data)
    }
    
    fetch(`http://localhost:3000/api/v1/notifications`, options)
    .then(res => {
      this.setState({
        receiver: ""
      })
    })
    .catch(err => console.log(err))
  }

  render() {
    return (
      <div>

        {this.props.users.map(user => {
          return( 
            
            <Container>
              
              <Header as='h2'>{user.name}</Header>
              <Header as='h3'>{user.location}</Header>
              <Image size='small' wrapped src={user.avatar}/>
              
              <Button inverted color='red' 
              name={user.id}
              onMouseOver={this.onChange}
              onClick={(e) => this.handleConnectClick(e, this.state)}
              >jam</Button>

              <UserContainer user={user}/>

            </Container>
            
          )
        })}        

      </div>
    )
  }
}

export default UsersContainer