/**
 * Page dependencies
 */

const fs = require('fs');

/**
 * get /topicList
   Topic Listing Page.
 */

exports.get = (req, res) => {

  fs.readdir('data/post/', function(err, files){

    res.render('topicList', { files }  );

  });
  
};


/**
 * Post /topicList
 */
exports.post = (req, res) => {

  var
    title = req.body.title,
    description = req.body.description;

  // create file with title in data folder.
  fs.writeFile(`data/post/{title}`, description, function(err){

    if(err){
      res.send(`Internal Server Error`);
    }

    // and then redirect to newly created topic detail page.
    res.redirect(`/topicList/${title}`);

  });
  
};



/**
 * Get /topicCreate
   Topic Create Page.
 */
exports.creatNew = (req, res) => {
  res.render('topicCreate');
  // res.send(res.body.title);
};



/**
 * Get /topic/[filename]
   Topic Detail Page.
 */
exports.detail = (req, res) => {

  var title = req.params.id;

  fs.readFile(`data/post/${title}`, (err, data)=>{

    if( err ){

      title = false;
      
    }
    
    res.render('topicDetail' , { title, data } );
    
  });
  
};
 


  