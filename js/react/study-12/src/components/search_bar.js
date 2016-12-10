import React, { Component } from 'react';

// const SearchBar = () => {
//   return <input />;

// }


class SearchBar extends Component {

  constructor(props){
    super(props);
    
    // console.log(props);
    this.state = { term: '' };
  }

  onInputChange(term){
    
    this.setState({term});
    // console.log(term);
    this.props.onInputChange( term );

  }


  render(){

    return (
      <div >
        <input onChange={ e => this.onInputChange(e.target.value) } value={ this.state.term }/>
        <div> { this.state.term } </div>

      </div>
    );

  }
 

}

export default SearchBar;




// <input onChange={ e => this.setState({ term: e.target.value }) } value={ this.state.term } />