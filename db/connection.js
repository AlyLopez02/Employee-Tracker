const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  // Your username
  user: "root",
  // Your password
  password: "password", // put "password" OR try to figure out .env
  database: "tracker_db"
});

connection.connect(function (err) {
  if (err) throw err;
});

module.exports = connection;
