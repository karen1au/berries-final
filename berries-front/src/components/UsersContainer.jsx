import React, { Component } from 'react'
class UsersContainer extends Component {

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
                    <td>{}</td>
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