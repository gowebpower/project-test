import React, { Component } from 'react',

export default class BookList Extends Component {

  renderList(){
    return this.props.books.map( (book) =>{ 

      return(

        <li key="{book.title}" className="list-group-item">{book.title}

      );

    });

  }

  render(){

    return(

      <ul className="list-group col-sm-4">
        { this.renderList() }
      </ul>

    )
  }

}