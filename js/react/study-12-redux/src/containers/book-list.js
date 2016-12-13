import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { selectBook } from '../actions/index';

 
var BookList = ( props ) => {

  const renderList = () => {

    return props.books.map((book) => {
      return (
        // <li key={ book.title } className="list-group-item">{ book.title }</li>

        <li 
          key={ book.title }
          onClick={ () => props.selectedBook(book) }
          className="list-group-item">
          
          { book.title }
        </li>

      )

    })

  }

  return(

    <ul className="list-group col-sm-4">
      { renderList() } 
    </ul>

  )
   

}

function mapStateToProps(state){
  
  // Whatever is returned will show up as props inside of BookList

  console.log('mapStateToProps ran');
  return{

    books: state.books,
    activeBook: state.activeBook
  };

}

// Anything returned from this func will available as props on Booklist container.
function mapDispatchToProps(dispatch){

  // Whenever selectBook is called, the result should be passed to all of our reducers.
  return bindActionCreators({ selectedBook: selectBook }, dispatch)

}
 
// Promote BookList from a component to a container - it needs to know about this new dispatch method, selectBook. Make it available as a prop.
export default connect(mapStateToProps, mapDispatchToProps)(BookList);
