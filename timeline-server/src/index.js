const bearerToken = require('express-bearer-token');
const oktaAuth = require('./auth');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const events = require('./events');

const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'timeline',
  password : 'password',
  database : 'timeline'
});

connection.connect();

const hostname = '192.168.253.178';
const port = process.env.PORT || 3000;

const app = express()
  .use(cors())
  .use(bodyParser.json())
  .use(bearerToken())
  .use(oktaAuth)
  .use(events(connection));

app.listen(port, hostname, () => {
  console.log(`Express server listening on port ${port}`);
});