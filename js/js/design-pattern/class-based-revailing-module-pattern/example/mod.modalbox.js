
var app = app || {}; 

(function( $, window, document, undefined ) {
 
  var modalBox = function modalBox( thisElem, options ){

    /**
     * Default initial vars | options are not developed yet.
     */

    var
      defaults = {
        beforeOpen: null,
        afterClose: null,
        dev: false
      },
      plugin = this,
      $modal,
      $close,
      $ui,
      isModalActive = false,
      ui;
      
    plugin.settings = {};

    /**
     * Plugin Initial func
     */

    plugin.init = function(){

      // Overide setting if options are passed.
      plugin.settings = $.extend( {}, defaults, options );

      $( thisElem ).on( 'click', function( e ) {
        
        var relType, relVal;

        // Allow for HTML5 compliant attribute before legacy use of rel
        if ( ! relVal ) {
          relType = 'data-modal';
          relVal = $(thisElem).attr( relType );
        }
 
        if ( ! relVal ) {
          relType = 'modal';
          relVal = $(thisElem).attr( relType );
        }

        $modal = $('.m-modal.' + relVal);
        $close = $modal.find('.m-modal__close-icon');

        ui.init();

        e.preventDefault();
        e.stopPropagation();

      } );


      //  open modal box for dev
      if ( plugin.settings.dev ) {
        $(thisElem).trigger('click');
      }

    };

    /**
     * Initiate Modalbox
     */

    ui = {

      init : function() {
        this.actions.openModal();
        this.addEvtHandler();
        if ( plugin.settings.beforeOpen ) {
          plugin.settings.beforeOpen( $modal, $close );
        }
        $('body').addClass('modalbox-active');
        this.actions.putHeight();
        
      },

      addEvtHandler: function addEvtHandler(){

        var $this = this,
        action = 'touchend click',
        browserAction = 'resize orientationchange';

        $( window ).on( browserAction, $this.actions.putHeight );
        $close.on( action, $this.actions.closeModal );

      },


      actions: {

        openModal: function openModal(){

          if( !isModalActive ) { 
            $modal.addClass('active');
            isModalActive = true;
          }
          
          var clientHeight = $( window ).height();

        },

        closeModal: function closeModal(e){
 

          if( isModalActive ) { 
            $modal.addClass('disappear').removeClass('active');
            isModalActive = false;
            setTimeout(function(){
              $modal.removeClass('disappear');

            }, 480)
          } 

          if ( plugin.settings.afterClose ) {
            plugin.settings.afterClose( $modal, $close );
          }

          e.preventDefault();
          e.stopPropagation();

          ui.actions.destroy();
     

        },

        // put height on modal for scroll.
        putHeight: function putHeight(){
          var clientHeight = app.utility.winHeight();
          $modal.css('height', clientHeight);
        },

        destroy: function destroy(){

          $close.off( 'touchend click', ui.actions.closeModal );
          $close.off( 'resize orientationchange', ui.actions.putHeight );

          $('body').removeClass('modalbox-active');

        },

        test: function test(){
          alert('');

        }

      }


    }; 

    plugin.init();
   
    // ---------------Return Public Methods to app

    // modalBox.test = function ( element ) {
    //   ui.actions.test.call( this, element );
    // };

    // return {
    //   test: function(){ 
    //     alert();
    //   }
    // }

  };


  app.modalBox = modalBox;

  $.fn.modalBox = function( options ) {
    var _ = this,
        _length = _.length,
        i;

    for ( i = 0; i < _length; i++ ){
      if ( ! $.data( this, '_modalBox' ) ) {
        var modalBox = new app.modalBox( _[i], options );
        this.data('_modalBox', modalBox);
      }
    }
    return this.data('_modalBox');

  };

}( jQuery, window, window.document ));