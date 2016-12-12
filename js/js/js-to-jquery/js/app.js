// Reference 
// var Person = function( name ){

//   this.name = name;

// }

// var ban = new Person('ban park');
 

//  (function() {
//   var foo = function(arg) { // core constructor
//     // ensure to use the `new` operator

//     if (!(this instanceof foo)) {
//       return new foo(arg);
//     }

//     // store an argument for this example
//     this.myArg = arg;
//     //..
//   };

//   // create `fn` alias to `prototype` property
//   foo.fn = foo.prototype = {
//     //...
//   };

//   // expose the library
//   window.foo = foo;
// })();

// // Extension:

// foo.prototype.myPlugin = function () {
//   alert(this.myArg);
//   console.log(this);
//   return this; // return `this` for chainability
// };

// foo("bar").myPlugin().myPlugin(); // alerts "bar"

document.addEventListener('DOMContentLoaded', function() {
  (function(){

    var $$ = function(elems){

      // Need extra code to specify other selector. ( #, css nested selectors and etc )
      // var allElems = document.body.children;
      // var i;
      // var matchedElements = []
      // for(i in allElems){

      //   console.log( allElems[i] )
      //   if( allElems[i].classList ){
      //       if ( allElems[i].classList.contains(elems) ) {
      //       matchedElements.push( allElems[i] );
      //     }

      //   }
        
      // }
      

      var matchedElements = document.querySelectorAll(elems);
      console.log(matchedElements);
      return new $$.class(matchedElements);

    };


    $$.class = function(elems){

      this.elems = elems;

    };

    $$.class.prototype = (function(){

      var addClass = function(className){

        // var i;
        // for ( i in this.elems ){
        //   // this.elems[i].classList.add(className);
        //   console.log(i);
        //   // console.log ( this.elems[i].classList ) 
        // }

        // for ( var i = 0, len = this.elems.length; i < len ; i++ ){
        //   this.elems[i].classList.add(className);

        // }

        this.elems.forEach( function(el){
          el.classList.add(className);
        });

        return this;
      };

      var removeClass = function(className){

        for ( var i = 0, len = this.elems.length; i < len ; i++ ){
          this.elems[i].classList.remove(className);

        }

        return this;
      };

      var closest = function(selector){
        // ref  https://gomakethings.com/climbing-up-and-down-the-dom-tree-with-vanilla-javascript/

        var selectorFirstChar = selector.charAt(0);
        var findClosestElement;
        var matchedElements = [];
        // if selector is a class

        if ( selectorFirstChar === '.' ) { 
          findClosestElement = findClass;
        }

        // if selector is an ID

        else if ( selectorFirstChar === '#' ) { 
          findClosestElement = findClass;
        }


        function findClass(el){
          if( el.classList.contains( selector.substr(1) ) ){
            matchedElements.push(el);
          }
        }

        function findID(el){
          if ( el.id === selector.substr(1) ){
            matchedElements.push(el);
          }
        }

        this.elems.forEach( function(el){
          // if el's tagname is not html and is a element node, keep going and then assign el to el's parentNode
          for ( ; el.tagName !== 'html' && el.nodeType === 1;  el = el.parentNode ){

            findClosestElement(el);

          }          

        });

        if( matchedElements ){
          this.elems = matchedElements;
        }

        return this;
      };

      var find = function(selector) {

        var matchedElements = [];

        this.elems.forEach( function(el) {

          var elementFound = el.querySelector( selector );
          if (elementFound) { 
            matchedElements.push( elementFound );
          }

        });

        this.elems = matchedElements;

        return this;

      };

      var on = function( action , fn, eCapturing ){
        // false is default which is eventBubbling.
        // to stop capturing and bubbling, use e.stopPropagation();
        var eventCapturing = false;
        if ( eCapturing === true ) { eventCapturing = true; };

        this.elems.forEach( function(el){

          el.addEventListener( action, fn, eventCapturing );

        });

        return this;
      }

      var test = function( ){
        console.log(this.elems)
     
        return this;
      };

      return {
        constructor: $$.class,
        addClass: addClass,
        removeClass: removeClass,
        closest: closest,
        find: find,
        on: on,
        test: test

      }

    })();

    window.$$ = $$;

  })();
});


document.addEventListener('DOMContentLoaded', function() {

  $$('.change').addClass('testClass');
  $$('.change').find('.aaa').addClass('founded');
  // $$('.aaa').closest('.change').addClass('asdasdasdasdasdasd');
  $$('.change').on( 'click', function(e){
    
    e.stopPropagation();
    console.log(e);

    // For event delegation: Build this part later
    // if(e.target && e.target.nodeName == "LI") {
    //   console.log("List item ", e.target.id.replace("post-", ""), " was clicked!");
    // }

  });

});





