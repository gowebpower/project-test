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
app.set('views', './src/server/views');

// output pretty html
app.locals.pretty = true;



// ************ 
  // Pages

// ************ 

app.get('/', function( req, res){

  // res.send('Hello Home Page');

  res.render('index', { title: 'This is title' });

  // console.log('hjehe')

});


app.get('/topic', function( req, res){

  // res.send('Hello Home Page');

  res.send(req.query);

  // console.log('hjehe')

});


app.get('/about', function( req, res){

  res.send('This is about page');

});

app.get('/contact', function( req, res){

  res.render('contact');
   

});

app.get('/contact_receiver', function( req, res){

  res.send(req.query);
    
});