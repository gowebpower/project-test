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


import "./modules/trackingEventCustom";


// // ******************************************************************
// // ----------------------- SASS Requires
// // ******************************************************************

import "pages/article-temp/main.scss";




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
