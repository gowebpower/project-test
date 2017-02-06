import React from 'react';
import { Link } from 'react-router';
import JobList from 'components/JobList';


const Join = () => {

  return(
    <div className="m-join l-container">
      <div className="row l-row-container">
        <div className="small-12 columns">
          <h1> Join US</h1>
          
          <div>
            
            <JobList/>

          </div>
          

        </div>
      </div>
    </div>
  );

}
 
export default Join;