const db = require('../db');
const { handleError } = require('../utils');

// Function to create a new user
const createUser = (name, email, callback) => {
    const query = `INSERT INTO Users (name, email) VALUES (?, ?)`;
    db.run(query, [name, email], function (err) {
        handleError(err);
        callback(err, this?.lastID);
    });
};

// Function to fetch a user by ID
const getUserById = (id, callback) => {
    const query = `SELECT * FROM Users WHERE id = ?`;
    db.get(query, [id], (err, row) => {
        handleError(err);
        callback(err, row);
    });
};

// Function to fetch all users
const getAllUsers = (callback) => {
    const query = `SELECT * FROM Users`;
    db.all(query, [], (err, rows) => {
        handleError(err);
        callback(err, rows);
    });
};

// Function to update a user by ID
const updateUser = (id, updates, callback) => {
    const fields = Object.keys(updates).map((field) => `${field} = ?`).join(', ');
    const values = [...Object.values(updates), id];
    const query = `UPDATE Users SET ${fields} WHERE id = ?`;

    db.run(query, values, function (err) {
        handleError(err, `User with ID ${id} updated.`);
        callback(err, this?.changes);
    });
};

// Function to delete a user by ID
const deleteUser = (id, callback) => {
    const query = `DELETE FROM Users WHERE id = ?`;
    db.run(query, [id], function (err) {
        handleError(err, `User with ID ${id} deleted.`);
        callback(err, this?.changes);
    });
};

module.exports = {
    createUser,
    getUserById,
    getAllUsers,
    updateUser,
    deleteUser,
};
