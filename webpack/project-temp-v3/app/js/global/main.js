/********
  Exmaple
  require('home/modules/module-a');
    or 
  require('./modules/emodule-a');
***/


// ******************************************************************
// ----------------------- Vendor Dependencies
// ******************************************************************

// require("react"); // Not used.
// require("jQuery"); // Already included in global pug seperately.
 

// ******************************************************************
// ----------------------- JS Modules
// ******************************************************************

// ** Overall Website Components
require("./modules/utility");
require("./modules/modernizr");
// require("./modules/responsive.font");
require("./modules/modalbox");
require("./modules/header");
require("./modules/gnt");


// ** Cookie

require("./modules/cookie/webCookie");
require("./modules/cookie/shadowCookie");
require("./modules/cookie/redirectCookie");


// ** Tracking

require("./modules/trackingEventClick");
require("./modules/trackingEventView");
require("./modules/trackingEventCustom");



// ******************************************************************
// ----------------------- SASS Requires
// ******************************************************************

require("global/main.scss");



// ******************************************************************
// ----------------------- Init Functions
// ******************************************************************


$(document).ready(function(){

  // run global comment

});





