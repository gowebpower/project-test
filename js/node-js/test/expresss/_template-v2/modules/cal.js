var cal = (function(){

  var method = Cal.prototype;

  function Cal(x, y){
    this.x = x;
    this.y = y;
  }


  method.add = function(){
    return this.x + this.y ;
  }

  return Cal;

})();

module.exports = cal;