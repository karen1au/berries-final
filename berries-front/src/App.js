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
      console.log('prop', prop);
      console.log('value', object[prop].value)
      if (object[prop] && i === 1) {
        fullURL += `q${i}=${object[prop].value}`
        i += 1 
        console.log('prop', prop);
      console.log('value', object[prop].value)
      } else if (object[prop]) {
        fullURL += `&q${i}=${object[prop].value}`
        i += 1 
        console.log('prop', prop);
      console.log('value', object[prop].value)
      }
    }
    fullURL = fullURL.replace(/ /g, '%20')
    console.log(fullURL)
    return fullURL;
  }

  queryResults = () => {
    // fetch('http://localhost:3000/api/v1/users/search?q1=' + this.state.currentCommitment.value + '&q2=' + this.state.currentGenre.value + '&q3=' + this.state.currentInstrument.value + '&q4=' + this.state.currentExperience.value)
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
