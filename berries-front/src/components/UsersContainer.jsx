import React, { Component } from 'react'
import { Button } from 'semantic-ui-react'

class UsersContainer extends Component {
  constructor() {
    super();
    this.state = {
      sender_id: "this.props.current_user",
      receiver_id: "",
      type: ""
    }
  }

  componentDidUpdate() {
    this.props['data-cableApp'].notification = this.props['data-cableApp'].cable.subscriptions.create(
      {channel:'NotificationsChannel', notification: this.state}, {
        received: (data) => {
          console.log("received notification",data)
        }
      })
  }

  render() {
    return (
      <div>

        <table>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Commitment</th>
            <th>Location</th>  
            <th>Genre</th> 
          </tr>
          <tbody>
            {this.props.users.map((user) => {
              return(
                <div key={user.id}>
                  <tr>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.commitment}</td>
                    <td>{user.location}</td>
                    <td><Button onMouseOver={()=>this.setState({receiver_id: user.id, type:"jam request"})}
                    onClick={(e) => this.props.handleSelectedUser(e, this.state)} >Jam!</Button></td>
                  </tr>
                </div>
              )
            })}
          </tbody>
        </table>



      </div>
    )
  }
}

export default UsersContainer