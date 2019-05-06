import React from 'react';
import { Piano, KeyboardShortcuts, MidiNumbers } from 'react-piano';
import 'react-piano/dist/styles.css';

const firstNote = MidiNumbers.fromNote('c3');
const lastNote = MidiNumbers.fromNote('f5');
const keyboardShortcuts = KeyboardShortcuts.create({
  firstNote: firstNote,
  lastNote: lastNote,
  keyboardConfig: KeyboardShortcuts.HOME_ROW,
})

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
          <Piano
      noteRange={{ first: firstNote, last: lastNote }}
      playNote={(midiNumber) => {
        // Play a given note - see notes below
      }}
      stopNote={(midiNumber) => {
        // Stop playing a given note - see notes below
      }}
      width={1000}
      keyboardShortcuts={keyboardShortcuts}
    />
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