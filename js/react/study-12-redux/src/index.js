/*****
  ###  Imports
*****/

// Reacts
// import React, { Component } from 'react';
import React from 'react';
import ReactDOM from 'react-dom';


// Middleware for React and Redux
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

import reducers from './reducers'; // For React Redux States


// Components
import App from './components/app';


/*****
  ###  Vars
*****/
const createStoreWithMiddleware = applyMiddleware()(createStore);




/*****
  ###  Render
*****/


ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <App />
  </Provider>
  , document.querySelector('.container')
);