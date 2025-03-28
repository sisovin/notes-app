const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:');

// Create tables for users and notes
db.serialize(() => {
    db.run(`CREATE TABLE users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
        deleted INTEGER DEFAULT 0
    )`);

    db.run(`CREATE TABLE notes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        content TEXT,
        FOREIGN KEY(user_id) REFERENCES users(id)
    )`);
});

// Functions for interacting with the database

// Add a new user
function addUser(username, password) {
    return new Promise((resolve, reject) => {
        const stmt = db.prepare(`INSERT INTO users (username, password) VALUES (?, ?)`);
        stmt.run(username, password, function (err) {
            if (err) {
                reject(err);
            } else {
                resolve({ id: this.lastID, username, password });
            }
        });
        stmt.finalize();
    });
}

// Get a user by username
function getUserByUsername(username) {
    return new Promise((resolve, reject) => {
        db.get(`SELECT * FROM users WHERE username = ?`, [username], (err, row) => {
            if (err) {
                reject(err);
            } else {
                resolve(row);
            }
        });
    });
}

// Add a new note
function addNote(userId, content) {
    return new Promise((resolve, reject) => {
        const stmt = db.prepare(`INSERT INTO notes (user_id, content) VALUES (?, ?)`);
        stmt.run(userId, content, function (err) {
            if (err) {
                reject(err);
            } else {
                resolve({ id: this.lastID, userId, content });
            }
        });
        stmt.finalize();
    });
}

// Get notes by user ID
function getNotesByUserId(userId) {
    return new Promise((resolve, reject) => {
        db.all(`SELECT * FROM notes WHERE user_id = ?`, [userId], (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
}

// Edit a note
function editNote(noteId, content) {
    return new Promise((resolve, reject) => {
        const stmt = db.prepare(`UPDATE notes SET content = ? WHERE id = ?`);
        stmt.run(content, noteId, function (err) {
            if (err) {
                reject(err);
            } else {
                resolve({ id: noteId, content });
            }
        });
        stmt.finalize();
    });
}

// Delete a note
function deleteNote(noteId) {
    return new Promise((resolve, reject) => {
        const stmt = db.prepare(`DELETE FROM notes WHERE id = ?`);
        stmt.run(noteId, function (err) {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
        stmt.finalize();
    });
}

module.exports = {
    addUser,
    getUserByUsername,
    addNote,
    getNotesByUserId,
    editNote,
    deleteNote
};
