import React, { Component } from 'react'
import { Button} from 'semantic-ui-react'

class Nav extends Component {
render(){
  return (
    <div>
      <Button positive as="a" href={"/login"}>Login</Button>
      <Button onClick={this.props.handleLogOut}>Logout</Button>
      <Button positive as="a" href={"/users/1"}>Profile</Button>
    </div>
  )
  }
}
export default Nav