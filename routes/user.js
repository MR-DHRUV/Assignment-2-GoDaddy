const express = require('express');
const User = require('../models/user');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const { handleError, handleSuccess } = require('./utils');
const { checkId } = require('../middleware/checkId');


// Route to create a new user
router.post(
    '/users',
    [
        // Validate request body fields
        body('name').notEmpty().withMessage('Name is required and cannot be empty'),
        body('email').isEmail().withMessage('Please provide a valid email address'),
    ],
    async (req, res) => {

        // Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return handleError(res, 400, errors.array());
        }

        try {
            const { name, email } = req.body;
            User.createUser(name, email, (err, userId) => {
                if (err) {
                    return handleError(res, 500, err);
                }
                handleSuccess(res, 201, 'User created successfully', { userId });
            });
        } catch (error) {
            handleError(res, 500, error);
        }
    }
);

// Route to get a user by ID
router.get('/users/:id', checkId, async (req, res) => {
    const userId = req.params.id;
    try {
        User.getUserById(userId, (err, user) => {
            if (err) {
                return handleError(res, 500, err);
            }
            if (!user) {
                return handleError(res, 404, `User with ID ${userId} not found.`);
            }
            handleSuccess(res, 200, 'User fetched successfully', { user });
        });
    } catch (error) {
        handleError(res, 500, error);
    }
});

// Route to get all users
router.get('/users', async (req, res) => {
    try {
        User.getAllUsers((err, users) => {
            if (err) {
                return handleError(res, 500, err);
            }
            handleSuccess(res, 200, 'Users fetched successfully', { users });
        });
    } catch (error) {
        handleError(res, 500, error);
    }
});

// Route to update a user by ID
router.put(
    '/users/:id',
    checkId,
    [
        body('name').optional().notEmpty().withMessage('Name cannot be empty'),
        body('email').optional().isEmail().withMessage('Please provide a valid email address'),
    ],
    async (req, res) => {
        const userId = req.params.id;

        // Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return handleError(res, 400, errors.array());
        }

        try {
            const updates = req.body;

            User.updateUser(userId, updates, (err, changes) => {
                if (err) {
                    // Error occurred while updating user
                    return handleError(res, 500, err);
                }
                if (changes === 0) {
                    // No changes were made or user not found
                    return handleError(res, 404, `User with ID ${userId} not found or no changes were made.`);
                }
                handleSuccess(res, 200, 'User updated successfully');
            });
        } catch (error) {
            handleError(res, 500, error);
        }
    }
);

// Route to delete a user by ID
router.delete('/users/:id', checkId, async (req, res) => {
    const userId = req.params.id;
    try {
        User.deleteUser(userId, (err, changes) => {
            if (err) {
                return handleError(res, 500, err);
            }
            if (changes === 0) {
                // User not found
                return handleError(res, 404, `User with ID ${userId} not found.`);
            }
            handleSuccess(res, 200, 'User deleted successfully');
        });
    } catch (error) {
        handleError(res, 500, error);
    }
});

module.exports = router;
