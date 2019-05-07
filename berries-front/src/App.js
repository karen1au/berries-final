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
import { timingSafeEqual } from 'crypto';
import UserContainer from  './components/UserContainer'
import { createHashHistory } from 'history'

class App extends Component {
  constructor() {
    super();
    this.state = {
      auth: Auth.isUserAuthenticated(),
      genres: [],
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
      signup: false,
      friendOptions: []
    } 
  }

  componentDidMount() {
    fetch(`http://localhost:3000/api/v1/users?user=${this.state.current_user}`)
    .then(res => res.json())
    .then(users => {
      this.setState({
        users: users,
      }, (() => {
        if (this.state.current_user) {
          this.loadNotifications();
        }
      }))
    })

    fetch(`http://localhost:3000/api/v1/chats?user=${this.state.current_user}`)
    .then(res => res.json())
    .then(chats => {
      let chatKey = {};
      Object.keys(chats).map( chatID => {
        chatKey[chatID] = false
      })
      this.setState({ ...this.state, chats: chats, chatKey }
        ,(() => {
        console.log("all chats", this.state)
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
    let chatKey = {};
    Object.keys(chats).map( chatID => {
      chatKey[chatID] = false
    })
    this.setState({ ...this.state, chats: chats, chatKey }
      ,(() => {
      console.log("all chats", this.state)
    }))
  })
}


  
  //action cable
  handleReceivedChats = res => {
    this.setState({ chats: [...this.state.chats, res] })
  };

  handleReceivedMessage = res => {
    console.log('message response: ', res);
    console.log('message chatid: ', res[0][4]);
    console.log('actual chatid: ', this.state.activeChat);
    if (res[0][4] == this.state.activeChat){
      let newMsg = this.state.messages
      newMsg.push(res[0])
      this.setState({messages: newMsg})
    } 
    if (this.state.chatKey.hasOwnProperty(res[0][4]) && this.props.activeChat !== res[0][4]){
      this.setState({ ...this.state, chatKey: { [res[0][4]]: true}}, () => console.log("received msg state",this.state))
    }
  }

  displayMessage = (chatID) => {
    event.preventDefault();
    this.setState({activeChat: chatID},(()=>{
    fetch(`http://localhost:3000/api/v1/messages?chat=${chatID}`)
    .then(res => res.json())  
    .then(msg => {
      this.setState({messages: msg, chatKey: {chatID: false}})
      console.log(this.state.messages)
      this.getFriendList(this.state.activeChat, this.state.current_user)
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
    console.log(fullURL)
    return fullURL;
  }

  queryResults = () => {
    console.log('hello')
    fetch(this.createURL())
    .then(res => res.json())
    .then(user => {
      this.setState({
        users: user,
      })
    })
  }

  //User Authentication
  handleSignUpSubmit = (e, data) => {
    e.preventDefault();
    const history = createHashHistory()
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
        current_user: Auth.getCookie(),
        signup: true
      })
      // console.log(this.state)
    })
    .catch(err => console.log(err))
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

  grabUserID = (e) => {
    let name = e.target.name
    console.log('user id:', name);
    this.setState({
      user: name
    }, () => {
      console.log(this.state.user)
    })
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
    event.preventDefault();
    const options = {
      method: 'post',
      headers: {
        'content-type': 'application/json',
        'accept': 'application/json'
      },
      body: JSON.stringify({user1_id: this.state.current_user, user2_id: senderID})
    }
    fetch(`http://localhost:3000/api/v1/relationships`, options)
    .then(()=>{
      console.log(`clicked accept, user1:, ${this.state.current_user},user2: ${senderID}` )
      this.loadNotifications();
      })
    .then(() => { this.postNotification(this.state.current_user, senderID)})
        // .then( res => console.log('initial notification posted'))
  }

  postNotification = (sender, receiver) => {
    const options = {
      method: 'post',
      headers: {
        'content-type': 'application/json',
        'accept': 'application/json'
      },
      body: JSON.stringify({sender: sender, receiver: receiver, noti_type: "new message" })
    }
    fetch(`http://localhost:3000/api/v1/notifications`,options)
  }

  categorizeNoti = (noti) => {
    noti.map((noti) => {
      if (noti[2] == "jam request"){
        this.setState(prevState => ({ jam_request: true, notifications: [...prevState.notifications, noti]}))
      }
      if (noti[2] == "new message"){
        if (this.state.chatKey.hasOwnProperty(noti[4])){
          this.setState({ ...this.state, chatKey: { [noti[4]]: true}}, () => console.log("after msg",this.state))
          this.setState(prevState => ({new_message: true, notifications: [...prevState.notifications, noti]}))
        }
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

    //Chat options
  leaveChat = (chatID) => {
    const options = {
      method: 'delete',
      headers: {
        'content-type': 'application/json',
        'accept': 'application/json'
      },
      body: JSON.stringify({chat_id: chatID, user_id: this.state.current_user})
    }
    fetch(`http://localhost:3000/api/v1/bye`, options)
    .then(() => {
      this.setState({activeChat: null})
      this.getChats()
    })
  }

  getFriendList = (chatID, userID) => {
    fetch(`http://localhost:3000/api/v1/chat_users?chat=${chatID}&user=${userID}`)
    .then(res => res.json())
    .then(users => {
      console.log("received options:", users)
      this.setState({friendOptions: users})
    })
  }

  addUser = (selectedUser) => {
    const options = {
      method: 'post',
      headers: {
        'content-type': 'application/json',
        'accept': 'application/json'
      },
      body: JSON.stringify({user: selectedUser, chat: this.state.activeChat})
    }
    fetch(`http://localhost:3000/api/v1/chat_users`,options)
    .then(()=> {
      this.postNotification(this.state.current_user, selectedUser);
      this.getChats()
    })
  }
  

  render() {
    return (
      <BrowserRouter>
        <div>
        
          <Route path="/" render={() => <Nav  
              handleLogOut={this.handleLogOut} 
              onAccept={this.onAccept}
              onRefuse={this.onRefuse}
              openNoti={this.openNoti}
              openChat={this.openChat}
              handleNotifications={this.handleNotifications}
              jam_request={this.state.jam_request}
              new_message={this.state.new_message}
              notifications={this.state.notifications}
              current_user={this.state.current_user}/>
          }/>
          
          <Switch>

            <Route path="/users/:id" 
              render={() => (this.state.auth)
                ? <ProfileEdit current_user={this.state.current_user}/> 
                : <SignUp handleSignUpSubmit={this.handleSignUpSubmit}/> }/> 
            <Route exact path="/"
              render={() => {
                if (this.state.signup === true) {
                  console.log(this.state)
                  return <ProfileEdit current_user={this.state.current_user}/>}
                else if (this.state.auth) {
                  return <Home 
                      cable={this.props.cable}
                      grabUserID={this.grabUserID} 
                      users={this.state.users} 
                      queryResults={this.queryResults} 
                  handleSelection={this.handleSelection}/> }
                else {
                  return <SignUp handleSignUpSubmit={this.handleSignUpSubmit}/> }}}/>
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
                handleReceivedMessage={this.handleReceivedMessage}
                leaveChat={this.leaveChat}
                addUser={this.addUser}
                friendOptions={this.state.friendOptions}
                chatKey={this.state.chatKey}/>
              : <Redirect to='/'/>}/>
            <Route component={Error}/>

        </Switch>


      </div>

      </BrowserRouter>
    );  
  }

}


export default App;
