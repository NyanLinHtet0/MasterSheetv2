const mysql = require('mysql2/promise');

// ---> LOCAL SETUP <---
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',         // Change to your local MySQL username
  password: 'linhtet2003', // Change to your local MySQL password
  database: 'master_sheets',
  dateStrings: true,
  port: 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});


module.exports = pool;