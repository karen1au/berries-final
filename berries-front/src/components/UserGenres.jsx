import React, { Component } from 'react'

class UserGenres extends Component {
  state = {
    genres: []
  }

  componentDidMount() {
    fetch(`http://localhost:3000/api/v1/genres/search/?user=${this.props.current_user}`)
    .then(res => res.json())
    .then(genre => {
      console.log(genre)
      let map = genre.map( g => {
        return g.name;
      })
      this.setState(
        {genres: map}, () => console.log(this.state))
    })
  }

  render() {
    
    return (
    <div>
      <ul>
        {this.state.genres.map((genre, index) => { 
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