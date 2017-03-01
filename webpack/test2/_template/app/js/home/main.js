/********
  Exmaple
  import 'home/modules/module-a';
    or 
  import './modules/module-a';
***/


// ******************************************************************
// ----------------------- Vendor Dependencies
// ******************************************************************

// import "react"; // Not used.
// import "jQuery"; // Already included in global pug seperately.

 

// ******************************************************************
// ----------------------- JS Modules
// ******************************************************************


import "global/modules/mod.lightbox";
import "./modules/banners";
import "./modules/trackingEventCustom";



// ******************************************************************
// ----------------------- SASS Requires
// ******************************************************************

import "pages/home/main.scss";


// ******************************************************************
// ----------------------- Init Functions
// ******************************************************************



$(document).ready(function(){
  
  // LightBox Video

  $('.lightbox').appLightBox({   
     
    afterClose: function(){
      app.trackingEventClick( this, [ 'V Update', 'Home > Play Video > Close Window '] );
    }

  });

});


// $('.m-modal.shareInfoBox').modalBox({
//   dev: true
// });


