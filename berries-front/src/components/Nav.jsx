import React, { Component } from 'react'
import { Button, Icon, Popup, Grid } from 'semantic-ui-react'
import { ActionCable } from 'react-actioncable-provider';
import Auth from '../services/Auth';

class Nav extends Component {


  state = {
    current_user: Auth.getCookie(),
    jam_request: false,
    new_message: false,
  }

  componentDidMount() {
    this.props.getChats()
  }

  categorizeNoti = (noti) => {
    noti.map((noti) => {
    if (noti[2] == "jam request"){
      this.setState(prevState => ({ jam_request: true, notifications: [...prevState.notifications, noti]}))
    }
    if (noti[2] == "new message"){
      this.setState(prevState => ({new_message: true, notifications: [...prevState.notifications, noti]}))
    }
  })
}

  handleNotifications = (res) => {
    // console.log("this is notification for karen",res)
    this.categorizeNoti(res)
    // this.setState({request: true, notifications: res})
  }

  openNoti = () => {
    event.preventDefault();
    this.setState({jam_request: false})
  }

  openChat = () => {
    this.setState({new_message: false})
    console.log("clicked chat button")
  }

  refuse = (id) => {
    this.props.onRefuse(id);
  }

  accept = (event) => {
    event.preventDefault();
    const receiver = event.target.name;
    const options = {
      method: 'post',
      headers: {
        'content-type': 'application/json',
        'accept': 'application/json'
      },
      body: JSON.stringify({user1_id: this.state.current_user, user2_id: event.target.name})
    }
    fetch(`http://localhost:3000/api/v1/relationships`, options)
    .then(()=>{
      fetch(`http://localhost:3000/api/v1/notifications?user=${this.state.current_user}`)
      .then(res => res.json())
      .then(notis => {
        this.setState({
          notifications: notis
        })
      })
      .then( () => {
        const options = {
          method: 'post',
          headers: {
            'content-type': 'application/json',
            'accept': 'application/json'
          },
          body: JSON.stringify({sender: this.state.current_user, receiver: event.target.name, noti_type: "new message" })
        }
        fetch(`http://localhost:3000/api/v1/notifications`,options)
          .then( res => console.log('chat notification posted'))
      })
    })
  }



  render(){
    let jam;
    if(this.state.jam_request) {
      jam = "red"
    } else {
      jam = "black"
    }
    let message;
    if(this.state.new_message) {
      message = "red"
    } else {
      message = "black"
    }

    let noti_list;
    if (this.props.notifications.length > 0){
      noti_list = this.props.notifications.map((notification) => {
        if(notification[2] == "jam request"){
        return (
        <Grid.Row textAlign='left' key={notification[0]}>
          <span><b>{notification[1]}</b>would like to Jam with you!</span>
          <Button icon name={notification[3]} onClick={this.accept}><Icon name='check'/></Button>
          <Button icon name={notification[0]} onClick={() => this.props.onRefuse(notification[0])}>
            <Icon name='close'/>
          </Button>
      </Grid.Row>
      )}
      })} else {
        noti_list = <span>You don't have notifications yet...</span>
      }

      let navElement;
      (Auth.getToken())?
      navElement = 
      <div className="nav-btn">
      <Button positive as="a" href={"/"}>Home</Button>
      <Button onClick={this.props.handleLogOut}>Logout</Button>
      <Button basic color={message} onClick={this.openChat} as="a" href={"/chats"}>Chat</Button>
      <Button positive as="a" href={`/users/${this.state.current_user}`}>Profile</Button>
      <div className="notification-group">
      <Popup trigger={<Button basic color={jam} onClick={this.openNoti}>Jam Request</Button>} on='click' >
      {noti_list}
      </Popup></div>
      </div>
      : navElement = <Button positive as="a" href={"/login"}>Login</Button>

    return (
      <div>
        <ActionCable  channel={{ channel: 'NotificationsChannel', current_user: this.state.current_user}}
            onReceived={(res) => this.handleNotifications(res)}/>
      {navElement}
      </div>
    )
    }
}
export default Nav