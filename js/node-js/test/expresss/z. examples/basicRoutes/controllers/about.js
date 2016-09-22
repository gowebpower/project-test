module.exports = function(){

  const 
    express = require('express'),
    route = express.Router();

  route.get('/', function(req, res){
    res.render('about');
  });

  return route;
};