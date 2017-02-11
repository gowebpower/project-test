import React from 'react';
import { Link } from 'react-router';
import JobList from 'components/JobList';
import { Row, Column } from "react-foundation";

const Join = () => {

  return(
    <div className="m-join l-container">

      
      <Row className="l-row-container">
        <Column small={12} className="m-join__column">
          
            <h1> Header 1 </h1>
            <h2> Header 2 </h2>
            <h3> Header 3 </h3>
            <h4> Header 4 </h4>
            <h5> Header 5 </h5>
            <h6> Header 6 </h6>

            <p>asdasdasdsad asdasdsad asdasd As asd</p>
            
            {/*<img src='./client/images/joinus/main-bg.jpg'/>*/}

        {/*    <JobList/>*/}

    
            

        </Column>
      </Row>

      <div className="m-join__bg"></div>
    </div>
  );

}
 
export default Join;