// ************************
  // Module dependencies.

// ************************ 

const express = require('express');
const app = express();
const bodyParser = require('body-parser');


// ************************ 
  // Express Settings

// ************************

// ------ Port
app.listen(3000, function(){
  console.log('Connected 3000 Port!');

});

// ------ Static file
app.use( express.static('public') );


// ------ Template Engine 

// Set which template engine 
app.set('view engine', 'pug');

// Set which folder
app.set('views', './src/server/views');

// output pretty html
app.locals.pretty = true;



// ------  Body Parser
app.use(bodyParser.urlencoded({ extended: false }) );



// ************************ 
  // Controllers (route handlers).

// ************************ 

const homeController = require('./controllers/home');
const aboutController = require('./controllers/about');
const topicController = require('./controllers/topic');



// ************************ 
  // Primary Routes

// ************************ 

app.get('/', homeController.index );

app.get('/about', aboutController.index );

app.get('/topicCreate', topicController.creatNew );
app.post('/topicList', topicController.post );
app.get('/topicList', topicController.get );


































// app.get('/topic', function( req, res){

//   // res.send('Hello Home Page');

//   res.send(req.query);

//   // console.log('hjehe')

// });


// app.get('/about', function( req, res){

//   res.send('This is about page');

// });

// app.get('/contact', function( req, res){

//   res.render('contact');
   

// });

// app.get('/contact_receiver', function( req, res){

//   res.send(req.query);
    
// });