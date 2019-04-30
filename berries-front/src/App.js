import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import UsersContainer from './components/UsersContainer'
import SearchContainer from './components/search/SearchContainer'

class App extends Component {
  constructor() {
    super();
    this.state = {
      users: [],
      parameters: {
        currentCommitment: null,
        currentInstrument: null,
        currentGenre: null,
        currentExperience: null
      }
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

  handleSelection = (key, value) => {
    if (key === 'commitment') {
      this.setState({ parameters: {...this.state.parameters, currentCommitment: value} })
    } else if (key === 'instrument') {
      this.setState({ parameters: {...this.state.parameters, currentInstrument: value} })
    } else if (key === 'genre') {
      this.setState({ parameters: {...this.state.parameters, currentGenre: value} })
    } else if (key === 'experience') {
      this.setState({ parameters: {...this.state.parameters, currentExperience: value} })
    }
  }

  createURL = (object = this.state.parameters) => {
    console.log(object)
    let i = 1;
    let fullURL = 'http://localhost:3000/api/v1/users/search?'
    for (let prop in object) {

      if (object[prop] && i === 1) {
        fullURL += `${prop}=${object[prop].value}`
        i += 1 
   
      } else if (object[prop]) {
        fullURL += `&${prop}=${object[prop].value}`
        i += 1 

      }
    }
    fullURL = fullURL.replace(/ /g, '%20')
    console.log(fullURL)
    return fullURL;
  }

  queryResults = () => {
    fetch(this.createURL())
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
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to Berries</h2>
        </div>
        <SearchContainer handleSelection={this.handleSelection}/>
        <button type="submit" onClick={this.queryResults}>Submit</button>
        <UsersContainer users={this.state.users}/>
      </div>
    );
  }
}

export default App;
