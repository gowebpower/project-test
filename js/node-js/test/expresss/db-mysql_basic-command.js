
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
// var sql = 'select * from topic';
// conn.query(sql, function(err, rows, fields){
//   if(err){
//     console.log(err);
//   } else {

//     console.log(rows);

//     // or for cleaner look.
//     // for(var i=0; i<rows.length; i++){
//     //   console.log(rows[i].title);

//     // }

//     // fields not important.
//   }

// });



// Insert

// var sql = "insert into topic (title, description, author) values(?,?,?)";

// var params = ['nodeJS4','blah blah','Ban Park'];

// conn.query(sql, params, function(err, row, fields){
//   if(err) console.log(err);

//   else {
//       console.log(row.insertId);   // show inserted info
//   }
// });



// Update

// notice question mark equals with plain string but they work as variable. 
// var sql = "update topic set title=?, description=? where id=?";

// var params = ['nodeJSchanged','blah blah', 4];

// conn.query(sql, params, function(err, row, fields){
//   if(err) console.log(err);

//   else {
//       console.log(row);   // show inserted info
//   }
// });

// Delete

var sql = "delete from topic where id=?";

var params = [3];

conn.query(sql, params, function(err, row, fields){
  if(err) console.log(err);

  else {
      console.log(row);   // show inserted info
  }
});











// Ends connection after call
conn.end();



