const sqlite3 = require('sqlite3').verbose();
const { handleError } = require('./utils');


// connect to in-file database
const db = new sqlite3.Database('./database/data.sqlite', (err) => {
    if (err) {
        console.error('Error connecting to database:', err.message);
    } else {
        console.log('Connected to SQLite database.');
    }
});

// Create Users and Blogs tables
const createTables = () => {
    db.serialize(() => {
        // Create Users table
        db.run(`
            CREATE TABLE IF NOT EXISTS Users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                email TEXT NOT NULL UNIQUE
            );
        `, handleError);

        // enable foreign key constraints
        db.run('PRAGMA foreign_keys = ON;', handleError);

        // Create Blogs table
        db.run(`
            CREATE TABLE IF NOT EXISTS Blogs (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                title TEXT NOT NULL,
                content TEXT NOT NULL,
                authorId INTEGER NOT NULL,
                likeCount INTEGER DEFAULT 0,
                FOREIGN KEY (authorId) REFERENCES Users (id) ON DELETE CASCADE
            );
        `, handleError);
    });
};

// Initialize tables
createTables();

module.exports = db;
