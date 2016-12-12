var app = app || {};


(function($, window, document, appUtility, undefined) {

    



    // ------------------ Play on Nexon Launcher ------------------

    ( function() {

      $('.header__btn-play').on('click', function(e) {
        
        e.preventDefault();
        var game = "SVG011";
        nexon.play(game);

      });

     
    })();


}( jQuery, window, window.document, app.utility ));

 
 


  

  
 