var app = app || {};


(function($, window, document, appUtility, undefined) {

    // ------------------  Put class once scroll down. ---------------------

    ( function() {

      var $header = $('header');
          // headerHeight = $('.header__wrapper').height(); Commented this out due to GNT

      function header(){

        if( $(window).scrollTop() > $('#gnt').height() ){
          $header.addClass('scroll-down');
        }
        else {
          $header.removeClass('scroll-down');
        }

      }

      header();

      $(window).on('scroll', header );

    })();


    // ------------------ Attach main menu to "mobile menu" or "header" depends on viewport ---------------------

    ( function() {

      var $mainMenu = $('.header__menu ul'),
          appendedForMobile = false;

      console.log($mainMenu);

      function appendHeaderMenu(){
        // on mobile
        if( appUtility.winWidth() <= 1279 ){
          if ( appendedForMobile ){
            return false;
          } else {
            $mainMenu.appendTo('.m-modal--hambuger__menu');
            appendedForMobile = true;
          }
        }
        // on desktop
        else {

          if ( !appendedForMobile ) { 
            return false;
          } else {
            $mainMenu.appendTo('.header__menu'); 
            appendedForMobile = false;
            if( $('.m-modal--hambuger').hasClass( "active" ) ) {
              $('.m-modal--hambuger .m-modal__close-icon').trigger('click');
            }
          }
        }
      }

      appendHeaderMenu();

      $(window).on('resize', appendHeaderMenu );

    })();


    // ************* Hover status fix on touch device for language select in header of large desktop *************

    ( function() {

      var $headerLanguage = $('.header__select-lan');

      $headerLanguage.on('touchend', function(e) {
        e.preventDefault();
        e.stopPropagation();
        $(this).addClass('hover-effect');
      });

      // added this because hover effect doesnt disappear unless users click elements.
      $(document).on('touchend', function(e) {
        if ( $headerLanguage.hasClass('hover-effect') ){
          $headerLanguage.removeClass('hover-effect');
        }
      });

    })();



    // ************* toggle language box in mobile menu *************
  
    ( function() {

      var 
          $modalLanguage= $('.m-modal--hambuger__language'),
          $modalCurrentLanguage = $('.m-modal--hambuger__language-current'),
          $modalLanguagesItems = $('.m-modal--hambuger__language-items');

      $modalCurrentLanguage.on('touchend click', function(e) {

        e.preventDefault();
        e.stopPropagation();

        if( !$modalLanguagesItems.is(":visible") ){
          $modalLanguage.addClass('active');
          $modalLanguagesItems.slideDown('fast');
        }
        else {
          $modalLanguagesItems.slideUp('fast');
          $modalLanguage.removeClass('active');
        }

      });

    })();


    // ------------------ Play on Nexon Launcher ------------------

    ( function() {

      $('.m-modal.play .play-nexon-launcher').on('click', function(e) {
        
        var $modalPlay =  $(".m-modal.play");

        setTimeout( function(){

          if( $modalPlay.is(":visible") ){

            // launcher-triggered class is added to prevent event tracking for closing .m-modal.play (hacky way)
            $modalPlay.find('.m-modal__close-icon').addClass('launcher-triggered');
            $modalPlay.modalBox('close');
            
          } 
        }, 0);

        // This triggers Nexon Launcher Box. We are not using this for now.
        // setTimeout( function(){
        //   javascript:nexon.play('SVG035');
        // }, 300);
        // console.log( 'send', 'event','Global', 'view','Play Now > Play with Launcher', { nonInteraction: true } ); 

        setTimeout( function(){
          $modalPlay.find('.m-modal__close-icon').removeClass('launcher-triggered');
        }, 1000);



        // on desktop and is not mobile.
        if( appUtility.winWidth() > 1025 && !appUtility.isMobile() ){
          
          setTimeout( function(){
            javascript:nexon.play('SVG035');
          }, 300);

        } else {

          nexon.gnt.fspopupSignup();

        }

      });

     
    })();


}( jQuery, window, window.document, app.utility ));

 
 


  

  
 