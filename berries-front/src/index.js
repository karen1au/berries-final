import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import './search-container.css';
import './search-item.css';
import './signup.css';
import './profile-edit.css';
import './instrument-exp.css';
import './chat.css';
import './nav.css'
import 'semantic-ui-css/semantic.min.css';
import { ActionCableProvider } from 'react-actioncable-provider';
import ActionCable from 'actioncable';

const cable = ActionCable.createConsumer('ws://localhost:3000/api/v1/cable');
 
ReactDOM.render(
  <ActionCableProvider cable={cable}>
    <App />
  </ActionCableProvider>,
  document.getElementById('root')
);