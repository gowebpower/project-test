 
/**
 * GET /upload
 *
 */
exports.index = (req, res) => {
  res.render('upload');

};


exports.post = (req, res) => {
  // res.render('upload');

  // res.sendStatus(res.body + res.file);

  
  // res.send(`It says ${req.file.originalname} ${req.body.description}`);
  // console.log(req.files);

  res.render('uploadConfirm', { files: req.files } );

  res.send(req.files);

};



