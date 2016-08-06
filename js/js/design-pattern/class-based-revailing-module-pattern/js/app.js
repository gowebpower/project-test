/*******
    Skeleton: Class Based Revealing Module Pattern
  *******/



var app = app || {}; 

(function(){

  'use strict';

  /*******
    Class
  *******/

  var Person = function( name ){

    this.name = name;
    this.number = 0;

  }

  /*******
    Static Function : Create instance and init plugin.
  *******/

  Person.init = function( name ){
    var person = new Person( name );
    person.pluginInit();
    return person;

  }


  /*******
    Instance Methods
  ********/

  Person.prototype = (function(){

    /**
      Plugin Init
    **/
 
    var pluginInit = function(){
      ui.test.call(this);


      // Gather initial info if needed and init ui.init 
      ui.init.call(this);
    }


    /**
      UI
    **/

    var ui = { 


      init: function(){ 

        // Init ui and add event listner if needed.

      },

      addEvtHandler: function(){

      },

      actions: { 

      },

      components: {

      },

      test: function(){
        // only test purpose
        this.number++;
        console.log(this.number);

      }

    }

    /**
      Public Methods
    
    **/

    return {
      pluginInit: pluginInit,
      test: ui.test

    }

  })();
 

  // Person.prototype.sayHi = function(){
  //   console.log(this.name);
  //   return this;
  // }


  app.person = Person;

})();

var ban = new app.person.init('Ban Park')



app.person.prototype.sayHi = function(){
  console.log(this.name);
}