import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchWeather} from '../actions/index';

class SearchBar extends Component {
  constructor(props){
    super(props);

    this.state = { term: '' };
    // this.onInputChange = this.onInputChange.bind(this); not using for now 
    // because i am using (e) => this.onInputChange(e) } instead of { this.onInputChange(e) }
  }

  onInputChange(event) { 

    this.setState({ term: event.target.value })

  }

  onSubmit(event){

    event.preventDefault();
    this.props.fetchWeather(this.state.term);

  }

  render(){
    return(
      <form className="input-group" onSubmit={ (e) => this.onSubmit(e) }>
        <input
          placeholder="get a five-day forecase in your faborite ciries"
          className="form-control"
          value={this.state.term}
          onChange={ (e) => this.onInputChange(e) } />

        <span className="input-group-btn">
          <button type="submit" className="btn btn-secondary">Submit</button>
        </span>
      </form>
    )
  }
}

function mapDispatchToProps( dispatch ){
  return bindActionCreators({ fetchWeather }, dispatch);
}

export default connect(null, mapDispatchToProps)(SearchBar);