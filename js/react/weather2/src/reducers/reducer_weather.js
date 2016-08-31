
import { fetch_Weather } from '../actions/index';


export default function(state = [], action){

  switch( action.type ){
    case fetch_Weather:


      console.log('action-state: ', state);
      // console.log('Action received', action.payload.data);

      // return state.concat([action.payload.data]);
      return [ action.payload.data, ...state ]; // es6 syntax

      
      

  }

  return state;
}