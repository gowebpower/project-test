
window.app = window.app || {};

module.exports = (function(){

  (function($, window, document, utility, undefined) {

    // Hide GNT play popup if window is less than 1024 (tablet & phone)
    // "Button Play" is already being hidden w/ css if $body has class of "mobile".
    // This is double proof with JS.

    function hideGntPlayModal() {

      var $gntPopup = $('#gnt_popup');
      var window_w = utility.winWidth();
       
      if (window_w < 1024 && $gntPopup.is(":visible") && $gntPopup.hasClass('ms_launcher_popup') ) { 
        nexon.gnt.popupHide();
      }

    }
    hideGntPlayModal();
    
    $(window).on('resize', hideGntPlayModal);

  }(jQuery, window, window.document, window.app.utility));
 
})();
   
 


  

  
 