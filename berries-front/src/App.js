import React, { Component } from 'react';
import { BrowserRouter, Route, Switch} from "react-router-dom";
import './App.css';
import LogIn from './components/LogIn';
import Error from './components/Error'

class App extends Component {
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
