
import Utility from "global/modules/utility";

const modernizr = (() => {
  
  const $body = $('body');
    
  if( Utility.isMobile() ) {
    $body.addClass('mobile');
  }

  if( Utility.isTouch() ) {
    $body.addClass('touch');
  }

  // add landscape and portrait class in body on mobile.
  
  $(window).on("orientationchange",function(){
     // if portrait
    if( window.orientation == 0 ){
      $body.removeClass('landscape');
      $body.addClass('portrait');
    } else if ( window.orientation == -90 || window.orientation == 90 ){ // if landscape
      $body.removeClass('portrait');
      $body.addClass('landscape');
    }
     
  });

  $(window).trigger('orientationchange');
  
})();

export default modernizr;











