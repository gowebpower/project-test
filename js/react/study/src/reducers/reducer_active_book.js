
// reducer is only called when action occures
// State argument is not application state, only the state this reducer is responsible for.
export default function(state = null, action) {
  switch(action.type){
    case 'BOOK_SELECTED':
      return action.selectedBook;

  }

  // always returns state but if action.type is matched this returns action object. ( little confusing here )
  // state is always null when I console.log it. why should i return this everytime?
  return state;

}