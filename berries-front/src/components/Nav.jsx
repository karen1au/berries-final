import React, { Component } from 'react'
import { Button, Icon, Popup, Grid } from 'semantic-ui-react'
import { ActionCable } from 'react-actioncable-provider';
import Auth from '../services/Auth';

class Nav extends Component {


  state = {
    current_user: Auth.getCookie(),
    jam_request: false,
    new_message: false,
    notifications: this.props.notifications
  }

  componentDidMount() {
    fetch(`http://localhost:3000/api/v1/notifications?user=${this.state.current_user}`)
    .then(res => res.json())
    .then(notis => {
      this.setState({
        notifications: notis
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

  refuse = (event) => {
    event.preventDefault();
    const options = {
      method: 'delete',
      headers: {
        'content-type': 'application/json',
        'accept': 'application/json'
      },
    }
    fetch(`http://localhost:3000/api/v1/notifications/${event.target.name}`,options)
    .then(()=>{
      fetch(`http://localhost:3000/api/v1/notifications?user=${this.state.current_user}`)
      .then(res => res.json())
      .then(notis => {
        this.setState({
          notifications: notis
        })
      })
    })
  }

  accept = (event) => {
    event.preventDefault();
    const options = {
      method: 'post',
      headers: {
        'content-type': 'application/json',
        'accept': 'application/json'
      },
      body: JSON.stringify({user1_id: this.state.current_user, user2_id: event.target.name})
    }
    fetch(`http://localhost:3000/api/v1/relationships`,options)
    .then(()=>{
      fetch(`http://localhost:3000/api/v1/notifications?user=${this.state.current_user}`)
      .then(res => res.json())
      .then(notis => {
        this.setState({
          notifications: notis
        })
      })
    })
  }

  render(){
    let noti_indicator;
    if(this.state.jam_request) {
      noti_indicator = <Button icon><Icon name='world' /></Button>
    }

    let noti_list;
    if(this.state.notifications.length > 0){
      noti_list = this.state.notifications.map((noti) => {
        return (
        <Grid.Row textAlign='left' key={noti[0]}>
          <span><b>{noti[1]}</b>would like to Jam with you!</span>
          <Button icon name={noti[3]} onClick={this.accept}><Icon name='check'/></Button>
          <Button icon name={noti[0]} onClick={this.refuse}><Icon name='close'/></Button>
      </Grid.Row>
      )
      })} else {
        noti_list = <span>You don't have notifications yet...</span>
      }

    return (
      <div>
        <ActionCable  channel={{ channel: 'NotificationsChannel', current_user: this.state.current_user}}
            onReceived={(res) => this.handleNotifications(res)}/>
        <Button positive as="a" href={"/login"}>Login</Button>
        <Button onClick={this.props.handleLogOut}>Logout</Button>
        <Button positive as="a" href={"/chats"}>Chat</Button>
        <Button positive as="a" href={`/users/${this.state.current_user}`}>Profile</Button>
        <div className="notification-group">
        <Popup trigger={<Button onClick={this.openNoti}>Show flowing popup</Button>} on='click' >
        {noti_list}
        </Popup>
        {noti_indicator}
        </div>
      </div>
    )
    }
}
export default Nav