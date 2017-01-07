// ******************* Morther of reducer data.


import { createStore, compse } from 'redux';
import { syncHistoryWithStore } from 'react-router-redux';
import { browserHistory } from 'react-router';


// import the root reducer

import rootReducer from './reducers/index';

import comments from './data/comments';
import posts from './data/posts';


// Create an object for the default data

const defaultState = {
  posts,
  comments
};

// It looks like work as array extend. Inject defaultState(Initial State) into rootReducer
// defaultState is static now but I think this would API-Call with ajax to get data.
// And as action is made, it will go throught reducer and update the state.

const store = createStore( rootReducer, defaultState );

// Also keep track of browser history with store
export const history = syncHistoryWithStore(browserHistory, store);

export default store;



