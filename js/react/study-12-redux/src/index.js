/*
  ###  Initial React imports
*/

import React, { Component } from 'react';
import ReactDOM from 'react-dom';


import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

import reducers from './reducers'; // For React Redux States
import App from './components/app';


const createStoreWithMiddleware = applyMiddleware()(createStore); // whats this?


// Create a new component. This component should produce some HTML

// class App extends Component {

//   constructor(props){
//     super(props);
 
//   }
  

  

//   render() {
//     return(

//       <Provider store={createStoreWithMiddleware(reducers)}>
//         <BookList />
//       </Provider>

//     )
//   }
  
// }



// Take this component a generated HTML and putit on the page.


ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <App />
  </Provider>
  , document.querySelector('.container')
);