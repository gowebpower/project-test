



function r_jobList(state = [], action){

  switch( action.type ){
    case 'JOB_LIST':

      return action.payload;

  }
  
  return state;

}

export default r_jobList;








