
/**
 * Animated Leaf
 */

window.app = window.app || {};

window.app.leaf = (function($, Event) {

  Event.on('animatePoints',function(data){
    render(data.$cont, data.points);
  });

  function render($cont, pts) {
      var i,c;
      c = pts < 5 ? pts : 3;
      for(i=0;i<c;i++) {
          animateLeaf($cont);
          setTimeout(function(){
              animateLeaf($cont);
          },200)
          setTimeout(function(){
              animateLeaf($cont);
          },400)
          setTimeout(function(){
              animateLeaf($cont);
          },600)
          setTimeout(function(){
              animateLeaf($cont);
          },800) 
      }
  }

  function animateLeaf($cont) {
      var $leaf = $('<img class="leaf" src="img/leaf.png"/>');
      $leaf.css({
          position: "absolute",
          pointerEvents: "none",
          top: "0px",
          left: (Math.random() * 100).toFixed(0) + "px"
      });
      $cont.append($leaf);
      $leaf.animate({
          top: "-=40",
          left: "+=" + (Math.random() * 100).toFixed(0)
      },500, function(){
          $leaf.animate({
              top: "+=400",
              left: "-=" + (Math.random() * 500).toFixed(0),
              transform: "scale(0.5)",
              opacity: 0
          },3000, function(){
              $leaf.remove();
          })
      })
  }

  return {
    render: render
  };

}(jQuery, window.app.Event));


