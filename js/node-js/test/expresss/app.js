var express = require('express');
var app = express();

app.use( express.static('public') );

app.listen(3000, function(){
  console.log('Connected 3000 Port!');

});

app.get('/', function( req, res){

  res.send('Hello Home Page');

  console.log('hjehe')

});