import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import UsersContainer from './components/UsersContainer'
import SignUp from './components/SignUp';

class App extends Component {
  render() {
    return (
      <div className="App">
          <h2>Welcome to Berries</h2>
          <SignUp />
          <UsersContainer />
      </div>
    );
  }
}

export default App;
