import React from 'react';

class NewMessageForm extends React.Component {
  state = {
    content: '',
    chat_id: this.props.chat
  };

  // componentWillReceiveProps = nextProps => {
  //   this.setState({ chat_id: nextProps.chat_id });
  // };

  handleChange = e => {
    this.setState({ content: e.target.value, chat_id: this.props.chat });
  };

  handleSubmit = e => {
    e.preventDefault();
    fetch(`http://localhost:3000/api/v1/messages`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'accept': 'application/json'
      },
      body: JSON.stringify( {content: this.state.content, chat_id: this.props.chat, user_id: this.props.current_user})
      
    });
    console.log("current_state",this.state)
    this.setState({ content: '' }, () => {
      const options = {
        method: 'post',
        headers: {
          'content-type': 'application/json',
          'accept': 'application/json'
        },
        body: JSON.stringify({sender: this.props.current_user, chat: this.props.chat, noti_type: "new message" })
      }
      fetch(`http://localhost:3000/api/v1/notifications`,options)
        .then( res => console.log('chat notification posted'))
    });
  };

  render = () => {
    return (
      <div className="newMessageForm">
        <form onSubmit={this.handleSubmit}>
          <label>New Message:</label>
          <br />
          <input
            type="text"
            value={this.state.content}
            onChange={this.handleChange}
          />
          <input type="submit" />
        </form>
      </div>
    );
  };
}

export default NewMessageForm;