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


// require("./modules/mod.changeImgPath");
require("./modules/mod.utility");
require("./modules/mod.modernizr");
require("./modules/mod.responsive.font");
require("./modules/mod.modalbox");
require("./modules/mod.lightbox");




// ******************************************************************
// ----------------------- SASS Requires
// ******************************************************************

require("global/main.scss");




// ******************************************************************
// ----------------------- Init Functions
// ******************************************************************


$('.lightbox').appLightBox();