import React, { Component } from 'react'
import { Button, Icon, Popup, Grid } from 'semantic-ui-react'
import { ActionCable } from 'react-actioncable-provider';
import Auth from '../services/Auth';

class Nav extends Component {

  render(){
    let jam;
    if(this.props.jam_request) {
      jam = "red"
    } else {
      jam = "black"
    }
    let message;
    if(this.props.new_message) {
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
          <Button icon name={notification[3]} onClick={() => this.props.onAccept(notification[3])}><Icon name='check'/></Button>
          <Button icon name={notification[0]} onClick={() => this.props.onRefuse(notification[0])}>
            <Icon name='close'/>
          </Button>
      </Grid.Row>
      )}
      })} else {
        noti_list = <span>You don't have notifications yet...</span>
      }

      let navElement;
      (Auth.getToken()) ?
      navElement = 
        <div className="nav-btn">
        <Button positive as="a" href={"/"}>Home</Button>
        <Button onClick={this.props.handleLogOut}>Logout</Button>
        <Button basic color={message} onClick={this.openChat} as="a" href={"/chats"}>Chat</Button>
        <Button positive as="a" href={`/users/${this.props.current_user}`}>Profile</Button>
        <div className="notification-group">
        <Popup trigger={<Button basic color={jam} onClick={this.openNoti}>Jam Request</Button>} on='click' >
        {noti_list}
        </Popup></div>
        </div>
      : navElement = <Button positive as="a" href={"/login"}>Login</Button>

    return (
      <div>
        <ActionCable  channel={{ channel: 'NotificationsChannel', current_user: this.props.current_user}}
            onReceived={(res) => this.props.handleNotifications(res)}/>
      {navElement}
      </div>
    )
    }
}
export default Nav