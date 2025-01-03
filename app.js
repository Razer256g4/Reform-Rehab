const express = require('express');
const session = require('express-session');
const path = require('path');
const authRoutes = require('./routes/authRoutes');
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
app.use('/', authRoutes);

// Start server
app.listen(3000, () => {
    console.log('Server running at http://localhost:3000/');
});
