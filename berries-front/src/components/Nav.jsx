import React, { Component } from 'react'
import { Button, Icon, Popup, Grid, Menu, Container, Image } from 'semantic-ui-react'
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
          <span><Image size="mini" circular src={notification[4]}/><b>{notification[1]}</b> would like to Jam with you!</span>
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
        <Container id="nav">
          <Menu.Item as="a" href={"/"} style={{ color: 'white' }}>Home</Menu.Item>
          <Menu.Item as="a" href={`/users/${this.props.current_user}`} style={{ color: 'white' }} >Profile</Menu.Item>
          <Button color={message} onClick={this.props.openChat} as="a" href={"/chats"}>Chat</Button>
          <div className="notification-group">
          <Popup trigger={<Button style={{color: "red"}} onClick={this.props.openNoti}>Jam Request</Button>} on='click' >
          {noti_list}
          </Popup></div>
          <Menu.Item position="right" onClick={this.props.handleLogOut} style={{ color: 'white' }}>Logout</Menu.Item>
        </Container>
      : navElement = <Container><Menu.Item style={{ color: 'white' }} positive as="a" href={"/login"}>Login</Menu.Item></Container>

    return (
      <div>
        <ActionCable  channel={{ channel: 'NotificationsChannel', current_user: this.props.current_user}}
            onReceived={(res) => this.props.handleNotifications(res)}/>
      <Menu id="nav" size="large">

              {navElement}
            </Menu>
      </div>
    )
  }
}
export default Nav