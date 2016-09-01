
// Basic import & Setup 
const mysql      = require('mysql');
const conn = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'audition0101',
  database : 'o2'
});
 
conn.connect();


// Basic Call
var sql = 'select * from topic';
conn.query(sql, function(err, rows, fields){
  if(err){
    console.log(err);
  } else {
    console.log('rows', rows);
    // console.log('fields', fields);
  }

});

// Ends connection after call
conn.end();



