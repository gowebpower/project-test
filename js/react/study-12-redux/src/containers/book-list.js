import React, { Component } from 'react';
import { connect } from 'react-redux';


class BookList extends Component {
  renderList(){

    return this.props.books.map((book) => {
      return (
        // <li key={ book.title } className="list-group-item">{ book.title }</li>

        <li 
          key={ book.title }
          className="list-group-item">
          { book.title }
        </li>

      )

    })

  }

  render(){
    return(

      <ul className="list-group col-sm-4">
        { this.renderList() } 
      </ul>

    )

  }

}

function mapStateToProps(state){
  
  // Whatever is returned will show up as props inside of BookList

  console.log('mapStateToProps ran');
  return{

    books: state.books
  };

}
 
// Promote BookList from a component to a container - it needs to know about this new dispatch method, selectBook. Make it available as a prop.

export default connect(mapStateToProps)(BookList);
