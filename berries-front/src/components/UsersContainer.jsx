import React, { Component } from 'react'

class UsersContainer extends Component {

  render() {
    return (
      <div>
        {this.props.users.map((user) => {
          return(
            <div key={user.id}>
              <h4>{user.name}</h4>
              <h4>{user.email}</h4>
            </div>
          )
        })}
      </div>
    )
  }
}

export default UsersContainer