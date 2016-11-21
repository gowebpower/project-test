// var utility = require('./mod.utility');

window.app = window.app || {};

module.exports = (function(){

  (function($, window, document, utility, undefined) {
    
    var 
      fontSizeSmall = 10,
      fontSizeMedium = 10,
      fontSizeLarge = 10,
      fontMax_WindowWidth = 1920,   // max window width for determining font size
      fontMin_WindowWidth = 380;   // min window width for determining font size

    
    

    // Actions taken when window resizes
    function onWindowResize() {
      console.log('onWindowResize');
      var window_w = utility.winWidth();

      // Calculate base font-size based on window width
      var font_size = 12;
      if (window_w > fontMax_WindowWidth)
          window_w = fontMax_WindowWidth;

      if (window_w < fontMin_WindowWidth)
          window_w = fontMin_WindowWidth;
      
      if (window_w < 640) {
          font_size = fontSizeSmall * window_w / 640;
      } else if (window_w < 1024) {
          font_size = fontSizeMedium * window_w / 1024;
      } else {
          font_size = fontSizeLarge * window_w / 1400;
      }

      $('body').css('font-size', font_size + 'px');

    }
    onWindowResize();

    // font-size is set. add class 'font-size-set' to make sure there is no shrink issue on elements with em when website loads.
    setTimeout(function(){

      $('body').addClass('font-size-set');

    }, 500);

    $(window).on('resize', onWindowResize);

  }(jQuery, window, window.document, window.app.utility));

 
})();
  







 


  

  
 