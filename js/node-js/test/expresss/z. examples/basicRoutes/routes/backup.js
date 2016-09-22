module.exports = function(app){

  const 
    express = require('express'),
    route = express.Router();
    

  // ************************ 
  // Home

  // ************************
  var home = require('./home/route')(app);
  app.use('', home);


  // ************************ 
  // About

  // ************************
  var about = require('./about/route')(app);
  app.use('/about', about);


  // example) general routing
  // app.get('/about', function(req,res){
  //   res.send('about');
  // });

  return route;

};

 