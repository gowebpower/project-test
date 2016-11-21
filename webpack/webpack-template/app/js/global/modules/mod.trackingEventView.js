// ************* Tracking Event View *************
// ****************************************************
// ****************************************************
// How to use this
/**
  - For Global Tracking Event -

  add the following code to the element that need to be tracked.
    data-trackView="<Page Name>, < Section Name >"  
    >>> ex) data-trackView="Home, Game"     
  

 
*/




( function( $ ) {

  "use strict";

  var trackingEventView = function trackingEventView( elem, options ){
    
   /**
   * Default options & initial vars
   */

    var 
      plugin = {},
      ui = {},
      $header = $('header'),
      $elementsView = $('[data-trackView]'),
      elementsViewInfoArray = [],
      html = { };

    plugin.settings = { };

    /**
     * Plugin Initial func
     */

    plugin.init = function(){

      ui.init();
    }


    /**
     * UI
     */

    ui = { 

      // ********************
      // -------------------- Initiate UI

      init : function init( clickedIndex ) { 
        this.build();
        this.grabElements();
        this.bindEvents();
      },

      // ********************
      // -------------------- Build HTML Containers
      build : function build( index ) {
        // Nothing
      },

      // ********************
      // -------------------- Grab elements info first
      // 

      grabElements: function grabElements(){

        this.comps.getElementsViewInfo();

      },

      // ********************
      // -------------------- Bind Events
      // 
      bindEvents: function bindEvents(){
 
        // track view

        var
          scroll = 'scroll resize orientationchange',
          $this = this;

        $(window).on( scroll, function(){

          // trigger view evet on scroll only once for each element with data-trackView="something"
          $this.actions.sendViewEvents();

        });

        $this.actions.sendViewEvents();


      }, 

      // ********************
      // -------------------- Actions
      // 

      actions: {

        // Main track view action.
        // if any elements with data-track="view <section name>" in html, then scroll to those elements, this event will be triggered only once for each element.

        sendViewEvents: function sendViewEvents(){


          var lastChildIndex = elementsViewInfoArray.length-1;
          
          for ( var i = 0; i < elementsViewInfoArray.length; i++ ) { 

            if ( window.pageYOffset >= elementsViewInfoArray[i].$element.offset().top - ( window.innerHeight / 3 ) ){

              // if current element is not viewed once,

              if( !elementsViewInfoArray[i].isElementViewed ) {

                ui.comps.sendInfo(i);
 
              }
            } else if ( window.pageYOffset + window.innerHeight == $(document).height() ) { 

              // Just in case if last element ( footer ) is not triggered somehow in first if statement, trigger this once users scroll to the bottom page.

              // if last element is not viewed once, 

              if( !elementsViewInfoArray[lastChildIndex].isElementViewed ) { 
                ui.comps.sendInfo(i);
              }
            }
          }
        }


      },


      // ********************
      // -------------------- Compositions
      // 

      comps: {

        sendInfo: function sendInfo(i){

          // set isViewReached True so that viewed element is not triggered anymore.

          elementsViewInfoArray[i].isElementViewed = true;

          console.log( [ 'send','event', elementsViewInfoArray[i].pageName,'view', elementsViewInfoArray[i].sectionName, { nonInteraction:true } ] );
          ga('send','event', elementsViewInfoArray[i].pageName,'view', elementsViewInfoArray[i].sectionName, { nonInteraction:true } );

          //remove viewed section from array for the site performance.
          elementsViewInfoArray.splice(elementsViewInfoArray[i], 1); 
           

        },  

        // grab elements with data-trackView="something" and put them into array with required info.

        getElementsViewInfo: function getElementsViewInfo(){

          var _this = this;

          $elementsView.each( function(){

            var $this = $(this);

            // only grab visible elements.

            if( $this.is(':visible') ){ 

              var
                data = $this.attr('data-trackView').split(', '),
                argument = [],
                isElementViewed = false;

              argument = { $element: $this, pageName: data[0], sectionName: _this.getAddtionalInfo( data[1] ), isElementViewed: isElementViewed };

              elementsViewInfoArray.push( argument );
            } else { return true; } // if element is hidden. skip and jump to next.

          });

        },  

        // get addional info if sectionName is matched in here.
        getAddtionalInfo: function getAddtionalInfo( sectionName ){
          var 
            thisSectionName = sectionName,
            infoToAdd = '';

          switch ( sectionName ){

            case 'ClassName':
              infoToAdd = $('.m-opDetail-nav__ui .m-opDetail-nav__ui-name').eq(0).text() + '/' + $('.m-opDetail-nav__ui--right .m-opDetail-nav__ui-name').text();
              addInfo( infoToAdd );
              break;

            default:
          }

          function addInfo( infoToAdd ){
            thisSectionName = thisSectionName + ' > ' + infoToAdd;
          }

          return thisSectionName;

        }



      }


    }


    plugin.init();


  }
  trackingEventView();
     

})( jQuery );
  