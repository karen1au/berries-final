import Auth from '../services/Auth'
import React, { Component } from 'react'
import UserContainer from './UserContainer'
// import { ActionCable } from 'react-actioncable-provider';
import { Button, Container, Grid, Header, Image, Segment } from 'semantic-ui-react'

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
            
            <Grid columns={2} centered divided padded>
              <Grid.Row>
                <Grid.Column width={4}>
                  <Header as='h2'>{user.name}</Header>
                  <Image size='small' wrapped src={user.avatar}/>
                  <UserContainer user={user}/>
                  <Button inverted color='red' 
                  name={user.id}
                  onMouseOver={this.onChange}
                  onClick={(e) => this.handleConnectClick(e, this.state)}
                  >Jam</Button>
                </Grid.Column>
                
                <Grid.Column width={4}>
                  <Header as='h3'>{user.location}</Header>
                  <p>{user.description}</p>
                  {/* <Image size='small' wrapped src={user.avatar}/> */}
                </Grid.Column>
              </Grid.Row>
            </Grid>
            
          )
        })}        

      </div>
    )
  }
}

export default UsersContainer