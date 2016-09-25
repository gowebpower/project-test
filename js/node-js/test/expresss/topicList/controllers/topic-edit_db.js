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

exports.index = (req, res) => {

  const 
    id = req.params.id,
    sql = 'select * from testing where id=?';
  if (id){
    con.query(sql, [id], function(err, result, fields){
      if(err){
        console.log(err);
        res.status(500).send('Internal Server Error From Ban');
      } else {

        res.render('topic/edit' , { data: result[0] } );

      }
    });
  }
  
};

/**
 * Post /topicList/:id/edit

 */

exports.post = (req, res) => {

  const 
    title = req.body.title,
    description = req.body.description,
    author = req.body.author;
  const
    id = req.params.id,
    sql = 'update testing set title=?, description=?, author=? where id=?';

   
  con.query(sql, [ title, description, author, id ], function(err, result, fields){
    if(err){
      console.log(err);
      res.status(500).send('Internal Server Error From Ban');
    } else {
      
      res.redirect(`/topicList/${id}`);

    }
  });
  
};


 