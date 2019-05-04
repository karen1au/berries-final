import React from 'react';
import { Segment, Grid, Button } from 'semantic-ui-react'
import { ActionCable } from 'react-actioncable-provider';
import NewMessageForm from './NewMessageForm';
import Auth from '../services/Auth';
import Moment from 'react-moment';

class ChatsList extends React.Component {
  state = {
    current_user: Auth.getCookie(),
    chats: [],
    chat_users: [],
    activeChat: null,
    messages: []
  };

  componentDidMount = () => {
    fetch(`http://localhost:3000/api/v1/chats?user=${this.state.current_user}`)
      .then(res => res.json())
      .then(chats => {
        this.setState({ chats },(() => {
          console.log("all chats", this.state.chats)
          // this.displayChat(this.state.chats)
        }))
      })
  };

  handleClick = id => {
    this.setState({ activeChat: id });
  };

  handleReceivedChats = res => {
    // re-render chat list if user is in chat page
      fetch(`http://localhost:3000/api/v1/chats?user=${this.state.current_user}`)
      .then(res => res.json())
      .then(chats => {
        console.log('chat refetched',chats)
        this.setState({ chats })
        })
    
  };

  displayChat = (chatsid) => {
    fetch(`http://localhost:3000/api/v1/chats/${chatsid}`)
    .then(res => res.json())  
    .then(users => {
      console.log('chat users are:',users)
      this.setState({chat_users: users})
      })
  }

  handleReceivedMessage = res => {
    fetch(`http://localhost:3000/api/v1/messages?chat=${this.state.activeChat}`)
    .then(res => res.json())  
    .then(msg => {
      this.setState({messages: msg})
      console.log("MESSAGE REFETCHED",this.state.messages)
      })
  };
  
  displayMessage = (chatID) => {
    event.preventDefault();
    this.setState({activeChat: chatID},(()=>{
    fetch(`http://localhost:3000/api/v1/messages?chat=${chatID}`)
    .then(res => res.json())  
    .then(msg => {
      this.setState({messages: msg})
      console.log("this is messages",this.state.messages)
      })
    }))
  }

  renderChats = (chatlist) => {
    const container = [];
    const allchats = chatlist
    const entries = Object.entries(allchats)
    for (const [allchat, count] of entries){
      container.push(
        <Button onClick={() => this.displayMessage(allchat)} name={allchat}>
        <h4>{allchat}</h4>
        {count.map((user)=> <p>{user}</p>)}
        </Button>
      )
      } return container;
    }

    findRelationship = () => {
      
    }
            
          
        

  render = () => {
    const { chats, activeChat } = this.state;


    let show_msg;
    if (!activeChat) {
      show_msg = <h3>Pick a Jar</h3>
    } else {
      (!this.state.messages.length) ?
      show_msg = <div><h3>There is no message yet...</h3></div> :
      show_msg = this.state.messages.map((msg) => { 
      return (
         <div id={msg[0]}>
         <span>{msg[1]}:{msg[2]}</span>
         <span><Moment fromNow>{msg[3]}</Moment></span>
         <div ref={(el)=> el && el.scrollIntoView({ behavior: "smooth" })}></div>
         </div>
      )}
       )
      }
    
    return (
      <div className="chatsList">
        <ActionCable
          channel={{ channel: 'ChatsChannel', current_user: this.state.current_user }}
          onReceived={(res) => this.handleReceivedChats(res)} />
        <ActionCable
          channel={{ channel: 'MessagesChannel', current: this.state.current_user }}
          onReceived={(res) => this.handleReceivedMessage(res)} />
        <Grid columns='equal' divided rows='equal'>
          <Grid.Row stretched>
        <Grid.Column>
        <h2>Chats</h2>
        {this.renderChats(chats)}

        </Grid.Column>
        {this.state.activeChat
        ? <Grid.Column width={12}>
          <Segment>
            <Button></Button>
            {show_msg}
          </Segment>
          
          <NewMessageForm chat={this.state.activeChat}/> 
          </Grid.Column>
        : <Grid.Column width={12}>
          <h3>Pick a Jar</h3>
          </Grid.Column>}
          </Grid.Row>
        </Grid>
      </div>
    );
  };
}

export default ChatsList;

