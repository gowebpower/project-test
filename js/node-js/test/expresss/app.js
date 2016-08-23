// ************ 
  // Import

// ************ 

var express = require('express');
var app = express();

app.listen(3000, function(){
  console.log('Connected 3000 Port!');

});




// ************ 
  // Setting

// ************ 

// ------------ Static file
app.use( express.static('public') );


// ------------ Template Engine 

// Set which template engine 
app.set('view engine', 'pug');

// Set which folder
app.set('views', './views');



// ************ 
  // Pages

// ************ 

app.get('/', function( req, res){

  // res.send('Hello Home Page');

  res.render('index');

  // console.log('hjehe')

});


app.get('/about', function( req, res){

  res.send('This is about page');

});

app.get('/contact', function( req, res){

  var list = '';

  for( var i=0; i < 100; i++){
    list = list + '<li> coding </li>';

  }


  var output = `
    <html>
      <head>
        <title></title>
      </head>
      <body>

        <h1>asdasd</h1>
        <div>This is thid</div>

        <ul>
          ${ list }
        </ul>

      </body>
    </html>
  `
  res.send(output);

});