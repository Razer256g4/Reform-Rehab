const db = require('../config/database');

module.exports = {
    findByUsername: (username, callback) => {
        db.query('SELECT * FROM accounts WHERE username = ?', [username], callback);
    },
    createUser: (user, callback) => {
        const { username, password, email } = user;
        db.query('INSERT INTO accounts (username, password, email) VALUES (?, ?, ?)', [username, password, email], callback);
    }
};
