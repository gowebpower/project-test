// ************************
  // Module dependencies.

// ************************ 

const 
  express = require('express'),
  app = express();
  
const bodyParser = require('body-parser');
const multer = require('multer');
  


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
app.set('views', './views');

// output pretty html
app.locals.pretty = true;



// ------  Body Parser
app.use(bodyParser.urlencoded({ extended: false }) );
app.use(bodyParser.json());


// ------ Multer

const multerStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'data/uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
})

const upload = multer({ storage: multerStorage });
// const upload = multer({ dest: 'data/uploads/' });




// ************************ 
  // Controllers (route handlers).

// ************************ 

const 
  homeController = require('./controllers/home'),
  aboutController = require('./controllers/about'),
  topicController = require('./controllers/topic'),
  uploadController = require('./controllers/upload');



// ************************ 
  // Primary Routes

// ************************ 

// ------ Home Page
app.get('/', homeController.index );

// ------ About Page
app.get('/about', aboutController.index );

// ------ Topic Pages
app.get('/topicList', topicController.get );
app.get('/topicCreate', topicController.creatNew );
app.post('/topicList', topicController.post );
app.get('/topicList/:id', topicController.detail );

// ------ Upload Page
app.get('/upload', uploadController.index );
app.post('/upload', upload.array('userUpload', 12), uploadController.post ); 



































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