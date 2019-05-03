import React, { Component } from 'react'

class UserGenres extends Component {
  state = {
  }

  render() {
    
    return (
    <div>
      <ul>
        {this.props.genres.map((genre, index) => { 
          return (
            <li key={index}>{genre}</li>
          )
        })}
      </ul>
   </div>
    )
  }      
}

export default UserGenres