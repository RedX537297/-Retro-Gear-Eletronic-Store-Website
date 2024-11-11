const mysql = require('mysql12');

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'store'
});

module.exports = db.promise();
  