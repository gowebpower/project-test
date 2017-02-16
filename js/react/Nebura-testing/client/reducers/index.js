import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';


import jobList from './jobList';


const rootReducer = combineReducers({
  
  jobList,
  routing: routerReducer // this is for syncing with browser History later. This name needs to be 'routing'

});

export default rootReducer;