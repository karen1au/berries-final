import React, { Component } from 'react'

// import Auth from '../services/Auth'
// import { ActionCable } from 'react-actioncable-provider';

class UserContainer extends Component {
  
  render() { 
    
    console.log(this.props.users[0]);

    return(
      <div className="ui-card">
        <div className="image"></div>
          <img src="https://robohash.org/deseruntquossuscipit.png?size=300x300&set=set1" />
        <div/>
        <div className="content">
          <a className="header">Albert</a>
          <div className="meta">
            <span className="date">Joined in 2013</span>
          </div>
          <div className="description">
            <p>
            Volutpat ac tincidunt vitae semper quis lectus nulla at volutpat. Sem viverra aliquet eget sit amet tellus cras. 
            Interdum consectetur libero id faucibus nisl tincidunt. Tellus at urna condimentum mattis pellentesque id. 
            Fames ac turpis egestas integer eget aliquet nibh. Faucibus nisl tincidunt eget nullam non.
            </p>
          </div>
          <div className="description">
            Bassist
          </div>
          <div className="description">
            Genres - Punk, Rock, Metal
          </div>
        </div>
        <div className="extra content">
          <a>
            <i className="user icon"></i>
            Total Jams: 22
          </a>
        </div>
        <div>
          <a href="https://soundcloud.com/hoodasaurus">Soundcloud</a> 
          <a href="https://www.youtube.com/">Youtube</a> 
        </div>  
      </div>
    )
  }
}

export default UserContainer