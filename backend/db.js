var mysql = require('mysql');
require('dotenv').config();

exports.connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "phuocminh22",
    database : "language_center",
    timezone: "utc"
});
  
exports.connection.connect(function(err) {
    if (err) {
      console.log("Error in the connection");
      console.log(err);
    }
    else{
      console.log('Database Connected');
    }
});
