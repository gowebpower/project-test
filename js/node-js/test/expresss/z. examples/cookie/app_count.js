// ************************
  // Module dependencies.

// ************************ 

const 
  express = require('express'),
  app = express();
  
const cookieParser = require('cookie-parser');


// ************************ 
  // Express Settings

// ************************

// ------ Port
app.listen(3000, function(){
  console.log('Connected 3000 Port!');

});

// -- Cookie
app.use(cookieParser());



// ************************ 
  // Controllers (route handlers).

// ************************ 

app.get('/', function(req, res){
  var cookieCount;

  // when first connect to the server, there is no cookie set yet.
  if ( req.cookies.count ) {

    // from browser coockie
    cookieCount = parseInt(req.cookies.count);

    // overide new coockie
    setCookie(++cookieCount);

  } else { 

    cookieCount = 0;

    setCookie(cookieCount);
    
  }

  function setCookie(count){

    // send coockie to browser and browser will save its cookie in its Storage.
    res.cookie('count', count);

    // render 
    res.send(`count: ${count}`);

  }

});

 


  


























