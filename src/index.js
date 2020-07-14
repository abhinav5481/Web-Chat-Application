import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import {Route, BrowserRouter as Router} from 'react-router-dom';
import LoginComponent from './login/login';
import SignupComponent from './signup/signup';
import DashboardComponent from './dashboard/dashboard';

const firebase = require("firebase");
require("firebase/firestore");

firebase.initializeApp({
    apiKey: "AIzaSyCNEP-iJjSum8NkHJ7-sCcScfk3QO896FM",
    authDomain: "chat-app-39de2.firebaseapp.com",
    databaseURL: "https://chat-app-39de2.firebaseio.com",
    projectId: "chat-app-39de2",
    storageBucket: "chat-app-39de2.appspot.com",
    messagingSenderId: "1023969827324",
    appId: "1:1023969827324:web:0a89d8a3b8e257c44ffa79",
    measurementId: "G-1YS6VX9H7P"
});

const routing = (
  <Router>
    <div id="routing-container">
      <Route path='/login' component={LoginComponent}></Route>
      <Route path='/signup' component={SignupComponent}></Route>
      <Route path='/dashboard' component={DashboardComponent}></Route>
    </div>
  </Router>
)

ReactDOM.render(
  
  routing
 ,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
