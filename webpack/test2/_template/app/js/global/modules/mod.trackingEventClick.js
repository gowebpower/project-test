// ************* Tracking Event Click *************
// ****************************************************
// ****************************************************
// How to use this
/**
  - For Global Tracking Event with Source -

    add the following code to the element that need to be tracked.
      data-trackClick="< element name >, source"  
      >>> ex) data-trackClick="Top Nav > Game, source"     

    add add the following code to the section that need to grabbed for the Global tracking.
      data-trackSection="< section name >"  
      >>> ex) data-trackSection="Home-USP"


  - For Global Tracking Event without Source -

    add the following code to the element that need to be tracked.
      data-trackClick="< element name >"  
      >>> ex) data-trackClick="Top Nav > Game"     


  ----------------------------------------------------------

  - For Tracking Event with custom event handler -

    Run the following code with event handler

      app.trackingEventClick( elem, info );  info is array  [ < page name >, < element name> ]
      >>> ex) app.trackingEventClick( this, [ 'Game', 'KeyFeatures > Left Arrow ']  ); 
      
      $('.someElement').on('click', function(){

        app.trackingEventClick( this, [ 'About', 'KeyFeatures > Left Arrow '] );
        // output > ["send", "event", "About", "click", 'KeyFeatures > Left Arrow '] 

      });

      For some situation, if this needs to trigger as "view", 

        app.trackingEventClick( this, [ 'About', 'KeyFeatures > Left Arrow '], 'view' );
        // output > ["send", "event", "About", "view", 'KeyFeatures > Left Arrow ', { nonInteraction:true }]

*/


window.app = window.app || {};
const projectName = window.app.projectName.trackingEvent;

module.exports = (function(){
  ( function( $, window, document, undefined ) {

   
    var trackingEventClick = function trackingEventClick( elem, info, eventType ){
      
     /**
     * Default options & initial vars
     */
      
      var
        plugin = {},
        ui = {};
      
      if (elem) { // if trackingEventClick runs by app.trackingEventClick( elem, info ) seperately with custom event handler. Go this route.
        // any contional statement with 'isCustomFunction' in functions below, means this.
        // It skips adding Event handler and put elem & info from argument directly.

        var isCustomFunction = true;
          // $thisElement = $( elem ),
          

      } 
      // if trackingEventClick itself runs from event handler triggered from html markup.
      else { 

        var
          $header = $('header'),
          $elements = elem ? elem : $('[data-trackClick]'),
          $thisElement,
          isCustomFunction = false,
          globalName = projectName;
      }

      // plugin.settings = { };

      /**
       * Plugin Initial func
       */

      plugin.init = function(){

        if( isCustomFunction ){ 

          // skip adding eventHadler 
          ui.actions.sendTrackingEvent(elem);

        }

        else {  
          ui.init();
        }

      }


      /**
       * UI
       */

      ui = { 

        // ********************
        // -------------------- Initiate UI

        init : function init() { 
          this.bindEvents();
        },

        bindEvents: function bindEvents(){

          var
            click = 'click',
            scroll = 'scroll resize orientationchange',
            $this = this;


          // add eventHanler to all global and general simple assets that needs to be event tracked.
          $elements.on( click,  function(e){
            // e.preventDefault(); for dev
            $this.actions.sendTrackingEvent(this);

          });

        },

        actions: {

          sendTrackingEvent: function sendTrackingEvent(clickedElement){

            if( !isCustomFunction ){

              $thisElement = $(clickedElement);

            }

            console.log( ui.comps.getArgument() );
            ga.apply(this, ui.comps.getArgument() );
          
          }

        },

        comps: {

          // get overall arguments that are required to send with ga()
          getArgument: function getArgument(){

            var 
              argumentPrefix = ['send','event'],
              argument = [],
              data;


            // if custom function
            if( isCustomFunction ){

              data = info; // from argument that is passed from app.trackingEventClick( elem, info, eventType );

              if( !eventType ) { 

                argument = [ data[0], 'click', data[1] ];

              } else if(eventType === 'view'){

                argument = [ data[0], eventType, data[1], { nonInteraction:true } ];

              }
            } 

            // if data attribute 
            else { 

              data = $thisElement.attr('data-trackClick').split(',');

              if (data[1]) { 
                // remove empty space
                data[1] = data[1].trim();
              }

              switch ( data[1] ) { 

                // For data-trackClick with source
                case 'src':
                  argument = [ globalName, 'click', data[0] + "(" + this.getCurrentSection() + ")"];
                  break;

                // For data-trackClick
                case undefined:
                  argument = [ globalName , 'click', data[0] ];
                  break;

                // not used for now
                default:
                  argument = [ globalName , 'click', data[0] ];
              }

            }

            
            argument = argumentPrefix.concat(argument);
            return argument;
            
          },

          
          // grab which section this event is fired from. ex: data-trackSection="Home-Hero"
          getCurrentSection: function getCurrentSection(){
      
            var 
              $allSection = $('[data-trackSection]'),
              currentSection = $allSection.eq(0).attr('data-trackSection');

            for ( var i = 0; i < $allSection.length; i++ ) { 
             
              if ( window.pageYOffset >= $allSection.eq(i).offset().top - ( window.innerHeight / 3 ) ){

                currentSection = $allSection.eq(i).attr('data-trackSection');

              }
            }

            return this.getSectionDetail(currentSection);
           
          },

          // get section detail if there is any.    
          // For certain section, if we need to grab some element's info. ex) Home-Hero( carousel-Info )
        
          getSectionDetail: function getSectionDetail( currentSection ){

            var 
              currentSection = currentSection,
              sectionDetail = '',
              infoToAdd = '';

            switch ( currentSection ){
              case 'Example':
                infoToAdd = $('.Exmple-div').text();
                combine( infoToAdd );
                break;
              default:
            }

            function combine( string ){
              sectionDetail = '-[' + string + ']';
            }

            return currentSection + sectionDetail;
          }
        }


      }

      plugin.init();

    };

    window.app.trackingEventClick = trackingEventClick;

    window.app.trackingEventClick();

  })( jQuery, window, window.document );
})();