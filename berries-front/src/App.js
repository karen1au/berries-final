import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect} from "react-router-dom";
import './App.css';
import LogIn from './components/LogIn';
import Error from './components/Error'
import Home from './components/Home'
import SignUp from './components/SignUp'
import ProfileEdit from './components/ProfileEdit'
import Nav from './components/Nav'
import Auth from './services/Auth'
import ChatsList from  './components/ChatsList'

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
      },
      current_user: Auth.getCookie(),
      notifications: []
    } 
  }

  componentDidMount() {

    fetch('http://localhost:3000/api/v1/users.json')
    .then(res => res.json())
    .then(user => {
      this.setState({
        users: user,
      },( () => {
      fetch(`http://localhost:3000/api/v1/notifications?user=${this.state.current_user}`)
      .then(res => res.json())
      .then(notis => {
        this.setState({
          notifications: notis
        })
      console.log("just logged in:", Auth.getCookie())
      })
    })
  )
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
        users: user,
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
      Auth.authenticateToken(res.token);
      Auth.setCookie(res.user_id);
      console.log(res)
      this.setState({
        auth: Auth.isUserAuthenticated(),
        current_user: Auth.getCookie()
      })
      console.log(this.state)
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
      (res.token)? Auth.authenticateToken(res.token) : null;
      (res.user_id)? Auth.setCookie(res.user_id) : null;
      this.setState({
        auth: Auth.getToken(),
        current_user: Auth.getCookie()
      });
      // console.log(Auth.isUserAuthenticated())
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
        
          <Route path="/" render={() => <Nav notifications={this.state.notifications} handleLogOut={this.handleLogOut}/>} />
          <Switch>
          <Route path="/users/:id" 
            render={() => (this.state.auth)
              ? <ProfileEdit current_user={this.state.current_user}/> 
              : <SignUp handleSignUpSubmit={this.handleSignUpSubmit}/> }/> 
          <Route exact path="/"
            render={() => (this.state.auth)
              ? <Home cable={this.props.cable}
              users={this.state.users} onClick={this.queryResults} handleSelection={this.handleSelection}/>
              : <SignUp handleSignUpSubmit={this.handleSignUpSubmit}/> }/>
          <Route path="/login" 
            render={() => (this.state.auth)
            ? <Redirect to exact path='/'/>
            : <LogIn handleLogInSubmit={this.handleLogInSubmit}/>} />
          <Route path="/chats" 
            render={() => (this.state.auth)
            ? <ChatsList current_user={this.state.current_user}/>
            : <Redirect to='/'/>}/>
          <Route component={Error}/>

        </Switch>

      </div>
      </BrowserRouter>
    );  
  }

}


export default App;
