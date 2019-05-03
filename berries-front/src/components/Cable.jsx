import React, { Fragment } from 'react';
import { ActionCable } from 'react-actioncable-provider';

const Cable = ({ chats, handleReceivedMessage }) => {
  return (
    <Fragment>
      {chats.map(chat => {
        return (
          <ActionCable
            key={chat.id}  
            channel={{ channel: 'MessagesChannel', chat: chat.id }}
            onReceived={handleReceivedMessage}
          />
        );
      })}
    </Fragment>
  );
};

export default Cable;