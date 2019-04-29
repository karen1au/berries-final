import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import UsersContainer from './components/UsersContainer'
import SearchContainer from './components/search/SearchContainer'
import $ from 'jquery'

class App extends Component {
  constructor() {
    super();
    this.state = {
      users: [],
      currentCommitment: '',
      currentInstrument: '',
      currentGenre: ''
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
      this.setState({ currentCommitment : value }, () => {console.log(this.state.currentCommitment)})
    } else if (key === 'instrument') {
      this.setState({ currentInstrument : value})
    } else if (key === 'genre') {
      this.setState({ currentGenre : value })
    }
  }

  queryResults = () => {
    fetch('http://localhost:3000/api/v1/users/search?q=' + this.state.currentCommitment.value)
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
