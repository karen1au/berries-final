import React from 'react';
import { ActionCable } from 'react-actioncable-provider';
import NewConversationForm from './NewConversationForm';
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

  handleReceivedChat = response => {
    const { chat } = response;
    this.setState({
      chats: [...this.state.chats, chat]
    });
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
        <ul>{mapChats(chats, this.handleClick)}</ul>
        <NewConversationForm creator={this.props.current_user}/>
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

const mapChats = (chats, handleClick) => {
  return chats.map(chat => {
    return (
      <li key={chat.id} onClick={() => handleClick(chat.id)}>
        {chat.creator_id}
      </li>
    );
  });
};