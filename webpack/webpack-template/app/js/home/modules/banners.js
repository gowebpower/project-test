// ************* Custom Tracking Event *************
// ****************************************************
// ****************************************************
 

window.app = window.app || {};
 
module.exports = (function(){
  ( function( $, window, document, undefined ) {


    /********
      Change Coming Soon to Learn More Button w/ link based on config.banners
    ***/
    
    var banners = app.config.banners;

    for( var key in banners ){
      
      putLink( key, banners[key].link, banners[key].show  );

    }

    function putLink(element, link, visibility){

      // if config.banners[bannerName].show = true
      // hide Coming Soon and show link.
      if( visibility ){
        var element = '.m-home-previewPost__usp.' + element;
        var $element = $( element );

        $element.find('.m-home-previewPost__comingSoon').hide();
        $element.find('a').attr('href', link).find('.m-home-previewPost__btn').addClass('show');

      }
    }

  })( jQuery, window, window.document );
})();