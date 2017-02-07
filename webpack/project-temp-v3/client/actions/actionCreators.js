// Increment
export function a_increment(index){

  return{

    type: 'INCREMENT_LIKES',
    index

  }

}



// Add comment

export function a_addComment(postId, author, comment){

  return{

    type: 'ADD_COMMENT',
    postId,
    author,
    comment

  }

}



// Remove comment


export function a_removeComment(postId, i ){

  return{

    type: 'REMOVE_COMMENT',
    postId,
    i

  }

}

