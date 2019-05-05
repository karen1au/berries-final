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
      this.setState({ genres: map })
    })
  }

  onDelete = (event) => {
    let genre = event.target.name
    let genres = [...this.state.genres];
    let filtered = genres.filter( genre => genre !== event.target.name );
    
    this.setState({ genres: filtered }, () => {
      
      const options = {
        method: 'delete',
        headers: {
          'content-type': 'application/json',
          'accept': 'application/json'
        }
      }

      fetch(`http://localhost:3000/api/v1/user_genres/${this.props.current_user}?genre=${genre}`, options)
        // .then(res => res.json())
        .then(console.log(this.state))
    });

  }

  render() {
    
    return (
      <div>
        <ul>
          {this.state.genres.map((genre) => { 
            return (
              <div key={genre}>
                <li>{genre}</li>
                <button 
                  class="ui button"
                  name={genre}
                  onClick={this.onDelete}>
                    Delete
                </button>    
              </div>  
            )
          })}
        </ul>
      </div>
    )
  }      
}

export default UserGenres