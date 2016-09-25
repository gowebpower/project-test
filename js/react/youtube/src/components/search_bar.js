// import React from 'react';

import React, { Component } from 'react'; // import 'react' and pull off Component from it and store it to special variable, Component | const Component = React.Component;


class SearchBar extends Component{
  

	constructor(props){
		super(props);

		this.state = { term: '' };
	}


  render() { 
    return(
      <div className="asda">
       <input value= { this.state.term } onChange = { (e) =>  this.onInputChange(e.target.value) } />
       Value of the input: { this.state.term }
      </div>
    );
  }


  onInputChange(term){
    this.setState({term});
    console.log(term);
    this.props.onSearchTermChange(term);
  }


  // exmaple 1
  // render() {
  //   return (
  //   	<div className="asda">
  //   		<input onChange = { (e) =>  this.setState({term: e.target.value }) } />
  //   		Value of the input: { this.state.term }
  //   	</div>

  //   );
  // }

  // exmaple 2
  // render() {
  //   return <input onChange = { this.onInputChange } />;
  // }


  // onInputChange(e){
  //   console.log(e.target.value);
  // }

}


// const SearchBar = () => {
//     return <input  /> // React.createElement
// };

export default SearchBar;
