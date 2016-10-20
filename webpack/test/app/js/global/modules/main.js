var app = app || {};

( function( $ ) {


  // ************* ModalBox *************

  // for general popup
  $(".m-modal.play").modalBox({
    beforeOpen: function($modal, $close){

      setTimeout( function(){
        var $hambugerMenu =  $(".m-modal.m-modal--hambuger");
        if( $hambugerMenu.is(":visible") ){
          $hambugerMenu.find('.m-modal__close-icon').trigger('click');
        } 

      }, 200);

          
      // Tracking Event : It is manually added due to its special case ( this acts as 'view')
      ga('send','event','Global','view', 'Play Now > Choose Platform', {nonInteraction:true} );
    

    },

    afterClose: function( $modal, $close){

      // Tracking Event: hacky way.

      if( !$close.hasClass('launcher-triggered') ){
  
        app.trackingEventClick( $close, ['Global-No-Section', 'Play Now > Choose Platform > Close Window'] );
        
      }

    }
  });


  // for main mobile menu popup

  $(".m-modal.m-modal--hambuger").modalBox({

    beforeOpen: function($modal, $close){
      
      // extra touch for menu appearing. 
      setTimeout( function(){
        $('.m-modal--hambuger__menu').addClass('active');
      }, 100);

      //  Tracking Event
      app.trackingEventClick( $modal, ['Global', 'Mobile Menu Opened'] );
      
    },

    afterClose: function($modal, $close){

      $('.m-modal--hambuger__menu').removeClass('active');

      // Close Language accordian if it is opened.
      var $modalLanguagesItems = $('.m-modal--hambuger__language-items'),
          $modalLanguage= $('.m-modal--hambuger__language');
      if ( $modalLanguagesItems.is(":visible") ){
        $modalLanguage.removeClass('active');
        $modalLanguagesItems.slideUp('fast');
      }

    }
  });



  // ************* LightBox Plugin *************

  $('.lightbox').appLightBox({   
    afterOpen: function(){

      // Stop the video looping in hero when light box is active.
      if ( $('video') && !app.utility.isMobile ){

        $('video').each(function(i,e){
          e.pause();
        })
      }

    },
    afterClose: function(){
      // Stop the video looping in hero when light box is active.
      if ( $('video') && !app.utility.isMobile ){

        $('video').each(function(i,e){
          e.play();
        })
      }
 
    }
  });



  // ************* Change Background Path depends on viewport *************

  // for general popup
  $(".change-bg-path").bgMediaQuery();



  // ************* Lazy Load *************

  $("img.lazy").lazyload({
    threshold : 100,
    effect : "fadeIn"
  });


  // ************* Show page once font-size is set to body *************
  // font-size-added class will be added on load after font-size is set to body.
  // this prevent seeing shrink issue on em based elements on load.
  // CSS Animation is added in global/modules/_header.scss, global/modules/_footer.scss, global/components/_layout.scss

  var $pageContainer = $('.l-page-container'),
      $body = $('body');

  var showContent = setInterval( function(){

    if( $pageContainer.css('font-size') ){

      clearInterval(showContent)
      console.log('as')
      setTimeout( function(){
        $body.addClass('font-size-added');
      }, 200);
    }

  }, 100);


})( jQuery );