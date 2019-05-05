import { Button, Container, Header, Image, Modal } from 'semantic-ui-react'
import React, { Component } from 'react'
import Auth from '../services/Auth'
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
              <Image size='small' wrapped src={user.avatar} />
              
              <Button inverted color='red' 
              name={user.id}
              onMouseOver={this.onChange}
              onClick={(e) => this.handleConnectClick(e, this.state)}
              >jam</Button>

              <Modal trigger={<Button>Show</Button>}>
                <Modal.Header>Select a Photo</Modal.Header>
                <Modal.Content image>
                  <Image wrapped size='medium' src={user.avatar}/>
                  <Modal.Description>
                    <Header>{user.name}</Header>
                    <p>{user.description}</p>
                    <p>Is it okay to use this photo?</p>
                  </Modal.Description>
                    <iframe id="sc-widget" src="https://w.soundcloud.com/player/?url=http://soundcloud.com/hoodasaurus&amp;color=AF0E49" width="100%" height="350" scrolling="no" frameborder="no"></iframe>
                    <iframe width="560" height="315" src="https://www.youtube.com/embed?listType=user_uploads&list=croutoncrackerjacks" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                </Modal.Content>
              </Modal>  
            </Container>
            
          )
        })}        

      </div>
    )
  }
}

export default UsersContainer

 {/* {this.props.users.map((user) => {
          return(
          
            <Button inverted color='red' 
              name={user.id}
              onMouseOver={this.onChange}
              onClick={(e) => this.handleConnectClick(e, this.state)}
            >jam</Button>
            
            <Modal trigger={<Button>Show</Button>}>
              <Modal.Header>Select a Photo</Modal.Header>
              <Modal.Content image>
                <Image wrapped size='medium' src={user.avatar} />
                <Modal.Description>
                  <Header>{user.name}</Header>
                  <p>{user.description}</p>
                  <p>Is it okay to use this photo?</p>
                </Modal.Description>
              </Modal.Content>
            </Modal>

          )
        })} */}