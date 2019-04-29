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
      currentCommitment: 'test commitment'
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

  handleSelection = (selection) => {
    this.setState({currentCommitment: selection})
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to Berries</h2>
        </div>
        <SearchContainer handleSelection={this.handleSelection}/>
        <UsersContainer users={this.state.users}/>
      </div>
    );
  }
}

export default App;
