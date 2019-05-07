import Auth from '../services/Auth'
import React, { Component } from 'react'
import UserContainer from './UserContainer'
// import { ActionCable } from 'react-actioncable-provider';
import { Button, Container, Divider, Grid, Header, Image, Popup, Segment } from 'semantic-ui-react'

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

            <div>

              <Grid columns={2} centered divided padded>
                <Grid.Row>
                  <Grid.Column width={2}>
                    <Image bordered circular size='medium' wrapped src={user.avatar}/>
                  </Grid.Column>
                  
                  <Grid.Column width={4}>
                    <Header as='h3'>{user.name}</Header>
                    <p>{user.description}</p>
                    <UserContainer user={user}/>
                    <Popup 
                      trigger={
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
                  </Grid.Column>
                </Grid.Row>
              </Grid>

              <Divider style={{ "width": "60%", "margin": "auto" }}/>

            </div>
          )
        })}        

      </div>
    )
  }
}

export default UsersContainer