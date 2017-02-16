// ******************************************************************
// ----------------------- Imports
// ******************************************************************

// ---------------------- Libs

import React from 'react';
import { Link } from 'react-router';
import JobList from 'containers/JobList';
import { Row, Column } from "react-foundation";


// ---------------------- Components

// ..empty


// ******************************************************************
// ----------------------- Export
// ******************************************************************

const Join = (props) => {

  console.log(props);
  return(
    <div className="m-join l-main-container">

      
      <Row className="l-row-container l-row-container--m">
        <Column small={12} className="m-join__column">
          
          <h1 className="m-join__h1"> Join US </h1>
          
          <div className="m-join__quote">“Now is our time to assemble, <br/>
          to rise, to explore”</div>

          <JobList />

          <div className="m-join__empty-space"></div>

        </Column>
      </Row>

      <div className="m-join__bg"></div>
    </div>
  );

}
 
export default Join;