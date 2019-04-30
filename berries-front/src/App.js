import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect} from "react-router-dom";
import './App.css';
import LogIn from './components/LogIn';
import Error from './components/Error'
import Home from './components/Home'
import SignUp from './components/SignUp'
import Nav from './components/Nav'
import Auth from './services/Auth'


class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      auth: Auth.isUserAuthenticated()
      
    }
  }

  handleSignUpSubmit = (e, data) => {
    e.preventDefault();
    const options = {
      method: 'post',
      headers: {
        'content-type': 'application/json',
        'accept': 'application/json'
      },
      body: JSON.stringify({user: data})
    }
    fetch(`http://localhost:3000/api/v1/users`,options)
    .then(res => res.json())
    .then( res => {
      Auth.authenticateToken(res.token);
      this.setState({
        auth: Auth.isUserAuthenticated()
      })
    }).catch(err => console.log(err))
  }

  handleLogInSubmit = (e, data) => {
    e.preventDefault();
    const options = {
      method: 'post',
      headers: {
        'content-type': 'application/json',
        'accept': 'application/json'
      },
      body: JSON.stringify(data)
    }
    fetch(`http://localhost:3000/api/v1/login`,options)
    .then(res => res.json())
    .then( res => {
      Auth.authenticateToken(res.token);
      this.setState({
        auth: Auth.isUserAuthenticated()
      })
    }).catch(err => console.log(err))
  }

  handleLogOut = () => {
    const options = {
      method: 'delete',
      headers: {
        token: Auth.getToken(),
        'Authorization': `Token ${Auth.getToken()}`
      }
    }
    fetch(`http://localhost:3000/api/v1/logout`,options)
    .then(res => {
      Auth.deauthenticateToken();
      this.setState({
        auth: Auth.isUserAuthenticated()
      })
    }).catch(err => console.log(err))
  }

  render() {
    return (
      <BrowserRouter>
        <div>
        
          <Route path="/" render={() => <Nav handleLogOut={this.handleLogOut}/>} />
          <Switch>
          <Route exact path="/"
            render={() => (this.state.auth)
              ? <Home/>
              : <SignUp handleSignUpSubmit={this.handleSignUpSubmit}/> }/>
          <Route path="/login" 
            render={() => (this.state.auth)
            ? <Redirect to='/'/>
            : <LogIn handleLogInSubmit={this.handleLogInSubmit}/>} />
          <Route component={Error}/>
        </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
