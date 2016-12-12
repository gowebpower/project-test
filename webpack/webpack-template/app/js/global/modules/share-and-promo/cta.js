/**
 * Play Free Now Button
 * Opens the Signup Overlay
 */

window.app = window.app || {};

window.app.Cta = (function($, window, document){

    var init = function() {

        // opens gnt signup overlay
        $("#mscta").on('click',function(e){
            e.preventDefault();
            if (nexon && nexon.gnt) {
                nexon.gnt.fspopupSignup('#mscta');
            }
        });
    };

    return {
        init: init
    };

}(jQuery, window, window.document));

