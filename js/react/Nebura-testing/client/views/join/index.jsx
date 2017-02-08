import React from 'react';
import { Link } from 'react-router';
import JobList from 'components/JobList';
import { Row, Column } from "react-foundation";

const Join = () => {

  return(
    <div className="m-join l-container">
      <Row>
        <Column small={12} medium={6} className="extra">
          
            <h1> Join US</h1>
            
            <img src='./client/images/joinus/main-bg.jpg'/>

            <JobList/>

    
            

        </Column>
      </Row>
    </div>
  );

}
 
export default Join;