import React from 'react';

class NewMessageForm extends React.Component {
  state = {
    content: '',
    chat_id: this.props.chat_id
  };

  componentWillReceiveProps = nextProps => {
    this.setState({ chat_id: nextProps.chat_id });
  };

  handleChange = e => {
    this.setState({ content: e.target.value });
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
    this.setState({ content: '' });
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