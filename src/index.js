import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux'
import thunk from "redux-thunk";
import userReducer from "./redux/userReducer.js"
import { Provider } from 'react-redux';
import App from './App';

let store = createStore(userReducer, applyMiddleware(thunk))
window.store = store

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
  , 
document.getElementById('root')
);