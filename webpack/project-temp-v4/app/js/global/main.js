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
import "./modules/utility";
import "./modules/modernizr";
import "./modules/responsive.font";
import "./modules/modalbox";
import "./modules/header";
import "./modules/gnt";


// ** Cookie

import "./modules/cookie/webCookie";
import "./modules/cookie/shadowCookie";
import "./modules/cookie/redirectCookie";


// ** Tracking

import "./modules/trackingEvent/click";
import "./modules/trackingEvent/view";
import "./modules/trackingEvent/custom";



// ******************************************************************
// ----------------------- SASS Requires
// ******************************************************************

import "global/main.scss";



// ******************************************************************
// ----------------------- Init Functions
// ******************************************************************


$(document).ready(function(){

  // run global comment

});





