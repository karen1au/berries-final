import React from 'react';
import NewMessageForm from './NewMessageForm';

const MessagesArea = ({
  chat: { id, creator, messages },
}) => {
  return (
    <div className="messagesArea">
      <ul>{orderedMessages(messages)}</ul>
      <NewMessageForm chat_id={id} />
    </div>
  );
};

export default MessagesArea;

// helpers

const orderedMessages = messages => {
  const sortedMessages = messages.sort(
    (a, b) => new Date(a.created_at) - new Date(b.created_at)
  );
  return sortedMessages.map(message => {
    return <li key={message.id}>{message.content}</li>;
  });
};