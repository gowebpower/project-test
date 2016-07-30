// import React from 'react';
// import { Component } from 'react';

import React, { Component } from 'react';

import BookList from '../containers/book-list';
import BookDetail from '../containers/book-detail';

export default class App extends Component { 

  aaa(){
    return 'asdasd';


  }

  render(){
    return(
      <div> 
        <BookList/>
        <BookDetail/>

      </div>
    );
  }
}