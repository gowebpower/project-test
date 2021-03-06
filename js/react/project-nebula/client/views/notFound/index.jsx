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

const NotFound = (props) => {

  console.log(props);
  return(
    <div className="m-join l-main-container">

      
      <Row className="l-row-container l-row-container--m">
        <Column small={12} className="l-column">
          
          <h1 className="m-join__h1"> 404 - Page Not Found</h1>

          <p> 404 - Page Not Found</p>

        </Column>
      </Row>

      <div className="m-join__bg"></div>
    </div>
  );

}
 
export default NotFound;