const mysql = require('mysql2');
const Promise = require('bluebird');

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) {
    console.log("Database Connection Failed..\n", err);
  } else {
    console.log("connected to Database at host: " + process.env.DB_HOST);
  }
});

module.exports = { db };