// ************************
  // Module dependencies.

// ************************ 

var express = require('express');
var app = express();



// ************************ 
  // Express Settings

// ************************

app.listen(3003, function(){
  console.log('connected');
});



// ------ Template Engine 

// Set which template engine 
app.set('view engine', 'pug');

// Set which folder
app.set('views', './views');

// output pretty html
app.locals.pretty = true;



// ************************ 
  // Custom Modules

// ************************

var Cal = require('./modules/cal');
var numbers = new Cal(5,8);
console.log(numbers.add());



// ************************ 
  // Routes

// ************************

var appRoutes = require('./routes/all')(app);
 

