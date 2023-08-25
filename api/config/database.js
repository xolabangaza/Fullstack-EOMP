const mysql = require("mysql")
require('dotenv').config();
// import mysql from "mysql2";
   
// create the connection to database
// const db = mysql.createConnection({
  const db = mysql.createPool({
    host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
    multipleStatements: true,
    connectionLimit: 80000090,
    secretKEY: process.env.DB_SECRET
});
  
module.exports = db; 