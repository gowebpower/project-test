import React, { Component } from 'react';
import { connect } from 'react-redux';

class WeatherList extends Component{

  renderWeather(cityData){
    return(
      <tr key={cityData.city.name}>
        <td>{cityData.city.name}</td>
      </tr>
    )
  }

  render(){
    return(
      <table className="table table-hover">
        <thead>
          <tr>
            <th>City</th>
            <th>Temperature</th>
            <th>Pressure</th>
            <th>Humadity</th>
          </tr>
        </thead>

        <tbody>
          { this.props.weather.map(this.renderWeather) }
        </tbody>
      </table>
    );
  }
}


// function mapStateToProps(state){
//   return { weather: state.weather }
// }

// es6 syntax
function mapStateToProps({ weather} ) {
  // parameter {weather} is identical to cont weather = state.weather;

  // and then we can do {  weather: weather }. Since they both keywords are same, i can just return { weather }
  return { weather };
}

export default connect(mapStateToProps)(WeatherList);

