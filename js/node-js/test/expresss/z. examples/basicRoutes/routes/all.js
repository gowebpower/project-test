module.exports = function(app){
  
  var routes = function(){
    
    // ************************ 
    // Home

    // ************************
    // notice app.use instead of app.get and needs to pass app in require()
    // because controller tries to render pug, it will look for app setting for template engine.

    var home = require('../controllers/home')(app);
    app.use('', home); 


    // ************************ 
    // About

    // ************************
    var about = require('../controllers/about')(app);
    app.use('/about', about);


    // example) general routing
    // app.get('/about', function(req,res){
    //   res.send('about');
    // });

  }

  return routes;

};

 