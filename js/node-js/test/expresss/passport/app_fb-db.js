// ************************
  // Module dependencies.

// ************************ 

const 
  express = require('express'),
  app = express();

const session = require('express-session');
const bodyParser = require('body-parser');
// const fileStore = require('session-file-store')(session);
const mySQLStore = require('express-mysql-session')(session);


const 
  passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy,
  FacebookStrategy = require('passport-facebook').Strategy;

const 
  bkfd2Password = require("pbkdf2-password"),
  hasher = bkfd2Password(),
  hasherOpts = {};

const flash = require('connect-flash');


const 
  mysql      = require('mysql'),
  con = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'audition0101',
    database : 'register-login'
  });

  con.connect();


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
  store: sessionStore // For storing
}));

// ------ Port
app.listen(3000, function(){
  console.log('Connected 3000 Port!');

});


// ------  Body Parser
app.use(bodyParser.urlencoded({ extended: false }) );
app.use(bodyParser.json());


// ----- Passport
app.use(passport.initialize()); // initialize passport
app.use(passport.session()); // use session when passport's authentication kicks in. ( maybe)


// ----- Flash

app.use(flash());



// ************************ 
  // Controllers (route handlers).

// ************************


// --------- Global Data

// for local
var usersDB = [
  // actual password is 111. hash = hasher() w/ password + salt. so hash is encrypted password.
  { 
    authId:'local:egoing',
    userName: 'egoing',
    salt: 'egceCc7gVuTLMm5zUXWjcI98aE0lBVG8WJx6Ee4+jExnB2V2EJvGw/OOX/cJzTAT7ZSm6DruW/bAg9maKscrGg==',
    hash: 'vxneLEzBwpy1SVvAtXFD7A/K1qTdzX0GWbaHzaP1xHUWoEhu0BU4BsMKCx+HYFkCN8vy3LHML8lPXLY5X312yNeks8cD5FOZVSxJm/2gRm1xoSdTAZzzYsPjk3jB92hkxbG2agqUrtdDrnn6XocjQWJookVOJRqKe80A1VXG/tE=',
    displayName: 'Egoing'
  }

  // for facebook ID
  // {
  //   authId: facebook: [fadebook.id],
  //   userName: [fadebook.id],
  //   displayName: [facebook.displayName],
  //   email: [ facebook.emails[0].value ] //facebook emails is obj
  // }

];

// CREATE TABLE users ( 
//     id INT NOT NULL AUTO_INCREMENT , 
//     authId VARCHAR(50) NOT NULL ,
//     username VARCHAR(30), 
//     hash VARCHAR(255), 
//     salt VARCHAR(255),
//     displayName VARCHAR(50),
//     email VARCHAR(50) NOT NULL , 
//     PRIMARY KEY (id), 
//     UNIQUE (authId)
// ) ENGINE = InnoDB;

 


// --------- Welcome

app.get('/welcome', function(req, res){

  if(req.user) { 

    res.send(`
      <h1> Hello, ${req.user.displayName}</h1>
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


// --------- Login: Local

app.get('/auth/login', function(req, res){

  console.log(req.flash('error'));
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

    <a href="/auth/facebook">facebook</a>

  `;

  res.send(output);

});


/*
  Passport.serializedUser() kicks in when user successfully login in passport.use(new LocalStrategy( function() )). 
  And then it saves user ID in session. And then whenever page refreshes, passport.deserializedUser() kicks in to get more data for that ID saved in session.
*/

// Only save smallest data that distinguish itself such as id or username ( to grab big data later )
passport.serializeUser(function(user, done) {
  console.log('serializeUser:' + user.authId);
  done(null, user.authId); // saves in session
});

// Search More data with authId found in session cookie in the browser.
passport.deserializeUser(function(id, done) {
  
  // id in parameter is user.authId from serializeUser()

  console.log('deserializeUser');

  var sql = "SELECT * FROM users WHERE authId=?";
  con.query(sql, [ id ], function(err, results){ 

    console.log(results);

    // If there is err for some reason.
    if(err){

      console.log(err);
      done('There is no user.');

    } else{

      done(null, results[0]);

    }

  });

 

});



// 'run local strategy': This will check usernam in DB and password.
//  passport.use(new LocalStrategy( function() )) will fire in /auth/login in post method.
//  If success in login, passport.serializeUser() will run to set session with simple authId.
passport.use(new LocalStrategy(

  function(username, password, done){


    var thisUsername = username;
    var thisPwd = password;

    var sql = "SELECT * FROM users WHERE authId=?";
    con.query(sql, [ 'local:'+thisUsername ], function(err, results){

      if(err){

        done(null, false, { message: 'No ID is found. Please Check Again.'});

      } else {

        // user found from DB and store it to userFromDB.
        var userFromDB = results[0];

        console.log(userFromDB);


        // pass salt from DB and compare if this hash is same as hash in the DB.

        return hasher( { password: thisPwd, salt: userFromDB.salt  }, function(err, pass, salt , thisHash){ 

          if ( thisHash === userFromDB.hash ){

            console.log('localStrategy: logged-in', userFromDB);

            done(null, userFromDB);

          } else {

            console.log('localStrategy: wrong password', userFromDB);
            done(null, false, { message: 'Incorrect password.'}); // how do I show this message in respons?

          }

        });
      }


    });

  }

));



// 'run facebook strategy' 

passport.use(new FacebookStrategy({
    clientID: '1799222746986501',
    clientSecret: '3ab2a1cd0d0b323d21b5c2e28665cb27',
    callbackURL: "/auth/facebook/callback",
    profileFields: ['email','gender','displayName']
  },

  // if there is no err, it creates new user or find current user and done(null, user);
  // done(null, user) will create session by serialize() 
  // profile has very important data. It has a user's unique ID in facebook DB.
  // Save this unidue ID into seperated authenticat DB such as facebookDB.

  function(accessToken, refreshToken, profile, done) {
    
    var userName = profile.id;
    var authId = 'facebook:' + profile.id;

    console.log(profile);
    

    // check if there is already facebook id in our facebookDB
    for(var i=0; i < usersDB.length; i++){
      var user = usersDB[i];
      if( user.authId === authId){
        // then just serialize this
        return done(null, user);
      }
    }

    // If it cant find facebook id in our facebook DB.
    // then add this new facebook id to our facebookDB.
    
    var newUser = {

      authId: authId,
      userName: userName,
      displayName: profile.displayName,
      email: profile.emails[0].value
    }

    usersDB.push(newUser);
 
    // run serializeUser
    done(null, newUser);

    
  }
));





// -------------- Routes

// when post('/auth/login'), passport.authoenticate() middleware runs w/ following options. 
// then passport.use(new LocalStrategy() ); will run for authenticate.
// authenticate: local
app.post(
  '/auth/login',
  passport.authenticate( 
    'local', 
    {
      //successRedirect: '/welcome', // 해당 코드를 주석으로 처리하면 아래의 fuction이 호출됨
      failureRedirect: '/auth/login', 
      failureFlash: true 
    }
  ),
  
  // This function only run once authentication success.
  // Make sure to run session logic in passport.serializeUser(), then redirect. So passport obj will be added in session = no error later
  function(req, res) { 
    req.session.save(function(){
     res.redirect('/welcome');
    });
  }

);
// authenticate: facebook

app.get('/auth/facebook', passport.authenticate('facebook', { scope: 'email' }));

app.get('/auth/facebook/callback',
  passport.authenticate(
    'facebook', 
    { 
      // successRedirect: '/welcome', 
      failureRedirect: '/auth/login' 
    }
  ),
  function(req, res) { // Make sure to run session logic in passport.serializeUser(), then redirect. So passport obj will be added in session = no error later
    req.session.save(function(){
     res.redirect('/welcome');
    });
  }
);




// app.post('/auth/login', function(req, res){
 

//   var receivedUsername = req.body.username;
//   var receivedPwd = req.body.password;

//   for( var i=0; i < usersDB.length; i++ ){

//     var user = usersDB[i]

//     if ( receivedUsername === user.username && receivedPwd === user.password ){
//       console.log('matched'+ receivedUsername);

//       // this session obj is now connected to the session ID in the browser. Actual data is stored in mySQL
//       // only save small data to session and big data should be fetched from DB depends session status.
//       req.session.userName = user.userName;
//       req.session.displayName = user.displayName;
//       req.session.password = user.password;
//       req.session.loginStatus = true;

     
//       // Make sure redirect fires once session saves into data (sessionStore)
//       // return this function because save() takes time to run redirect. 
//       // So it prevent to send() below once username is matched.
//       return req.session.save(function(){
//         res.redirect('/welcome');
//       });

//       var userMatched = true;

//       // res.redirect('/welcome');
//     }
//   }

//   // make sure this only fire when userMatched.

//   // if( !userMatched ){
//   //   console.log('1')
//   //   res.send('who are you? <a href="/auth/login">Login</a>');
//   // }

//   res.send('who are you? <a href="/auth/login">Login</a>');

// });



app.get('/auth/logout', function(req, res){

  req.logout();

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


    // gather user info.
    var user = {
      authId: "local:"+req.body.username,
      userName: req.body.username,
      salt: salt,
      hash: hash,
      displayName: req.body.displayName 

    };

    // add user info to real DB

    var sql = 'INSERT INTO users SET ?';

    con.query(sql, user, function(err, results){

      if(err){

        console.log(err);
        res.status(500);

      } else{

        console.log( results[0] );

        // let user login right away and run ppassport.serializeUser();
        req.login(user, function(err){

          req.session.save(function(){
            res.redirect('/welcome');
          });

        });

      }

    });

  });



});




app.get('/flash', function(req, res){
  // Set a flash message by passing the key, followed by the value, to req.flash().
  req.flash('info', 'Flash is back!')
  res.redirect('/flashTest');
});

app.get('/flashTest', function(req, res){
  // Get an array of flash messages by passing the key to req.flash()
  res.send( req.flash('info') );
});
 








 

 
  


























