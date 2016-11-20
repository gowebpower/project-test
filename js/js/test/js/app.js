
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


// function getImage( src ){
//   return new Promise( function(resolve, reject){
//     var img = new Image();
//     img.src = src;

//     img.onload = function(){
//       resolve(src);
//     }

//     img.onerror = function(){
//       reject(src);
//     }
//   });
// }


// getImage('http://www.w3schools.com/css/img_fjords.jpg').then( function(src){

//   // var imgHtml = "<img src='" + src + "'/>";

//   var imgHtml = document.createElement('img');
//   imgHtml.setAttribute('src', src);

//   document.getElementById('test').appendChild(imgHtml);

// }, function(src){
//   alert('error');

// });


// getImage('https://cdn.spacetelescope.org/archives/images/large/heic1509a.jpg').then( function(src){

//   // var imgHtml = "<img src='" + src + "'/>";

//   var imgHtml = document.createElement('img');
//   imgHtml.setAttribute('src', src);

//   document.getElementById('test').appendChild(imgHtml);

// }, function(src){
//   alert('error');

// });

// getImage('https://support.files.wordpress.com/2009/07/pigeony.jpg?w=688').then( function(src){

//   // var imgHtml = "<img src='" + src + "'/>";

//   var imgHtml = document.createElement('img');
//   imgHtml.setAttribute('src', src);

//   document.getElementById('test').appendChild(imgHtml);

// }, function(src){
//   alert('error');

// })




function getImage(src){

  return new Promise(function(resolve, reject){

    var img = new Image();
    img.src = src;

    img.onload = function(){
      resolve(src);

    };

    img.onerror = function(){
      reject(src);

    };

  });

}


// getImage('https://cdn.spacetelescope.org/archives/images/large/heic1509a.jpg').then( 
//   function(src){

//     var element = document.createElement('img');
//     var div = document.createElement('div');
//     element.src = src;
//     div.appendChild(element);
    
//     console.log(element.width);

//     document.getElementById('test').appendChild(div);
    

//   }, 

//   function(){
//     alert('fail');
//   }
// )

var images = ['https://cdn.spacetelescope.org/archives/images/large/heic1509a.jpg', 'https://support.files.wordpress.com/2009/07/pigeony.jpg?w=688', 'http://www.w3schools.com/css/img_fjords.jpg'];


function displayImages( images ){
  var targetImage = images.shift();

  if( targetImage ){

    getImage(targetImage).then( 
      function(src){

        var element = document.createElement('img');
        var div = document.createElement('div');
        element.src = src;
        div.appendChild(element);
        console.log(element.width);

        document.getElementById('test').appendChild(div);
        

      }, 

      function(){
        alert('fail');
      }
    )

    displayImages(images);
  }

  

}


// displayImages( images );




function addEvent(elem, evnt, func ){

  if(elem.attachElement){
    elem.attachElement( evnt , func );
  }



  else {

    if ( typeof elem === 'object' ) {

      console.log( 'obj', elem[0] );
      elem[0].addEventListener( event, func );
    }


    elem.addEventListener( evnt, func );
  }
};

// addEvent( document.getElementById('test'), 'click', function(){ alert('asdasd')} );

setTimeout( function(){
  var images = document.getElementsByTagName('img');



  addEvent( images, 'click', function(e){ alert(e)} );



  } , 5000


)


// document.getElementById('test').addEventListener('click', function(){ alert('asd')});


function dReplace( someClass, content){

  var elems = document.getElementsByTagName('*'), i;

  for (i in elems){

    if ( elems[i].className === someClass){
      elems[i].innerHTML = content
    }

  }

  console.log(elems);
  // someClass.innerHTML = ( content );

}

dReplace('change', 'This is new');


function $( className ){

  var i;
  var elems = document.body.children
  var matchedElements = [];
  for( i in elems){
    if(elems[i].className === className){
      matchedElements.push(elems[i]);
    }
  }

  return new $Instance( 'matchedElements' );
}


$Instance = function( elems ){
  this.elems = elems;
  
}

$Instance.prototype = function(){
  var addClass = function(){};
  var removeClass = function(){};
  var find = function(){};
  // so on..


  return {
    addClass: addClass,
    removeClass: removeClass,
    find: find
  }
}

  


 


var something = getElementsByClassName('change');

console.log( something[0].offsetWidth);


