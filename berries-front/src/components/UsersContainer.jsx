import { Button } from 'semantic-ui-react'
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
    fetch(`http://localhost:3000/api/v1/notifications`,options)
    .then( res => {
      this.setState({
        receiver: ""
      })})
    .catch(err => console.log(err))
    
  }

  render() {
    return (
      <div>

        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Commitment</th>
              <th>Location</th>  
              <th>Genre</th> 
            </tr>
          </thead>
          <tbody>
            
            {this.props.users.map((user) => {
              return(
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.commitment}</td>
                  <td>{user.location}</td>
                  <td>
                    <Button inverted color='red' 
                      name={user.id}
                      onMouseOver={this.onChange}
                      onClick={(e) => this.handleConnectClick(e, this.state)}>jam</Button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>



      </div>
    )
  }
}

export default UsersContainer