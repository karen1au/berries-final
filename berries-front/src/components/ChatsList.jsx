import React from 'react';
import { Segment, Grid, Button } from 'semantic-ui-react'
import { ActionCable } from 'react-actioncable-provider';
import NewMessageForm from './NewMessageForm';
import Moment from 'react-moment';

class ChatsList extends React.Component {
  // state = {
  //   current_user: Auth.getCookie(),
  //   chats: [],
  //   chat_users: [],
  //   activeChat: null,
  //   messages: []
  // };

  componentDidMount() {
    this.props.getChats()
  }


  renderChats = (chatlist) => {
    const container = [];
    const allchats = chatlist
    const entries = Object.entries(allchats)
    for (const [allchat, count] of entries){
      container.push(
        <Button onClick={() => this.props.displayMessage(allchat)} name={allchat}>
        <h4>{allchat}</h4>
        {count.map((user)=> <p>{user}</p>)}
        </Button>
      )
      } return container;
    }


  render = () => {

    let show_msg;
    if (!this.props.activeChat) {
      show_msg = <h3>Pick a Jar</h3>
    } else {
      (!this.props.messages.length) ?
      show_msg = <div><h3>There is no message yet...</h3></div> :
      show_msg = this.props.messages.map((msg) => { 
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
          channel={{ channel: 'ChatsChannel', current_user: this.props.current_user }}
          onReceived={(res) => this.props.handleReceivedChats(res)} />
        <ActionCable
          channel={{ channel: 'MessagesChannel', current: this.props.current_user }}
          onReceived={(res) => this.props.handleReceivedMessage(res)} />
        <Grid columns='equal' divided rows='equal'>
          <Grid.Row stretched>
        <Grid.Column>
        <h2>Chats</h2>
        {this.renderChats(this.props.chats)}

        </Grid.Column>
        {this.props.activeChat
        ? <Grid.Column width={12}>
            <Button onClick={this.props.leaveChat}>BYE</Button>
          <Segment>
            {show_msg}
          </Segment>
          <NewMessageForm chat={this.props.activeChat}/> 
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

