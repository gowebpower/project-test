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


// -- Fake Database

const products = { 
  1: { title:'Book #1' },
  2: { title:'Book #2' }
}



// ************************ 
  // Controllers (route handlers).

// ************************

// Home page 

app.get('/', function(req, res){
  
  var output ='';

  for( var product in products ){
    output += `
      <li>
        <a href=/cart/${product}>${products[product].title}</a>
      </li>
    `;
    console.log(products[product].title);

  }

  res.send(`<h1>Products</h1><ul>${output}</ul><a href="/cart">Cart</a>`);

});


// Product Add

app.get('/cart/:id', function(req, res){
  
  var id = req.params.id;
  var cart = {};
  
  if(req.cookies.cart){
    cart = req.cookies.cart;

  }

  if ( !cart[id] ){
    cart[id] = 0;

  }

  cart[id] = parseInt(cart[id]+1);

  // Set cookie and redirect to /cart
  res.cookie('cart', cart);
  res.redirect('/cart');

  // res.send(cart);


});


// Product Add

app.get('/cart', function(req, res){
  
  var cart = req.cookies.cart;
   
  for(var product in cart){
    console.log(product)
  }

  res.send(cart);


});

 


  


























