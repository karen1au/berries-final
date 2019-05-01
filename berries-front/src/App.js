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
  constructor() {
    super();
    this.state = {
      auth: Auth.isUserAuthenticated(),
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
      console.log(res)
      Auth.authenticateToken(res.token);
      this.setState({
        auth: Auth.isUserAuthenticated()
      })
    }).catch(err => console.log(err))
  }

  handleLogInSubmit = (e, data) => {
    e.preventDefault();
    console.log("LOGIN", data)
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
      console.log("LOGIN RESP", res)
      Auth.authenticateToken(res.token);
      this.setState({
        auth: Auth.isUserAuthenticated()
      })
      var ws = new WebSocket("ws://localhost:3000/cable?token="+res.token)
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
              ? <Home users={this.state.users} onClick={this.queryResults} handleSelection={this.handleSelection}/>
              : <SignUp handleSignUpSubmit={this.handleSignUpSubmit}/> }/>
          <Route path="/login" 
            render={() => (this.state.auth)
            ? <Redirect to='/'/>
            : <LogIn handleLogInSubmit={this.handleLogInSubmit}/>} />
          <Route component={Error}/>
          {/* < Route path = "/jams/:id" render={(props)=>(
            < LineShowPage
              data-cableApp={this.props.cableApp}
              data-updateApp={this.updateAppStateLine}
              data-lineData={this.state.lineData}
              data-getLineData={this.getLineData}
              getLineData={this.getLineData}
              lineData={this.state.line}
              authData={this.state.auth}
            />
          )} /> */}
        </Switch>

      </div>
      </BrowserRouter>
    );  
  }

}


export default App;
