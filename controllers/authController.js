const userModel = require('../models/userModel');

module.exports = {
    loginPage: (req, res) => {
        res.sendFile('login.html', { root: './views' });
    },
    registerPage: (req, res) => {
        res.sendFile('register.html', { root: './views' });
    },
    login: (req, res) => {
        const { username, password } = req.body;
        userModel.findByUsername(username, (err, results) => {
            if (err) throw err;
            if (results.length > 0 && results[0].password === password) {
                req.session.loggedin = true;
                req.session.username = username;
                res.redirect('/home');
            } else {
                res.send('Incorrect Username and/or Password!');
            }
        });
    },
    register: (req, res) => {
        const { username, password, email } = req.body;
        if (username && password && email) {
            userModel.findByUsername(username, (err, results) => {
                if (err) throw err;
                if (results.length > 0) {
                    res.send('Username already exists!');
                } else {
                    userModel.createUser({ username, password, email }, (err) => {
                        if (err) throw err;
                        res.redirect('/');
                    });
                }
            });
        } else {
            res.send('Please fill all fields!');
        }
    },
    home: (req, res) => {
        if (req.session.loggedin) {
            res.send(`Welcome back, ${req.session.username}!`);
        } else {
            res.send('Please login to view this page!');
        }
    }
};
