import React, { Component } from 'react'
import { Button, Icon, Popup, Grid, Header } from 'semantic-ui-react'
import { ActionCable } from 'react-actioncable-provider';
import Auth from '../services/Auth';

class Nav extends Component {

state = {
  current_user: Auth.getCookie(),
  jam_request: false,
  new_message: false,
  notifications: []
}

componentDidMount() {

  fetch(`http://localhost:3000/api/v1/notifications?user=${this.state.current_user}`)
  .then(res => res.json())
  .then(notis => {
    this.setState({
      notifications: notis
    }, () => {
      console.log('notifications', this.state.notifications)
    })
  })
}

handleNotifications = (res) => {
  console.log("this is notification for karen",res)
  this.setState({jam_request: true, notifications: res})
}

openNoti = () => {
  this.setState({jam_request: false})
}

render(){
  let noti_indicator;

  if(this.state.jam_request) {
    noti_indicator = <Button icon><Icon name='world' /></Button>
  }

  return (
    <div>
      <ActionCable  channel={{ channel: 'NotificationsChannel', current_user: this.state.current_user}}
          onReceived={(res) => this.handleNotifications(res)}/>
      <Button positive as="a" href={"/login"}>Login</Button>
      <Button onClick={this.props.handleLogOut}>Logout</Button>
      <Button positive as="a" href={"/chats"}>Chat</Button>
      <div className="notification-group">
      <Popup trigger={<Button onClick={() => this.openNoti()}>Show flowing popup</Button>} on='click' >
      {/* <Button>HI!{this.state.notifications}</Button> */}
      {this.state.notifications.map((noti) => {
        return (
        <Grid.Row textAlign='left'>
          <span><b>{noti[1]}</b>would like to Jam with you!</span>
          <Button icon><Icon name='check circle'/></Button>
      </Grid.Row>
        
      )
      })}
      </Popup>
      {noti_indicator}
      </div>
    </div>
  )
  }
}
export default Nav