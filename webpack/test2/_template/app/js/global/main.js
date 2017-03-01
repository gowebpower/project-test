/********
  Exmaple
  import 'home/modules/module-a';
    or 
  import './modules/emodule-a';
***/


// ******************************************************************
// ----------------------- Vendor Dependencies
// ******************************************************************

// import "react"; // Not used.
// import "jQuery"; // Already included in global pug seperately.
 

// ******************************************************************
// ----------------------- JS Modules
// ******************************************************************

// ** Overall Website Components
import "./modules/mod.utility";
import "./modules/mod.modernizr";
import "./modules/mod.responsive.font";
import "./modules/mod.modalbox";
import "./modules/mod.header";
import "./modules/mod.gnt";



// ** Share and Promo

// import "./modules/share-and-promo/app";
import "./modules/share-and-promo/util";
import "./modules/share-and-promo/event";
import "./modules/share-and-promo/coins";
import "./modules/share-and-promo/cta";
import "./modules/share-and-promo/countdown";
import "./modules/share-and-promo/modal";
import "./modules/share-and-promo/promo";
import "./modules/share-and-promo/leaf";
import "./modules/share-and-promo/points";
import "./modules/share-and-promo/shareBox";



// ** Cookie

import "./modules/cookie/webCookie";
import "./modules/cookie/shadowCookie";
import "./modules/cookie/redirectCookie";


// ** Tracking

import "./modules/mod.trackingEventClick";
import "./modules/mod.trackingEventView";
import "./modules/trackingEventCustom";



// ******************************************************************
// ----------------------- SASS Requires
// ******************************************************************

import "global/main.scss";



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





