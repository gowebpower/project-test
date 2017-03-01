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


require("global/modules/mod.lightbox");
require("./modules/banners");
require("./modules/trackingEventCustom");



// ******************************************************************
// ----------------------- SASS Requires
// ******************************************************************

require("pages/home/main.scss");


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


