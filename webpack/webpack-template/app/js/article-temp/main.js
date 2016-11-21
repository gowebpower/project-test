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


require("./modules/trackingEventCustom");


// // ******************************************************************
// // ----------------------- SASS Requires
// // ******************************************************************

require("pages/article-temp/main.scss");




// // ******************************************************************
// // ----------------------- Init Functions
// // ******************************************************************


$(function() {

  // add wrapper to youtube iframe for responsive.
  var $iframe = $('iframe');
  if( !$iframe.parents('.video-wrapper').length ){
    $iframe.wrap('<div class="video-wrapper"><div class="video-wrapper2"></div></div>');
  }
  

});


// $('.m-modal.shareInfoBox').modalBox({
//   dev: true
// });

// $('.m-modal.shareButtonsBox').modalBox({
//   dev: true
// });
