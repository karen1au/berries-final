import Auth from '../services/Auth'
import React, { Component } from 'react'
import UserContainer from './UserContainer'
// import { ActionCable } from 'react-actioncable-provider';

import { Button, Container, Grid, Header, Image, Popup, Card } from 'semantic-ui-react'

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
        <Container>
        <Card.Group centered stackable itemsPerRow={5}>
        {this.props.users.map(user => {
          return(

            <Card color="grey" style={{margin: "2vw"}}>
              <Image src={user.avatar} wrapped ui={false} />
              <Card.Content>
                <Card.Header>{user.name}</Card.Header>
                <Card.Meta>
                  {user.commitment}
                </Card.Meta>
                <Card.Description>
                  {user.description}
                </Card.Description>
              </Card.Content>
              <Card.Content extra>
                <Popup trigger={
                  <Button inverted color='red' 
                          name={user.id}
                          onMouseOver={this.onChange}
                          onClick={(e) => this.handleConnectClick(e, this.state)}
                        >Jam</Button>    
                      }
                      content="Request sent!"
                      on="click"
                      position="right center"
                    />
                  <UserContainer user={user} onChange={this.onChange} handleConnectClick={this.handleConnectClick}
                  data={this.state}/>

              </Card.Content>
            </Card>
      
          )
        })}        
  </Card.Group>
  </Container>
      </div>
    )
  }
}

export default UsersContainer