// ************************
  // Module dependencies.

// ************************ 

const 
  express = require('express'),
  app = express();

const session = require('express-session');
const bodyParser = require('body-parser');
const fileStore = require('session-file-store')(session);


const 
  passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy,
  FacebookStrategy = require('passport-facebook').Strategy;

const 
  bkfd2Password = require("pbkdf2-password"),
  hasher = bkfd2Password(),
  hasherOpts = {};





// ************************ 
  // Express Settings

// ************************


// ------ Session
// most default setting

app.use(session({
  secret: 'asdasdasdasdasdasdasd', // random texts should be filled like this. I dont know why.
  resave: false,
  saveUninitialized: true,
  store: new fileStore() // For storing
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

  console.log(usersDB);

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

// Search More data with ID found in session cookie in the browser.
passport.deserializeUser(function(id, done) {
  
  console.log('deserializeUser');
  
  for( var i=0; i < usersDB.length; i++ ){

    var user = usersDB[i];
    if( user.authId === id){
      
      return done(null, user);
    }
  }

  // If it cant find users in DB.
  done('errror');

});



// 'run local strategy' 
//  passport.use(new LocalStrategy( function() )) will fire when users use local strategy in /auth/login
passport.use(new LocalStrategy(

  function(username, password, done){


    var receivedUsername = username;
    var receivedPwd = password;

    for( var i=0; i < usersDB.length; i++ ){

      var user = usersDB[i];
 
      if ( receivedUsername === user.userName){



        // cus there is call back, this function is returnning to avoid fireing function outisde of for in loop.
        // pass salt from fake DB ( usersDB ) and compare if this hash is same as the has in the fake DB.
        return hasher( { password: receivedPwd, salt: user.salt  }, function(err, pass, salt ,hash){

          if( hash === user.hash ){


            console.log('localStrategy: logged-in', user);

            done(null, user);

            // // this session obj is now connected to the session ID in the browser. Actual data is stored in mySQL
            // // only save small data to session and big data should be fetched from DB depends session status.
            // req.session.userName = user.userName;
            // req.session.displayName = user.displayName;
            // req.session.password = user.password;
            // req.session.loginStatus = true;

            // // Make sure redirect fires once session saves into data (sessionStore)
            // // return this function because save() takes time to run redirect. 
            // // So it prevent to send() below once username is matched.
            // req.session.save(function(){
            //   res.redirect('/welcome');
              
              

            // });

          } else { 
            console.log('localStrategy: wrong password', user);
            done(null, false, { message: 'Incorrect password.'});
          }

        });
   
      }
    }

    done(null, false, { message: 'No ID is found. Please Check Again.'});

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
// then passport.use(new LocalStrategy() ); will run.
``
// authenticate: local
app.post(
  '/auth/login',
  passport.authenticate( 
    'local', 
    {
      //successRedirect: '/welcome', // 해당 코드를 주석으로 처리하면 아래의 fuction이 호출됨
      failureRedirect: '/auth/login', 
      failureFlash: false 
    }
  ),
  
  function(req, res) { // Make sure to run session logic in passport.serializeUser(), then redirect. So passport obj will be added in session = no error later
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

    var user = {
      authId: "local:"+req.body.username,
      userName: req.body.username,
      salt: salt,
      hash: hash,
      displayName: req.body.displayName 

    };


    usersDB.push(user);

    req.login(user, function(err){

      req.session.save(function(){
        res.redirect('/welcome');
      });

    });

    
    // // Save quick data to session which saves to db
    // req.session.userName = req.body.username;
    // req.session.displayName = req.body.displayName;
    // req.session.password = req.body.password;
    // req.session.loginStatus = true;


    

  });



});

 








 

 
  


























