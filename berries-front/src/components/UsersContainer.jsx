import React, { Component } from 'react'
import Auth from '../services/Auth'
class UsersContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      users: null,
      usersLoaded: false
    }
  }
  
  componentDidMount() {
    const options = {
      method: 'get',
      headers: {
        token: Auth.getToken(),
        'Authorization': `Token ${Auth.getToken()}`
      },
    }
    fetch('http://localhost:3000/api/v1/users', options)
    .then(res => res.json())
    .then(user => {
      console.log('hi!')
      this.setState({
        users: user,
        usersLoaded: true
      })
      console.log(this.state.users)
    }).catch(err => console.log(err))
  }

  render() {
    return (
      <div>
        <p>user container</p>
        {/* {this.state.users.map((user) => {
          return(
            <div key={user.id}>
              <h4>{user.name}</h4>
              <h4>{user.email}</h4>
            </div>
          )
        })} */}
      </div>
    )
  }
}

export default UsersContainer