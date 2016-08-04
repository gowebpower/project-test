
var app = app || {}; 

(function(){

  var Person = function( name ){

    var varName = name;
    this.name = name;

  }
  Person.prototype.sayHi = function(){
    console.log(this.name);
    return this;
  }


  app.Person = Person;

})();



var ban = new app.Person('ban park');


ban.sayHi().sayHi();
 