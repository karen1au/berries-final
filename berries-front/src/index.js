import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import './signup.css';
// import {BrowserRouter as Router} from "react-router-dom"

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

// import actionCable from 'actioncable'
// const CableApp = {}
// CableApp.cable = actionCable.createConsumer(`ws://localhost:3000/api/v1/cable`)
// // Pass in CableApp as cableApp prop
// ReactDOM.render(
//   <Router>
//     <App cableApp={CableApp} />
//   </Router>,
// document.getElementById('root'));