import React, { Component } from 'react';

// const SearchBar = () => {
//   return <input />;

// }


class SearchBar extends Component {

  constructor(props){
    super(props);
 
    this.state = { term: '' };
  }

  render(){
    return (
      <div>
        <input onChange={ e => this.setState({ term: e.target.value }) } value={ this.state.term } />
        <div> { this.state.term } </div>
        <div> { this.state.term } </div>
        <div> { this.state.term } </div>
        <div> { this.state.term } </div>
      </div>
    );

  }

  // onInputChange(e){
  //   console.log(e);

  // }

}

export default SearchBar;