// ************* Custom Tracking Event *************
// ****************************************************
// ****************************************************
 

window.app = window.app || {};
 
module.exports = (function(){
  ( function( $, window, document, undefined ) {


    /********
      State for source and short title for Sign In tracking Event
    ***/

    // shortTitle will be defined in page specific js.
    // source will be defined depends on user actions.

    app.trackingInfo.shortTitle = 'Home';

    $('.m-home-prize__show-my-points').on('click', function(e) {

      // For trackingEvent
      app.trackingInfo.source ='Show My Points';

    });


    /********
      Hero
    ***/
    $('.m-home-hero .m-home-hero__video-thumb').on('click', function(){

      app.trackingEventClick( this, [ 'V Update', 'Home > Play Video '] );

    });

    $('.m-home-hero .m-home-hero__cta-reg-button').on('click', function(){

      app.trackingEventClick( this, [ 'V Update', 'Home > Get Free 5th Job Pack '] );

    });



    /********
      Prize
    ***/
    $('.m-home-prize__restriction a').on('click', function(){

      app.trackingEventClick( this, [ 'V Update', 'Home > Share Event - Restrictions Full Details '] );

    });

    $('.m-home-prize__tell-me-more').on('click', function(){

      app.trackingEventClick( this, [ 'V Update', 'Home > Share Event - Tell Me More - Detailed Article '] );

    });

    $('.m-home-prize__show-my-points').on('click', function(){

      app.trackingEventClick( this, [ 'V Update', 'Home > Share Event - Show My Points '] );

    });


    /********
      Banners
    ***/
    $('.m-home-previewPost__btn').on('click', function(){
      var clickedButtonIndex = $('.m-home-previewPost__btn').index(this) ;
      clickedButtonIndex = clickedButtonIndex + 2 ;


      app.trackingEventClick( this, [ 'V Update', 'Home > Banner ' +clickedButtonIndex + ' > Learn More'] );


    });


    /********
      Article Thumbnail
    ***/
    $('.m-home-postThumbnail__items').on('click', 'a', function(){
      var text = $(this).find('.m-home-postThumbnail__item-textWrapper').text();

      app.trackingEventClick( this, [ 'V Update', 'Home > Article > ' + text] );

    });



  })( jQuery, window, window.document );
})();