import React, { Component } from 'react'

class UsersContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      users: []
    }
  }
  
  componentDidMount() {
    fetch('http://localhost:3000/api/v1/users.json')
    .then(res => res.json())
    .then(user => {
      console.log(user)
      this.setState({
        users: user
      })
    })
  }

  render() {
    return (
      <div>
        {this.state.users.map((user) => {
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