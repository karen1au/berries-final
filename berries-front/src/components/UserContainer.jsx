import React, { Component } from 'react'

// import Auth from '../services/Auth'
// import { ActionCable } from 'react-actioncable-provider';

class UserContainer extends Component {

  render() {  
    return(
      <div className="ui-card">
        <div class="image"></div>
          <img src="https://robohash.org/deseruntquossuscipit.png?size=300x300&set=set1" />
        <div/>
        <div className="content">
          <a className="header">Albert</a>
          <div className="meta">
            <span className="date">Joined in 2013</span>
          </div>
          <div className="description">
            Bassist - Punk, Rock, Metal
          </div>
        </div>
        <div className="extra content">
          <a>
            <i className="user icon"></i>
            Total Jams: 22
          </a>
        </div>  
      </div>
    )
  }
}

export default UserContainer