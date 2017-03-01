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

    function putLink(elementClass, link, linkVisibility){
      

      // if config.banners[bannerName].show = true
      // hide Coming Soon > add href > show link.

      var element = '.m-home-previewPost__usp.' + elementClass;
      var $element = $( element );
      
      if( linkVisibility ){

        $element.find('.m-home-previewPost__comingSoon').hide();
        $element.find('a').attr('href', link);

      } else {
        $element.find('.m-home-previewPost__btn').hide();
        
      }
    }

  })( jQuery, window, window.document );
})();

 