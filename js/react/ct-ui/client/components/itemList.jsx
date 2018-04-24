// ******************************************************************
// ----------------------- Imports
// ******************************************************************

// ---------------------- Libs

import React from 'react';
import { Row, Column } from "react-foundation";


// ******************************************************************
// ----------------------- Export
// ******************************************************************


const ItemList = ({ name, favoriteFruit } ) => {
 
  return(
    
    <div className="ui-list-item">
      <span> { name }</span>
      <span> { favoriteFruit }</span>
    </div>
    
  );

}
  
export default ItemList




        



