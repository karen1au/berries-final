import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import {BrowserRouter as Router} from "react-router-dom"

import 'semantic-ui-css/semantic.min.css';


import actionCable from 'actioncable'
const CableApp = {}
CableApp.cable = actionCable.createConsumer(`ws://localhost:3000/api/v1/cable`)
// Pass in CableApp as cableApp prop
ReactDOM.render(
  <Router>
    <App cableApp={CableApp} />
  </Router>,
document.getElementById('root'));