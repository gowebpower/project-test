
// ---------------***************  Event Listener Example

var $d = document;

$d.body.addEventListener('click' ,function(e){
  
  console.log(e);

  e.stopPropagation();
  
}, true )



var ele = $d.querySelector('.aa');

ele.addEventListener('click', function(e){
  
  console.log('inner');


  e.stopPropagation();

})



// ---------------***************  Find first 3 High number in given array.

var arr = [1,23,12,9,30,2,50,4];

function kth(array, k){

  return array.sort( function(a,b){
    
    return b-a;

  }).slice(0, 3)

}

var result = kth( arr, 3 );


console.log("result", result);


// ---------------***************  get queryStrings ( params )
// var queryStrings = window.location.search.substring(1); // value1=a&value2=b
// var queryStringsArray = queryStrings.split('&'); // [value1=a , value2=b]
// var parameters = {};


// for ( let i = 0, length = queryStringsArray.length; i < length; i++ ){

//   let parameter = { };
//   let parameterArray = queryStringsArray[i].split('='); // ['value1','a']

//   parameters[decodeURIComponent(parameterArray[0])] = decodeURIComponent(parameterArray[1]); //{ value1: 'a' }

// }

// console.log("parameters", parameters);


// ---------------***************  get queryStrings ( params ) ***** 2

// var str = "abc=foo&def=%5Basf%5D&xy%5Bz=5"
// var obj = str.split("&").reduce(function(prev, curr, i, arr) {
//     var p = curr.split("=");
//     prev[decodeURIComponent(p[0])] = decodeURIComponent(p[1]);
//     return prev;
// });


// console.log("obj", obj);



// ---------------***************  reduce example  ***** 2

// var a = [1,2,3,4];
// var total = a.reduce(function(obj, curr, i, arr){
  
//   obj.push(curr);
//   return obj

// }, []);


// ---------------***************  Randomize Array   ***** 2
/*var someArray = [1,2,3,4,5,6,7];

function randomizeArray( arr ){

  var randomNum;
  var radomizedArray = [];

  // get randomNumber with given arr.length
  // loop through arr and get random property to push into new array.

  for( let i = 0; i < arr.length; i++){

    randomNum = Math.floor(Math.random() * arr.length )  // if lenth is 5 random number will be 0,1,2,3,4

    radomizedArray.push(arr[randomNum]);

     // remove pushed property from arr.
    arr.splice( randomNum, 1 );

  }

  return radomizedArray;

}

var result = randomizeArray(someArray);

*/


var Foo = function(a){}
Foo.prototype = {

  biz: function(a) { return a;}

}

var f = new Foo(7)


f.biz();
console.log("f.biz()", f.biz());