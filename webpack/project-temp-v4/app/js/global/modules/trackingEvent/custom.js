// ************* Custom Tracking Event *************
// ****************************************************
// ****************************************************

const customTrackingEvent = (() => {

  $('.someElement').on('click', function(e) {
    
    // Open Nexon Play
    
    e.preventDefault();
    var game = "SVG011";
    nexon.play(game);

  });
 
})();

export default customTrackingEvent;
