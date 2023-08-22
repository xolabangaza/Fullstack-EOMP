const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const mysql = require('mysql')

const express = require('express')
const bodyParser = require('body-parser')
const routes = express.Router()

const {users} = require('../model')

app.post('/submit', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  // My Inserts
  const sql = 'INSERT INTO users (userID, firstame, lastname , gender, userDOB, emailAdd, userPass, profileUrl) VALUES (?, ?)';
  connection.query(sql, [userID, firstame, lastname , gender, userDOB, emailAdd, userPass, profileUrl], (err, result) => {
    if (err) {
      console.error('Error inserting data:', err);
      return res.status(500).send('Error inserting data into database');
    }
    console.log('Data inserted:', result);
    res.send('Data submitted successfully');
  });
});

app.listen(port, () => {
  console.log('Server is running on port 3000');
});
