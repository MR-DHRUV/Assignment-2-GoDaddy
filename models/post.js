const db = require('../db');
const { handleError } = require('../utils');

// Function to create a new post
const createPost = (title, content, authorId, callback) => {
    const query = `INSERT INTO Blogs (title, content, authorId) VALUES (?, ?, ?)`;
    db.run(query, [title, content, authorId], function (err) {
        handleError(err);
        callback(err, this?.lastID);
    });
};

// Function to fetch a post by ID
const getPostById = (id, callback) => {
    const query = `SELECT * FROM Blogs WHERE id = ?`;
    db.get(query, [id], (err, row) => {
        handleError(err);
        callback(err, row);
    });
};

// Function to fetch all posts by a specific user (authorId) with pagination
const getPostsByUser = (authorId, page = 1, pageSize = 10, callback) => {

    const offset = (page - 1) * pageSize;  // offset based on the page number and page size
    const query = `SELECT * FROM Blogs WHERE authorId = ? LIMIT ? OFFSET ?`;

    db.all(query, [authorId, pageSize, offset], (err, rows) => {
        if (err) {
            return callback(err, null, null);
        }

        // Query to get the total number of posts by the author
        const countQuery = `SELECT COUNT(*) AS total FROM Blogs WHERE authorId = ?`;
        db.get(countQuery, [authorId], (err, row) => {
            if (err) {
                return callback(err, null, null);
            }

            // Query to get the total number of posts for pagination
            callback(null, rows, row.total);
        });
    });
};


// Function to fetch all posts with pagination
const getAllPosts = (page, pageSize, callback) => {

    const offset = (page - 1) * pageSize;
    const query = `SELECT * FROM Blogs LIMIT ? OFFSET ?`;

    db.all(query, [pageSize, offset], (err, rows) => {
        if (err) {
            return callback(err, null, null);
        }

        // Query to get the total number of posts for pagination
        const countQuery = `SELECT COUNT(*) AS total FROM Blogs`;
        db.get(countQuery, [], (err, row) => {
            if (err) {
                return callback(err, null, null);
            }
            // Return the posts and total count
            callback(null, rows, row.total);
        });
    });
};


// Function to update a post by ID
const updatePost = (id, updates, callback) => {
    const fields = Object.keys(updates).map((field) => `${field} = ?`).join(', ');
    const values = [...Object.values(updates), id];
    const query = `UPDATE Blogs SET ${fields} WHERE id = ?`;

    db.run(query, values, function (err) {
        handleError(err, `Post with ID ${id} updated.`);
        callback(err, this?.changes);
    });
};

// Function to delete a post by ID
const deletePost = (id, callback) => {
    const query = `DELETE FROM Blogs WHERE id = ?`;
    db.run(query, [id], function (err) {
        handleError(err, `Post with ID ${id} deleted.`);
        callback(err, this?.changes);
    });
};

// Function to like a post (increment like count)
const likePost = (id, callback) => {
    const query = `UPDATE Blogs SET likeCount = likeCount + 1 WHERE id = ?`;
    db.run(query, [id], function (err) {
        handleError(err, `Post with ID ${id} liked.`);
        callback(err, this?.changes);  // Returns the number of rows affected (1 if successful)
    });
};

module.exports = {
    createPost,
    getPostById,
    getPostsByUser,
    getAllPosts,
    updatePost,
    deletePost,
    likePost,
};
