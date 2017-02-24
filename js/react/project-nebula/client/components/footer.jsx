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


const Footer = () => {
 
  return(
    
    <footer>
      
      <Row className="l-row-container l-row-container--max">
        <Column small={12} >
          
          ©2017 NEXON Korea Corporation and NEXON America Inc. All Rights Reserved. <Link href="http://www.nexon.net/legal/privacy-policy/" target="_blank">Privacy Policy</Link> | <Link href="http://www.nexon.net/legal/terms-of-use/" target="_blank">Terms of Use</Link>

        </Column>
      </Row>

    </footer>
    
  );

}
  
export default Footer;



 




        



