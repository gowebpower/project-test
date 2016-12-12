// ************* Episode Listing *************
// ****************************************************
// ****************************************************

( function( $ ) {

  "use strict";

  var episodeEndicator = function episodeEndicator( elem, options ){
    
   /*********
   * Default options & initial vars
   */

    var 
      plugin = {},
      ui = { },
      $currentSeasonWrapper = $('.m-episodes-listing-nav__season.current'),
      $listingItem = $('.m-episodes-listing__item'),
      $navUL,
      $navItem,
      $navIndicator,
      $navWrapper = $('.m-episodes-listing-nav__wrapper'),
      $footer = $('footer'),
      $pageContainer = $('.m-episodes-listing'),
      html = '<div class="m-episodes-listing-nav__episode-wrapper">\
                <ul class="m-episodes-listing-nav__episode"> \
                </ul>\
                <div class="m-episodes-listing-nav__episode-indicator">\
                  <div class="wrapper">\
                    <div class="gauge-bg"></div>\
                    <div class="gauge-charged"></div>\
                  </div>\
                </div>\
              </div>';

    plugin.settings = {};

    /*********
     * Plugin Initial func
     */

    plugin.init = function(){

      ui.init();

    }


    /*********
     * UI
     */

    ui = { 

      // ********************
      // -------------------- Initiate UI

      init : function( clickedIndex ) {

        // build initial html in left nav. 
        this.build();

        // grab elements after build 
        this.grabElementsAfterBuild();
        
        // Put Episodes listing to the left Nav.
        this.actions.renderEpisodes();

        // grab elements after episodes are rendered
        $navItem = $('.m-episodes-listing-nav__episode li');
       
        this.bindEvents();

      },


      // ********************
      // -------------------- Build Basic HTML UI
      build : function( index ) {
        
        // Put initial html to the current season in the left Nav.
        $currentSeasonWrapper.append(html);
       
      },

      // ********************
      // -------------------- grabElementsAfterBuild

      grabElementsAfterBuild: function( index ) {

        // grab elements after html is built.
        $navUL = $('.m-episodes-listing-nav__episode');
        $navIndicator = $('.m-episodes-listing-nav__episode-indicator .gauge-charged');

      },


      // ********************
      // -------------------- Binds Events
      bindEvents: function(){

        var 
          $this = this,
          userActions = 'scroll resize orientationchange';
 
        $(window).on( userActions, function(){

          // update indicator UI bar and put active class depending on user's scroll
          $this.actions.updateNav();

          $this.actions.updateNavPosition();

        });
        
        $this.actions.updateNav();
        $this.actions.updateNavPosition();
      },


      // ********************
      // -------------------- Actions 

      actions: {

        // render episodes listing to left Nav
        renderEpisodes: function(){

          var html = ui.comps.makeEpisodeHTML();
 
          $navUL.hide().append(html).fadeIn('slow');
          setTimeout( function(){
            $navUL.addClass('show');
          }, 200 )
        },

        // update indication bar depends on user's scroll-Y
        updateNav: function(){

          var newRatioPercentage = ui.comps.getDynamicRatioForNav( ui.comps.getScrolledPosition() );
          $navIndicator.css({height: newRatioPercentage});

        },


        // change fixed positioned left Nav to absolute if it's height reaches to the footer. ( Avoids overlapping )
        updateNavPosition: function(){

          var 
            windowYoffset = window.pageYOffset,
            windowHeight = window.innerHeight,
            footerOffset = $footer.offset().top,
            footerHeight = $footer.height(),
            totalScrolledHeight  = windowYoffset + $navWrapper.height() + $pageContainer.find('.l-row-container').position().top,
            containerPaddingBottom = $pageContainer.css('padding-bottom');

          // if ( window y offset + left nav height + distance between window top and nav ) reaches to footer y offset
          if ( totalScrolledHeight > footerOffset ){

            // need to put padding bottom from container.
            $navWrapper.css({ position: 'absolute', bottom: '-' + containerPaddingBottom, top: 'auto' })
 
          } else $navWrapper.css({ position: 'fixed', top: 'auto', bottom: 'auto' })

 
        }

      },


      // ********************
      // -------------------- Components

      comps: {

        // get episode info ( title, episode#, Yoffset ) from big thumbnail listing.
        getEpisodeInfo: function(){
          var 
            allEpisodesInfo = [],
            $Episodes;

          $Episodes = $('.m-episodes-listing__item');

          $Episodes.each( function( i, e){

            var 
              index,
              header,
              episode,
              yOffset,
              Id,
              $this = $(e);

            header = $this.find('.m-episodes-listing__item-title').html();
            episode = $this.find('.m-episodes-listing__item-episode').attr('for-nav');
            index = $this.find('.m-episodes-listing__item-episode').data('index');
            yOffset = e.offsetTop;
            Id = $this.attr('id');

            // $this is not being used.

            allEpisodesInfo.push({ 'header': header, 'episode': episode, 'yOffset': yOffset, 'Id': Id,'index':index  });

          });

          return allEpisodesInfo;

        },

        // make episode html for "left Nav" with info gathered from comps.getEpisodeInfo() | Not rendered yet.
        makeEpisodeHTML: function(){

          var 
            allEpisodesInfo = this.getEpisodeInfo(),
            html = '';
          allEpisodesInfo.forEach( function( e, i ){
            html += '<li><a href="#' +e.Id +'"><div class="m-episodes-listing-nav__episode-col1" data-i18n="site.p.epiListing.ep" data-i18n-options=\'{"index":"'+ e.index+'"}\'></div>\
            <div class="m-episodes-listing-nav__episode-col2">' + e.header +'</div></a></li>' ;
          } )

          // for( var i in allEpisodes ) {
          //   html += '<li><a><div class="m-episodes-listing-nav__episode-col1>"' + i.episode + '</div>\
          //   <div class="m-episodes-listing-nav__episode-col2>' + i.header +'</div></a></li>' ;
          // }

          return html;

        },


        // Get the scroll position in percentage from listing items in the center. ( only listing items from top )
        getScrolledPosition: function(){

          var 
            scrolledPosition,
            offSetPoint = 0, // Cross line
            windowYoffset = window.pageYOffset,
            elementOffset = $listingItem.offset().top,
            elementsTotalHeight = $listingItem.outerHeight(true) * $listingItem.length;


          // windowYoffset(elementsTotalHeight);
          
          if( windowYoffset >= offSetPoint && windowYoffset < ( offSetPoint + elementsTotalHeight ) ){ 
            // if windowYoffset is reached to the specified point and less than combined total.
            // get scrolled poisition in percentage after offSetPoint

            scrolledPosition =( ( windowYoffset - offSetPoint ) / elementsTotalHeight ) * 100 ;
            scrolledPosition = Math.round( scrolledPosition );

          } else if( windowYoffset >= ( offSetPoint + elementsTotalHeight) ) { 
            // if windowYoffset is reached to the combined total ( offsetpoint + elementsTotal Height )
            // set 100%
     
            scrolledPosition = 100;

          } else {
     
            scrolledPosition = 0;

          }

          // console.log( 'windowYoffset' + windowYoffset + ', combind' + (offSetPoint + elementsTotalHeight) );

          return scrolledPosition;

        },


        // Height for each li can be different if title goes into 2nd or 3rd row.
        // So converting static percentage into dynamic percentage depends on the ration of li.

        getDynamicRatioForNav: function( scrolledPosition ){


          var
            newTotalPercent = 0,
            partialPercent,

            $elementLength = $listingItem.length,
            divider = 100 / $elementLength;

          for( var i = 0; i < $elementLength; i++ ){

            // loop through each item and
            // get each element's unique ratio of total height of parent's element ( if texts are long enough to go 2nd row or 3rd row )
            var itemRatio = Math.round( $navItem.eq(i).outerHeight(true) ) / Math.round( $navUL.height() ) * 100;
            // elementRatio = ( $navItem.eq(i).height() / $navItemParent.height() ) * 100;


            if ( scrolledPosition >= divider ){
              // scrolledPosition will be subtracted on each loop.
              // if 'remaining' scrolledPosition is highter than divider.
              // get this full percentage(divider) with it's unique ratio and add to newTotalPercent.
              partialPercent = ( itemRatio / divider ) * divider;
              scrolledPosition -= divider;

              newTotalPercent +=  partialPercent;

            }
            else if ( scrolledPosition < divider ) {

              // if 'remaining' scrolledPosition is lower than divider
              // get remaning scrolledPosition with with it's unique ratio and add to newTotalPercent.
              // then break.

              partialPercent = ( itemRatio / divider ) * scrolledPosition;

              newTotalPercent +=  partialPercent; 

              // put active on 'remaining' scrolled Position. >> current position.
              this.putActiveOnNav( i, newTotalPercent );
              
              break;
            }
            

            // console.log('test ' + newTotalPercent + 'oldTotalP '+ scrolledPosition);
            // console.log( 'this ' + partialPercent );
          }

          return newTotalPercent + '%';

        },

         // **** put active current section
        putActiveOnNav: function( i , newTotalPercent ){

          $navItem.not($navItem.eq(i)).removeClass('active');
          $navItem.eq(i).addClass('active');

          // if percent is less than 0, dont put active
          if ( i === 0 && newTotalPercent < 1 ) { 
            $navItem.eq(i).removeClass('active');
          }

        }

      } // comps ended

    } // ui ended


    plugin.init();


  }
  episodeEndicator();


  // ------------ Smooth Scroll ------------

  $('a[href*=#]:not([href=#])').click(function () { 

    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {  
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');  
        if (target.length) {
            $('html,body').animate({
                scrollTop: (target.offset().top - $('.m-episodes-listing__top').height() ) 
            }, 580);
            return false;
        }
         
    }
  });
     

})( jQuery );