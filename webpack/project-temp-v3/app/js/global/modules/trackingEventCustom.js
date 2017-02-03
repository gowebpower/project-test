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

    window.app.trackingInfo = { 
      source: 'Refresh', 
      shortTitle: '', 
      isLoggedIn: function(){
        if ( nexon.sso.isLoggedIn ){
          return 'Logged In';
        } else { 
          return 'Logged Out';
        }
      }
    };

    $('.header__btn-show-points').on('click', function(e) {

      // For trackingEvent
      app.trackingInfo.source = 'Show My Points';

    });


    $('.open-share-box').on('click', function(e) {

      var source;

      // For the top button
      if( $('.open-share-box').index(this) === 0 ){

        source = 'Top Share';

      } 
      // For the bottom button
      else { 

        source = 'Bottom Share';

      }
 
      app.trackingInfo.source = source;

    });


    /********
      Sign In Box
    ***/

    // $('body').on('click', '.promo_login .gnt_submit', function() {

    //   app.trackingEventClick( this, [ 'V Update', 'Login > ' + app.trackingInfo.source + ' > ' + app.trackingInfo.shortTitle ] );

    // });




    /********
      Web Reg
    ***/

    // web reg after open

    // if (nexon.onePageSignup ){
    //   nexon.onePageSignup.popupCallbacks.onAfterOpen = function() { 

    //     app.trackingEventClick( this, [ 'V Update - Web Reg', 'Form > Loaded'], 'view' );

    //   };
    // }
    
    // $('body').on('click', '#fullscreen-popup #reg-fs-submit', function() {

    //   app.trackingEventClick( this, [ 'V Update - Web Reg', 'Form > Submit' ] );
      
    // });

    // $('body').on('click', '#fullscreen-popup #x-button', function() {
    //   app.trackingEventClick( this, [ 'V Update - Web Reg', 'Form - Closed Early'] );
    // });

    // $('body').on('click', '#fullscreen-popup .already a', function() {
    //   app.trackingEventClick( this, [ 'V Update - Web Reg', 'Form > Already Have Account'] );
    // });

 


    /********
      Play Launcher
    ***/

    $('body').on('click', '.modal-launcher-button', function() {
      app.trackingEventClick( this, [ 'V Update', 'Play Free Button > Play with Launcher > Sign Up'] );
      nexon.pixel.fireVersaTag('vupdatesignupstartplaying');
    });

    $('body').on('click', '.modal-launcher-button-ghost', function() {
      app.trackingEventClick( this, [ 'V Update', 'Play Free Button > Play with Launcher > Download Launcher'] );
      nexon.pixel.fireVersaTag('vupdatedownloadlauncher');
    });

    $('body').on('click', '.ms_launcher_popup #gnt_popup_close', function() {
      app.trackingEventClick( this, [ 'V Update', 'Play Free Button > Play with Launcher > Close Window'] );
    });


    // confirm this if we need this or not.
    $('.header__btn-play').on('click', function() {

      app.trackingEventClick( this, [ 'V Update', 'Play Free Button > Play with Launcher'], 'view' );

    });



    /********
      Share Info Box
    ***/

    // Phase 1

    // $('.open-share-box').on('click', function() {

    //   app.trackingEventClick( this, [ 'V Update', 'Share for Points > ' + app.trackingInfo.source + ' > ' + app.trackingInfo.shortTitle ] );

    // });

    // Phase 2

    $('.open-share-box').on('click', function() {

      app.trackingEventClick( this, [ 'V Update', 'Share with Friends > ' + app.trackingInfo.source + ' > ' + app.trackingInfo.shortTitle ] );

    });

    $('body').on('click', '.shareInfoBox .share-learn-more', function() {

      app.trackingEventClick( this, [ 'V Update', 'Share for Points > ' + app.trackingInfo.source + ' > ' + app.trackingInfo.shortTitle  + ' > Learn More' ] );

    });

    $('body').on('click', '.shareInfoBox .share-login', function() {

      app.trackingEventClick( this, [ 'V Update', 'Share for Points > ' + app.trackingInfo.source + ' > ' + app.trackingInfo.shortTitle + ' > Log In' ]  );

    });

    $('body').on('click', '.shareInfoBox .share-nopoints', function() {

      app.trackingEventClick( this, [ 'V Update', 'Share for Points > ' + app.trackingInfo.source + ' > ' + app.trackingInfo.shortTitle + ' > Share without Points' ]  );

    });

    $('body').on('click', '.shareInfoBox .m-modal__close-icon', function() {

      app.trackingEventClick( this, [ 'V Update', 'Share for Points > ' + app.trackingInfo.source + ' > ' + app.trackingInfo.shortTitle  + ' > Close Window' ] );

    });
 


    /********
      Share Button Box
    ***/
    // Phase 1
    // $('body').on('click', '.shareButtonsBox .share-facebook', function() {

    //   app.trackingEventClick( this, [ 'V Update', 'FB Share > ' + app.trackingInfo.source + ' > ' + app.trackingInfo.isLoggedIn() + ' > ' + app.trackingInfo.shortTitle ] );

    // });

    // $('body').on('click', '.shareButtonsBox .share-twitter', function() {

    //   app.trackingEventClick( this, [ 'V Update', 'TW Share > ' + app.trackingInfo.source + ' > ' + app.trackingInfo.isLoggedIn() + ' > ' + app.trackingInfo.shortTitle ] );

    // });

    // $('body').on('click', '.shareButtonsBox .m-modal__close-icon', function() {

    //   // app.trackingEventClick( this, [ 'V Update', 'Share for Points > ' + app.trackingInfo.source + ' > ' + app.trackingInfo.isLoggedIn() + ' > ' + app.trackingInfo.shortTitle  + ' > Close Window' ] );
    //   app.trackingEventClick( this, [ 'V Update', 'Share for Points > ' + app.trackingInfo.source + ' > ' + app.trackingInfo.isLoggedIn() + ' > Close Window' ] );

    // });


    // Phase 2

    $('body').on('click', '.shareButtonsBox .share-facebook', function() {

      app.trackingEventClick( this, [ 'V Update', 'Share with Friends > FB Share > ' + app.trackingInfo.source + ' > ' + app.trackingInfo.shortTitle ] );

    });

    $('body').on('click', '.shareButtonsBox .share-twitter', function() {

      app.trackingEventClick( this, [ 'V Update', 'Share with Friends > TW Share > ' + app.trackingInfo.source + ' > ' + app.trackingInfo.shortTitle ] );

    });

    $('body').on('click', '.shareButtonsBox .m-modal__close-icon', function() {

      app.trackingEventClick( this, [ 'V Update', 'Share with Friends > ' + app.trackingInfo.source + ' > ' + app.trackingInfo.shortTitle  + ' > Close Window' ] );

    });


  })( jQuery, window, window.document );
})();

