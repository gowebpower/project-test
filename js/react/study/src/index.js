/*
	###  Initial React imports
*/

import React from 'react';
import ReactDOM from 'react-dom';

// ----------------------- 

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

import App from './components/app'; // For React View
import reducers from './reducers'; // For React Redux States

const createStoreWithMiddleware = applyMiddleware()(createStore); // whats this?

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <App />
  </Provider>
  , document.querySelector('.container')
);
