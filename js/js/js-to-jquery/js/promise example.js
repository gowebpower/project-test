//*******************
// Promise Exmaple 
//*****************


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

 

