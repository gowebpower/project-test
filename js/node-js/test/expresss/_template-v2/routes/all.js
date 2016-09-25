module.exports = function(app){
  
  (function(){
    
    // ************************ 
      // Controllers (route handlers).

    // ************************ 

    const 
      home = require('../controllers/home'),
      about = require('../controllers/about');



    // ************************ 
      // Routes

    // ************************ 
    // notice app.use instead of app.get because controller js is using with express.route

    // ------ Home Page
    
    app.use('', home); 

    // ------ About Page
    app.use('/about', about);


    // example) for general routing
    // app.get('/about', function(req,res){
    //   res.send('about');
    // });

  })();
   

};

