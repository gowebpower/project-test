
var Person = function( name ){

  this.name = name;

}



var ban = new Person('ban park');
 



 (function() {
  var foo = function(arg) { // core constructor
    // ensure to use the `new` operator

 

    if (!(this instanceof foo)) {
      return new foo(arg);
    }

    // store an argument for this example
    this.myArg = arg;
    //..
  };

  // create `fn` alias to `prototype` property
  foo.fn = foo.prototype = {
    //...
  };

  // expose the library
  window.foo = foo;
})();

// Extension:

foo.fn.myPlugin = function () {
  alert(this.myArg);
  console.log(this);
  return this; // return `this` for chainability
};

foo("bar").myPlugin().myPlugin(); // alerts "bar"