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

    app.trackingInfo.shortTitle = $('h1').text();



    // /********
    //   Register Now Button
    // ***/

    // $('.btn-promo').on('click', function() {

    //   var buttonIndex = $('.btn-promo').index(this);
    //   console.log(buttonIndex)
    //   var buttonLocation = buttonIndex ? "Bottom Register" : "Top Register" ;
      
    //   app.trackingEventClick( this, [ 'V Update', 'Pre-Reg > Register Now CTA > ' + buttonLocation ] );

    // });


  })( jQuery, window, window.document );
})();