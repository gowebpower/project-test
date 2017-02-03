/********
  Exmaple
  require('home/modules/module-a');
    or 
  require('./modules/module-a');
***/


// ******************************************************************
// ----------------------- Vendor Dependencies
// ******************************************************************

// require("react"); // Not used.
// require("jQuery"); // Already included in global pug seperately.

 

// ******************************************************************
// ----------------------- JS Modules
// ******************************************************************


require("global/modules/lightbox");


// ******************************************************************
// ----------------------- SASS Requires
// ******************************************************************



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
