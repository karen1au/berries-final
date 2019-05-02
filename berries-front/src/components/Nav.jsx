import React, { Component } from 'react'
import { Button} from 'semantic-ui-react'
import { ActionCable } from 'react-actioncable-provider';
import Auth from '../services/Auth';

class Nav extends Component {

state = {
  current_user: Auth.getCookie()
}

handleNotifications = (res) => {
  console.log("this is notification for karen",res)
}

render(){
  return (
    <div>
      <ActionCable  channel={{ channel: 'NotificationsChannel', current_user: this.state.current_user}}
          onReceived={(res) => this.handleNotifications(res)}/>
      <Button positive as="a" href={"/login"}>Login</Button>
      <Button onClick={this.props.handleLogOut}>Logout</Button>
      <Button positive as="a" href={"/chats"}>Chat</Button>
    </div>
  )
  }
}
export default Nav