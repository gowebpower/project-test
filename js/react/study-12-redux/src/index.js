import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import BookList from './containers/book-list';
import reducers from './reducers'; // For React Redux States






// Create a new component. This component should produce some HTML

class App extends Component {

  constructor(props){
    super(props);
 
  }
  

  

  render() {
    return(
      <div>
        <BookList />
      </div>

    )
  }
  
}



// Take this component a generated HTML and putit on the page.


ReactDOM.render(<App />, document.querySelector('.container'));