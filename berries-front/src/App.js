import React, { Component } from 'react';
import { BrowserRouter, Route, Switch} from "react-router-dom";
import './App.css';
import LogIn from './components/LogIn';
import Error from './components/Error'
import Home from './components/Home'

class App extends Component {
  constructor(props){
    super(props)

    this.state = {
      auth: {
        isLoggedIn: false,
        user: ''
      }
    }
  }
  render() {
    return (
      <BrowserRouter>
        <div>
        <Switch>
          <Route path="/" component={Home} exact/>
          <Route path="/login" component={LogIn}/>
          <Route component={Error}/>
        </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
