// ************************
  // Module dependencies.

// ************************ 

const 
  express = require('express'),
  app = express();


// ************************ 
  // Express Settings

// ************************

// ------ Port
app.listen(3000, function(){
  console.log('Connected 3000 Port!');

});


// ************************ 
  // Controllers (route handlers).

// ************************

// Home page 

app.get('/', function(req, res){

  res.send('Home Page');

});

 
  


























