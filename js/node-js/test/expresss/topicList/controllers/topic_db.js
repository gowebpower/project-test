/**
 * Data Base
 */

// Basic Import & Setup 
const 
  mysql      = require('mysql'),
  con = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'audition0101',
    database : 'o2'
  });
 
con.connect();



/**
 * get /topicList
   Topic Listing Page.
 */

exports.get = (req, res) => {

  var sql = 'select * from testing';
  con.query(sql, function(err, db, fields){
    if(err){
      console.log(err);
      res.status(500).send('Internal Server Error From Ban');
    } else {

      // res.send(db);
      res.render('topic/List', {db});
     
    }

  });

  
};


/**
 * Get /topic/[filename]
   Topic Detail Page.
 */
exports.detail = (req, res) => {

  const 
    id = req.params.id,
    sql = 'select * from testing where id=?';

  con.query(sql, [id], function(err, db, fields){
    if(err){
      console.log(err);
      res.status(500).send('Internal Server Error From Ban');
    } else {

      // res.send(db);
      res.render('topic/Detail', { data: db[0] } );
     
    }
  });
  
};



/**
 * Get /topicCreate
   Topic Create Page.
 */
exports.creatNew = (req, res) => {
  res.render('topic/Create');
  // res.send(res.body.title);
};


/**
 * Post /topicList/post
 */
exports.post = (req, res) => {

  const 
    title = req.body.title,
    description = req.body.description,
    author = req.body.author;
  const newData = { title, description, author };
  const sql = 'INSERT INTO testing SET ?';

  con.query(sql, newData, function(err, result, fields){
    if(err){
      console.log(err);
      res.status(500).send('Internal Server Error From Ban');
    } else {

      // res.send(result.insertId);
      res.redirect('/topicList/'+result.insertId);
     
    }
  });;
  
};






  