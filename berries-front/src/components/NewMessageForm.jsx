import React from 'react';
import Auth from '../services/Auth';

class NewMessageForm extends React.Component {
  state = {
    user_id: Auth.getCookie(),
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
      body: JSON.stringify(this.state)
      
    });
    console.log("current_state",this.state)
    this.setState({ content: '' }, () => {
      // const options = {
      //   method: 'post',
      //   headers: {
      //     'content-type': 'application/json',
      //     'accept': 'application/json'
      //   },
      //   body: JSON.stringify({sender: this.state.current_user, receiver: receiver, noti_type: "new message" })
      // }
      // fetch(`http://localhost:3000/api/v1/notifications`,options)
      //   .then( res => console.log('chat notification posted'))
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