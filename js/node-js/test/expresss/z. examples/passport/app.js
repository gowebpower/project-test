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
  LocalStrategy = require('passport-local').Strategy;





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

var usersDB = [
  {
    username: 'egoing',
    password: '111',
    displayName: 'Egoing'
  },

  {
    username: 'egoing2',
    password: '111',
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


// 'run local strategy' 
//  passport.use(new LocalStrategy( function() )) will fire when users use local strategy in /auth/login
passport.use(new LocalStrategy(

  function(username, password, done){

    var receivedUsername = username;
    var receivedPwd = password;

    for( var i=0; i < usersDB.length; i++ ){

      var user = usersDB[i]

      if ( receivedUsername === user.username && receivedPwd === user.password ){

        done(null, user);

        console.log('matched'+ receivedUsername);

        // this session obj is now connected to the session ID in the browser. Actual data is stored in mySQL
        // only save small data to session and big data should be fetched from DB depends session status.
        req.session.userName = user.userName;
        req.session.displayName = user.displayName;
        req.session.password = user.password;
        req.session.loginStatus = true;

       
        // Make sure redirect fires once session saves into data (sessionStore)
        // return this function because save() takes time to run redirect. 
        // So it prevent to send() below once username is matched.
        return req.session.save(function(){
          res.redirect('/welcome');
        });

        // res.redirect('/welcome');
      }

      else {
        done(null, false, { message: 'Incorrect .'});

      }
    }

    done(null, false, { message: 'Incorrect .'});
     

  }

));

app.post('/auth/login', passport.authenticate('local', { 
  successRedirect: '/redirect', 
  failureRedirect: '/auth/login', 
  failureFlash: true })
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

  // add new userinfo to global varabile ( db for later )

  usersDB.push({

    username: req.body.username,
    password: req.body.password,
    displayName:  req.body.displayName 

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

 








 

 
  


























