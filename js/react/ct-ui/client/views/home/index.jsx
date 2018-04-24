// ******************************************************************
// ----------------------- Imports
// ******************************************************************

// ---------------------- Libs

import React, { Component } from 'react';
import { Row, Column } from "react-foundation";


// ---------------------- Components

import FavoriteFruit from 'containers/favoriteFruit';


// ******************************************************************
// ----------------------- Export
// ******************************************************************


class Home extends Component {

  render(){

    return(
      
      <div className="l-page-container">
        <div className="l-main-container">

          <FavoriteFruit />
        
        </div>
      </div> 

    )
  }
}


export default Home;
 