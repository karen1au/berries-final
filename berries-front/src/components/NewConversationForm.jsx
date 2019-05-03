import React from 'react';

class NewChatForm extends React.Component {
  state = {
    creator_id: this.props.current_user
  };

  handleChange = e => {
    this.setState({ creator_id: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault()
    fetch(`http://localhost:3000/api/v1/chats`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'accept': 'application/json'
      },
      body: JSON.stringify(this.state)
    });
    // this.setState({ creator_id: '' });
  };

  render = () => {
    return (
      <div className="newConversationForm">
        <form onSubmit={this.handleSubmit}>
          <label>New Conversation:</label>
          <br />
          <input
            type="text"
            value={this.state.creator_id}
            onChange={this.handleChange}
          />
          <input type="submit" />
        </form>
      </div>
    );
  };
}

export default NewChatForm;
