// ************************
  // Module dependencies.

// ************************ 

const 
  express = require('express'),
  app = express();

const session = require('express-session');
const bodyParser = require('body-parser');
const mySQLStore = require('express-mysql-session')(session);

const 
  bkfd2Password = require("pbkdf2-password"),
  hasher = bkfd2Password(),
  hasherOpts = { 
    password: '111'
  }




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
    database: 'register-login'
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


// --------- Global Data

var usersDB = [

  // actual password is 111. hash = hasher() w/ password + salt. so hash is encrypted password.
  {
    username: 'egoing',
    salt: 'egceCc7gVuTLMm5zUXWjcI98aE0lBVG8WJx6Ee4+jExnB2V2EJvGw/OOX/cJzTAT7ZSm6DruW/bAg9maKscrGg==',
    hash: 'vxneLEzBwpy1SVvAtXFD7A/K1qTdzX0GWbaHzaP1xHUWoEhu0BU4BsMKCx+HYFkCN8vy3LHML8lPXLY5X312yNeks8cD5FOZVSxJm/2gRm1xoSdTAZzzYsPjk3jB92hkxbG2agqUrtdDrnn6XocjQWJookVOJRqKe80A1VXG/tE=',
    displayName: 'Egoing'
  }

];



// --------- Welcome

app.get('/welcome', function(req, res){

  if(req.session.loginStatus) { 

    res.send(`
      <h1> Hello, ${req.session.displayName}</h1>
      <a href="/auth/logout">logout</a>
    `);

  } else res.send(`
      <ul>
        <li><h1> Welcome. Please Login</h1></li>
        <li><a href="/auth/login">Login</a></li>
        <li><a href="/auth/register">Register</a></li>
      </ul>
    `);

});


// --------- Login

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
 

  var receivedUsername = req.body.username;
  var receivedPwd = req.body.password;

  for( var i=0; i < usersDB.length; i++ ){

    var user = usersDB[i]


    if ( receivedUsername === user.username){

      // cus there is call back, this function is returnning to avoid fireing function outisde of for in loop.
      // pass salt from fake DB ( usersDB ) and compare if this hash is same as the has in the fake DB.
      return hasher( { password: receivedPwd, salt: user.salt  }, function(err, pass, salt ,hash){

        if( hash === user.hash ){

          // this session obj is now connected to the session ID in the browser. Actual data is stored in mySQL
          // only save small data to session and big data should be fetched from DB depends session status.
          req.session.userName = user.userName;
          req.session.displayName = user.displayName;
          req.session.password = user.password;
          req.session.loginStatus = true;

          // Make sure redirect fires once session saves into data (sessionStore)
          // return this function because save() takes time to run redirect. 
          // So it prevent to send() below once username is matched.
          req.session.save(function(){
            res.redirect('/welcome');
          });

        } else { 
          res.send('who are you? <a href="/auth/login">Login</a>');
        }

      });
 
    }
  }

  res.send('who are you? <a href="/auth/login">Login</a>');

});



app.get('/auth/logout', function(req, res){

  delete req.session.loginStatus;

  // Make sure redirect fires once session saves into data (sessionStore)
  req.session.save(function(){
    res.redirect('/welcome');
  });

  
});


// --------- Register


app.get('/auth/register', function(req, res){

  var output = `
    
    <h1>Register</h1>

    <form action="/auth/register" method="post">
      <p>
        <input type="text" name="username" placeholder="username">
      </p>
      <p>
        <input type="password" name="password" placeholder="password">
      </p>
      <p>
        <input type="text" name="displayName" placeholder="displayName">
      </p>
      <p>
        <input type="submit">
      </p>
    </form>
  `

  res.send(output);

});


app.post('/auth/register', function(req, res){

  // add new userinfo to global varabile ( currently fake db but need to use on actual db for later )


  hasher({ password: req.body.password  }, function(err, pass, salt ,hash){

    usersDB.push({

      username: req.body.username,
      salt: salt,
      hash: hash,
      displayName: req.body.displayName 

    });

    console.log(usersDB);

    
    // Save quick data to session which saves to db
    req.session.userName = req.body.username;
    req.session.displayName = req.body.displayName;
    req.session.password = req.body.password;
    req.session.loginStatus = true;


    req.session.save(function(){
      res.redirect('/welcome');
    });

  });


});

 








 

 
  


























