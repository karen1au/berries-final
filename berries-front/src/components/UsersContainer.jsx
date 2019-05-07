import Auth from '../services/Auth'
import React, { Component } from 'react'
import UserContainer from './UserContainer'
// import { ActionCable } from 'react-actioncable-provider';

import { Button, Container, Grid, Header, Image, Segment, Card } from 'semantic-ui-react'

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
=======
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
              <Button inverted color='red' 
                  name={user.id}
                  onMouseOver={this.onChange}
                  onClick={(e) => this.handleConnectClick(e, this.state)}
                  >Jam</Button>
                  <UserContainer user={user} onChange={this.onChange} handleConnectClick={this.handleConnectClick}
                  data={this.state}/>

              </Card.Content>
            </Card>
            
            // <Grid columns={2} centered divided padded>
            //   <Grid.Row>
            //     <Grid.Column width={4}>
            //       <Header as='h2'>{user.name}</Header>
            //       <Image size='small' wrapped src={user.avatar} circular/>
            //       <UserContainer user={user}/>
            //       <Button inverted color='red' 
            //       name={user.id}
            //       onMouseOver={this.onChange}
            //       onClick={(e) => this.handleConnectClick(e, this.state)}
            //       >Jam</Button>
            //     </Grid.Column>
                
            //     <Grid.Column width={4}>
            //       <Header as='h3'>{user.location}</Header>
            //       <p>{user.description}</p>
            //       {/* <Image size='small' wrapped src={user.avatar}/> */}
            //     </Grid.Column>
            //   </Grid.Row>
            // </Grid>
            
          )
        })}        
  </Card.Group>
  </Container>
      </div>
    )
  }
}

export default UsersContainer