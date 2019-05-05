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
import UserContainer from  './components/UserContainer'

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
      notifications: [],
      chats: [],
      chat_users: [],
      activeChat: null,
      messages: [],
      jam_request: false,
      new_message: false,
    } 
  }

  componentDidMount() {
    fetch(`http://localhost:3000/api/v1/users?user=${this.state.current_user}`)
    .then(res => res.json())
    .then(users => {
      this.setState({
        users: users,
      }, (() => {
        console.log(this.state.users)
        if (this.state.current_user) {
          this.loadNotifications();
        }
      }))
    })
  }

  loadNotifications = () => {
    fetch(`http://localhost:3000/api/v1/notifications?user=${this.state.current_user}`)
      .then(res => res.json())
      .then(notis => {
        this.setState({
          notifications: notis
        })
        // console.log("Component did mount user_id:", Auth.getCookie())
      })
  }

 //For Chatlist 
  getChats = () => {
    fetch(`http://localhost:3000/api/v1/chats?user=${this.state.current_user}`)
    .then(res => res.json())
    .then(chats => {
      this.setState({ chats }
        ,(() => {
        console.log("all chats", this.state.chats)
        // this.displayChat(this.state.chats)
      }))
    })
  }
  //action cable
  handleReceivedChats = res => {
    console.log('chat response: ', res);
    this.setState({ chats: [...this.state.chats, res] })
    
  };

  handleReceivedMessage = res => {
    console.log('message response: ', res);
    // add res.message to end of state
    // pass down handleReceivedMessage from App.js and call this.props.handleReceivedMessage(res.message);
    // setState({ messages: [...this.state.messages, message]})
    // fetch(`http://localhost:3000/api/v1/messages?chat=${this.state.activeChat}`)
    // .then(res => res.json())  
    // .then(msg => {
    this.setState({messages: [...this.state.messages, res]})
      
    // console.log("MESSAGE REFETCHED",this.state.messages)
      
  };

  // handleClick = id => {
  //   this.setState({ activeChat: id });
  // };

  displayMessage = (chatID) => {
    event.preventDefault();
    this.setState({activeChat: chatID},(()=>{
    fetch(`http://localhost:3000/api/v1/messages?chat=${chatID}`)
    .then(res => res.json())  
    .then(msg => {
      this.setState({messages: msg})
      // console.log("this is messages",this.state.messages)
      })
    }))
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
    let fullURL = `http://localhost:3000/api/v1/users/search?user=${this.state.current_user}&`
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
    // console.log(fullURL)
    return fullURL;
  }

  queryResults = () => {
    console.log('hello')
    fetch(this.createURL())
    .then(res => res.json())
    .then(user => {
      // console.log(user)
      this.setState({
        users: user,
      })
    })
  }

//User Authentication
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
      // console.log(res)
      this.setState({
        auth: Auth.isUserAuthenticated(),
        current_user: Auth.getCookie()
      })
      // console.log(this.state)
    }).catch(err => console.log(err))
  }

  handleLogInSubmit = (e, data) => {
    e.preventDefault();
    // console.log("LOGIN", data)
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
        res.token ? Auth.authenticateToken(res.token) : null;
        res.user_id ? Auth.setCookie(res.user_id) : null;
        this.setState({
          auth: Auth.getToken(),
          current_user: Auth.getCookie()
        }, () => {
          this.loadNotifications();
        });
    })
    .catch(err => console.log(err))
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


  //Handling jam request
  onRefuse = (notiID) => {
    const options = {
      method: 'delete',
      headers: {
        'content-type': 'application/json',
        'accept': 'application/json'
      },
    }
    fetch(`http://localhost:3000/api/v1/notifications/${notiID}`, options)
      .then(()=>{
        this.loadNotifications();
      })
  }

  onAccept = (senderID) => {
    // event.preventDefault();
    const options = {
      method: 'post',
      headers: {
        'content-type': 'application/json',
        'accept': 'application/json'
      },
      body: JSON.stringify({user1_id: this.props.current_user, user2_id: senderID})
    }
    fetch(`http://localhost:3000/api/v1/relationships`, options)
    .then(()=>{
      this.loadNotifications();
      })
    .then( () => {
      const options = {
        method: 'post',
        headers: {
          'content-type': 'application/json',
          'accept': 'application/json'
        },
        body: JSON.stringify({sender: this.state.current_user, receiver: senderID, noti_type: "new message" })
      }
      fetch(`http://localhost:3000/api/v1/notifications`,options)
        .then( res => console.log('chat notification posted'))
    })
  }

  categorizeNoti = (noti) => {
    noti.map((noti) => {
      if (noti[2] == "jam request"){
        this.setState(prevState => ({ jam_request: true, notifications: [...prevState.notifications, noti]}))
      }
      if (noti[2] == "new message"){
        this.setState(prevState => ({new_message: true, notifications: [...prevState.notifications, noti]}))
      }
    })
  }
    handleNotifications = (res) => {
    console.log("this is notification",res)
    this.categorizeNoti(res)
  }

  openNoti = () => {
    event.preventDefault();
    this.setState({jam_request: false})
  }

  openChat = () => {
    this.setState({new_message: false})
    console.log("clicked chat button")
  }

  render() {
    return (
      <BrowserRouter>
        <div>
        
          <Route path="/" render={() => <Nav  
              handleLogOut={this.handleLogOut} 
              onAccept={this.onAccept}
              onRefuse={this.onRefuse}
              handleNotifications={this.handleNotifications}
              jam_request={this.state.jam_request}
              new_message={this.state.new_message}
              notifications={this.state.notifications}/>
          }/>
          
          <Switch>

            <Route path="/users/:id/show" render={() => <UserContainer users={this.state.users}/> } />

            <Route path="/users/:id" 
              render={() => (this.state.auth)
                ? <ProfileEdit current_user={this.state.current_user}/> 

                : <SignUp handleSignUpSubmit={this.handleSignUpSubmit}/> }/> 
            <Route exact path="/"
              render={() => (this.state.auth)
                ? <Home 
                    cable={this.props.cable} 
                    users={this.state.users} 
                    queryResults={this.queryResults} 
                    handleSelection={this.handleSelection}/>
                : <SignUp handleSignUpSubmit={this.handleSignUpSubmit}/> }/>
            <Route path="/login" 
              render={() => (this.state.auth)
              ? <Redirect to='/'/>
              : <LogIn handleLogInSubmit={this.handleLogInSubmit}/>} />
            <Route path="/chats" 
              render={() => (this.state.auth)
              ? <ChatsList current_user={this.state.current_user}
                  chats={this.state.chats}
                  messages={this.state.messages}
                  activeChat={this.state.activeChat}
                  displayMessage={this.displayMessage}
                  getChats={this.getChats}
                  handleReceivedChats={this.handleReceivedChats}
                  handleReceivedMessage={this.handleReceivedMessage}/>
              : <Redirect to='/'/>}/>
            <Route component={Error}/>

          </Switch>

        </div>
      </BrowserRouter>
    );  
  }

}


export default App;
