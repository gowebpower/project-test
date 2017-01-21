

function r_posts(state = [], action){

  switch(action.type){
    case 'INCREMENT_LIKES':
      console.log('incrementing likes!!');

      const i = action.index;
      

      console.log(state[i]);

      return [
        ...state.slice(0,i), 
        {...state[i], likes: state[i].likes + 1 }, // Object.assign({}, someObj ) very simliar to this approach
        ...state.slice(i + 1)
       ]

       // or consider this Object.assign([], state, state[action.index].likes++) 

    default:
      return state;

  }
 

  return state;

}

export default r_posts;