

function r_posts(state = [], action){

  switch(action.type){
    case 'INCREMENT_LIKES':
      console.log('incrementing likes!!');

      const i = action.index;
      

       // or consider this Object.assign([], state, state[action.index].likes++) 

    default:
      return state;

  }
 

  return state;

}

export default r_posts;