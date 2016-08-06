/*******
    Skeleton: Class Based Revealing Module Pattern
  *******/

var app = app || {}; 

(function(){

  'use strict';

  /*******
    Class
  *******/

  var ModalBox = function ModalBox( thisElem, options ){

    var defaultOption = { 
      beforeOpen: null,
      afterClose: null,
      dev: false
    };

    this.options = $.extend( {}, defaultOption, options );
    this.$modalBox = thisElem;
    this.$close = thisElem.find('.m-modal__close-icon');
    this.isModalActive = false;

  }

  /*******
    Static Function : Create instance and init plugin.
  *******/

  ModalBox.init = function( thisElem ){
    var modalBoxInstance = new ModalBox( thisElem );
    modalBoxInstance._pluginInit();
    return modalBoxInstance;

  }


  /*******
    Instance Methods
  ********/

  ModalBox.prototype = function(){

    /**
      Plugin Init: This is _public function for only private use only.
    **/
 
    var pluginInit = function(){

      var plugin = this;
      var $triggeringElement = '[data-target-m-modal="' +this.$modalBox.attr('data-m-modal') + '"]';

      // Watch any triggering elements are clicked, if clicked init UI.
      $( $triggeringElement ).on( 'click', function( e ) {
        
        ui.init.call(plugin);

        e.preventDefault();
        e.stopPropagation();

      } );

    }


    /**
      UI
    **/

    var ui = { 

      init: function(){ 

        ui.addEvtHandler.call(this);
        ui.actions.openModal.call(this);
        if ( this.options.beforeOpen ) {
          this.options.beforeOpen( this.$modalBox, this.$close );
        }

        $('body').addClass('modalbox-active');
        ui.actions.putHeight.call(this);

      },

      addEvtHandler: function(){
        var
          plugin = this,
          action = 'touchend click',
          browserAction = 'resize orientationchange';

        // prototype.call() invoke right away. and bind returns a function.
        // So I reassigned function with 'this' context so that I can destory this plugin event ( ui.actions.putHeight ) only to window later when modal is closed.

        ui.actions.putHeight = ui.actions.putHeight.bind(plugin);

        $(window).on( browserAction, ui.actions.putHeight );

        this.$close.on( action, function(){
          ui.actions.closeModal.call(plugin);
        })

      },

      actions: { 
        openModal: function openModal(){
          
          if( !this.isModalActive ) { 
            this.$modalBox.addClass('active');
            this.isModalActive = true;
          }
          
          var clientHeight = $( window ).height();

        },

        closeModal: function closeModal(){

          var $thisModalBox = this.$modalBox;

          if( this.isModalActive ) { 
            $thisModalBox.addClass('disappear').removeClass('active');
            this.isModalActive = false;
            setTimeout(function(){
              $thisModalBox.removeClass('disappear');
            }, 480)
          }

          if ( this.options.afterClose ) {
            this.options.afterClose( $thisModalBox, this.$close );
          }

          ui.actions.destroy.call(this);

        },

        // Need to put height so that modal box can be scrollable when viewport is smaller than modal box's height.
        putHeight: function putHeight(){

          var clientHeight = app.utility.winHeight();
          this.$modalBox.css('height', clientHeight);

        },

        destroy: function destroy(){

          this.$close.off('touchend click');
          $(window).off('resize orientationchange', ui.actions.putHeight );

        }

      },

      components: {

      },

      test: function(){
         ui.init.call(this);
      }

    }

    /**
      Public Methods
    
    **/

    return {
      _pluginInit: pluginInit, // this is private only
      show: ui.init,
      hide: ui.actions.closeModal

    }

  }();

  // Person.prototype.sayHi = function(){
  //   console.log(this.name);
  //   return this;
  // }

  app.modalBox = ModalBox;

})();

var modal1 = new app.modalBox.init( $('.m-modal').eq(0) );
var modal2 = new app.modalBox.init( $('.m-modal').eq(1) )
 
 
// ban.test(); 
 