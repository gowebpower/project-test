// ************************
  // Module dependencies.

// ************************ 

const 
  express = require('express'),
  app = express();

const session = require('express-session');
const bodyParser = require('body-parser');
const mySQLStore = require('express-mysql-session')(session);





// ************************ 
  // Express Settings

// ************************


// ------ Session
// most default setting

var options = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'audition0101',
    database: 'session-test'
};

var sessionStore = new mySQLStore(options);


app.use(session({
  secret: 'asdasdasdasdasdasdasd', // random texts should be filled like this. I dont know why.
  resave: false,
  saveUninitialized: true,
  store: sessionStore
}));

// ------ Port
app.listen(3000, function(){
  console.log('Connected 3000 Port!');

});


// ------  Body Parser
app.use(bodyParser.urlencoded({ extended: false }) );
app.use(bodyParser.json());




// ************************ 
  // Controllers (route handlers).

// ************************

// --------- session example: Login 

app.get('/welcome', function(req, res){

  if(req.session.loginStatus) { 

    res.send(`
      <h1> Hello, ${req.session.displayName}</h1>
      <a href="/auth/logout">logout</a>
    `);

  } else res.send(`
      <h1> Welcome. Please Login</h1>
      <a href="/auth/login">Login</a>
    `);

});


app.get('/auth/login', function(req, res){

  var output = `
    <h1>Please Login</h1>
    <form action="/auth/login" method="post">
    <p>
      <input type="text" name="username" placeholder="username">
    </p>
    <p>
      <input type="password" name="password" placeholder="password">
    </p>
    <p>
      <input type="submit">
    </p>
  </form>
  `;

  res.send(output);

});



app.post('/auth/login', function(req, res){


  var user = {
    username: 'egoing',
    password: '111',
    displayName: 'Egoing'
  }

  var username = req.body.username;
  var pwd = req.body.password;

  if ( username === user.username && pwd === user.password ){

    // this session obj is now connected to the session ID in the browser. Actual data is stored in memory
    req.session.displayName = user.displayName;
    req.session.loginStatus = true;

    // Make sure redirect fires once session saves into data (sessionStore)
    req.session.save(function(){
      res.redirect('/welcome');
    });
  } else {
    res.send('who are you');
  }

});



app.get('/auth/logout', function(req, res){

  delete req.session.loginStatus;

  // Make sure redirect fires once session saves into data (sessionStore)
  req.session.save(function(){
    res.redirect('/welcome');
  });

  
});









 

 
  


























