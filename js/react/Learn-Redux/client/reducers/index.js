import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';


import posts from './posts';
import comments from './comments';


const rootReducer = combineReducers({
  
  posts,
  comments,
  routing: routerReducer // this is for syncing with browser History later.

});

export default rootReducer;