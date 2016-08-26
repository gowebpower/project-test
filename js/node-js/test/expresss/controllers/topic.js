/**
 * Page dependencies
 */

const fs = require('fs');


/**
 * Post /topic
 */
exports.post = (req, res) => {

  var title = req.body.title;
  var description = req.body.description;

  fs.writeFile(`data/${title}`, description, function(err){

    if(err){
      res.send(`Internal Server Error`);
    }
    
    fs.readdir('data', function(err, files){

      res.render('topic', {files});

    });


  });

  
};



/**
 * get /topic
 */

exports.get = (req, res) => {

  fs.readdir('data', function(err, files){

    res.render('topic', {files});

  });
  
};


/**
 * Get /topicCreate
 */
exports.creatNew = (req, res) => {
  res.render('topicNew');
  // res.send(res.body.title);
};

 