// document.getElementById('test').addEventListener('click', function(){ alert('asd')});


//*******************
// Replace
//*****************

function contentReplace( someClass, content){

  var elems = document.getElementsByTagName('*'), i;

  for (i in elems){

    if ( elems[i].className === someClass){
      elems[i].innerHTML = content
    }

  }

  console.log(elems);
  // someClass.innerHTML = ( content );

}

contentReplace('change', 'This is new');

//*******************
// getElementsByClassName like jQUery
//*****************

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


//*******************
// AddEvent
//*****************



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

//*******************
// Reverse
//*****************
reverse = function(s) {
  var o = '';
  for (var i = s.length - 1; i >= 0; i--)
    o += s[i];
  return o;
}

// Uppercase first letter in array with mapping

var ary = ["ab", "bas", "casd", "dasd", "e", "f", "g"];

var newAry = ary.map(function( elem){
  console.log(elem);
  return elem.charAt(0).toUpperCase() + elem.slice(1);

});

// Array.prototype.map.call( ary, function(e){
//   console.log(e);
// })



//*******************
// Uppercase
//*****************

var sString = 'somestring';

String.prototype.capitalize = function(){
  return this.charAt(0).toUpperCase() + this.slice(1);

}

sString.capitalize();
alert(sString.capitalize())

console.log(newAry)

