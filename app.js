require('dotenv').config();

const express = require('express');

const app = express();

const port = 3000;

const mysql = require('mysql2');

const bcrypt = require('bcrypt');

const session = require('express-session');

const path = require('path');

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.set('view engine', 'ejs');

app.set('views', path.join(__dirname, 'views'));

app.use(session({

    secret: process.env.SECRET,

    resave: false,

    saveUninitialized: true

  }));

const router = require('./routes/users');

app.use('/', router);

app.listen(port, () => {

    console.log(`Server is running on port ${process.env.PORT}`);

  });

  function logout() {

    fetch('/api/logout', {

        method: 'POST'

    })

    .then(response => {

        if (response.ok) {

            // Redirect to login page

            window.location.href = '/login';

        } else {

            // Handle error

            console.error('Logout failed');

        }

    });

}



// Attach logout function to the "Logout" button click event

document.getElementById('logoutButton').addEventListener('click', logout); 