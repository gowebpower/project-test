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
require("./modules/mod.utility");
require("./modules/mod.modernizr");
require("./modules/mod.responsive.font");
require("./modules/mod.modalbox");
require("./modules/mod.header");
require("./modules/mod.gnt");



// ** Share and Promo

// require("./modules/share-and-promo/app");
require("./modules/share-and-promo/util");
require("./modules/share-and-promo/event");
require("./modules/share-and-promo/coins");
require("./modules/share-and-promo/cta");
require("./modules/share-and-promo/countdown");
require("./modules/share-and-promo/modal");
require("./modules/share-and-promo/promo");
require("./modules/share-and-promo/leaf");
require("./modules/share-and-promo/points");
require("./modules/share-and-promo/shareBox");
require("./modules/share-and-promo/WebCookie");



// ** Cookie

require("./modules/cookie/webCookie");
require("./modules/cookie/shadowCookie");
require("./modules/cookie/redirectCookie");


// ** Tracking

require("./modules/mod.trackingEventClick");
require("./modules/mod.trackingEventView");
require("./modules/trackingEventCustom");



// ******************************************************************
// ----------------------- SASS Requires
// ******************************************************************

require("global/main.scss");



// ******************************************************************
// ----------------------- Init Functions
// ******************************************************************


$(document).ready(function(){

  // Share and Promo
  window.app.Cta.init();
  window.app.Points.init();            
  window.app.shareBox.init();
  window.app.Promo.init();


  // Shadow Cookie
  window.app.shadowCookie.init();


  // Countdown is done by backend. So not using this for now.
  // Countdown Timers
  // new window.app.Countdown($('#lunchCountdown'),{
  //     'countdownEnd': '2016/10/19 12:00:00'
  // });

  // new window.app.Countdown($('#workOverCountdown'),{
  //     'countdownEnd': '2016/10/19 19:00:00'
  // });

});





