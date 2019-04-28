import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import UsersContainer from './components/UsersContainer'
import SearchContainer from './components/search/SearchContainer'

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to Berries</h2>
        </div>
        <SearchContainer />
        <UsersContainer />
      </div>
    );
  }
}

export default App;
