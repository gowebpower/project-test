module.exports = (function(){

  if($){

    setTimeout(
      function(){
        console.log('jquery is included');
        $('body').css('background','grey');

      }, 700

    );
    
  }

  console.log('home/module-a');

})();
  
  

 





 