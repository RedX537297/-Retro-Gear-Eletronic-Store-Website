const mysql = require('mysql');
require('dotenv').config();

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

db.connect((err)=>{
    if(err){
        console.log('Database connection failed: ',err.message);
        return;
    }
    console.log("Connection to the database successfull!!");
});

module.exports = db;