// ******************************************************************
// ----------------------- Imports
// ******************************************************************

// ---------------------- Libs

import React from 'react';
import { Link } from 'react-router';
import { Row, Column } from "react-foundation";


// ******************************************************************
// ----------------------- Export
// ******************************************************************


const Header = () => {
 
  return(
    
    <header>
      <Row className="l-row-container l-row-container--max">
        <Column small={12} >
          
          <Link to="/">
            <div className="header__logo icon-logo"></div>
          </Link>

         {/* <Link to="/explore" activeClassName="active">Explore</Link>
          <Link to="/adventures" activeClassName="active">Adventures</Link>
          <Link to="/join" activeClassName="active">Join Us</Link> */}

        </Column>
      </Row>
    </header>

  );

}
  
export default Header;



 




        



