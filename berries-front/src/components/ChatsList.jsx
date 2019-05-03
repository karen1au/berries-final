import React from 'react';
import { ActionCable } from 'react-actioncable-provider';
import MessagesArea from './MessagesArea';
import NewMessageForm from './NewMessageForm';
import Auth from '../services/Auth';

class ChatsList extends React.Component {
  state = {
    current_user: Auth.getCookie(),
    chats: [],
    activeChat: null
  };

  componentDidMount = () => {
    fetch(`http://localhost:3000/api/v1/chats?user=${this.state.current_user}`)
      .then(res => res.json())
      .then(chats => {
        console.log('this is chats',chats)
        this.setState({ chats })
      });
  };

  handleClick = id => {
    this.setState({ activeChat: id });
  };

  handleReceivedChats = res => {
    // const options = {
    //   method: 'post',
    //   headers: {
    //     'content-type': 'application/json',
    //     'accept': 'application/json'
    //   },
    //   body: { sender: this.state.current_user, receiver: res.creator_id, noti_type: "new message"}
    // }
    // fetch(`http://localhost:3000/api/v1/notifications`,options)
    // .then( () => {
    // re-render chat list if user is in chat page
      fetch(`http://localhost:3000/api/v1/chats?user=${this.state.current_user}`)
      .then(res => res.json())
      .then(chats => {
        console.log('chat refetched',chats)
        this.setState({ chats })
        })
      // })
  };

  handleReceivedMessage = response => {
    const { message } = response;
    const chats = [...this.state.chats];
    const chat = chats.find(
      chat => chat.id === message.chat_id
    );
    chat.messages = [...chat.messages, message];
    this.setState({ chats });
  };

  render = () => {
    const { chats, activeChat } = this.state;
    return (
      <div className="chatsList">
        <ActionCable
          channel={{ channel: 'ChatsChannel', current_user: this.state.current_user }}
          onReceived={(res) => this.handleReceivedChats(res)}
        />
        <h2>Chats</h2>
        {this.state.chats.map((chat) => {
          return <h4>{chat.chat_id}</h4>
        })}
        <NewMessageForm />
        {activeChat ? (
          <MessagesArea
            chat={findActiveChat(
              chats,
              activeChat
            )}
          />
        ) : null}
      </div>
    );
  };
}

export default ChatsList;

// helpers

const findActiveChat = (chats, activeChat) => {
  return chats.find(
    chat => chat.id === activeChat
  );
};
