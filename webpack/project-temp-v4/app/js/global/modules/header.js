
const header = (() => {

  $('.header__CTA').on('click', function(e) {
    
    // Open Nexon Play
    
    e.preventDefault();
    var game = "SVG011";
    nexon.play(game);

  });
 
})();

export default header;



 
 


  

  
 