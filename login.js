const mysql = require('mysql');
const express = require('express');
const session = require('express-session');
const path = require('path');

// Database connection
const connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'nodelogin'
});

const app = express();

// Middleware setup
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'static')));

// Routes
// Login page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'login.html'));
});

// Authentication route
app.post('/auth', (req, res) => {
    const { username, password } = req.body;
    if (username && password) {
        connection.query('SELECT * FROM accounts WHERE username = ? AND password = ?', [username, password], (error, results) => {
            if (error) throw error;
            if (results.length > 0) {
                req.session.loggedin = true;
                req.session.username = username;
                res.redirect('/home');
            } else {
                res.send('Incorrect Username and/or Password!');
            }
        });
    } else {
        res.send('Please enter Username and Password!');
    }
});

// Home page
app.get('/home', (req, res) => {
    if (req.session.loggedin) {
        res.send(`Welcome back, ${req.session.username}!`);
    } else {
        res.send('Please login to view this page!');
    }
});

// Server setup
app.listen(3000, () => {
    console.log('Server started on http://localhost:3000');
});
