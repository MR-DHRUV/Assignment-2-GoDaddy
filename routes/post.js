const express = require('express');
const Post = require('../models/post');
const User = require('../models/user');
const router = express.Router();
const { checkId } = require('../middleware/checkId');
const { handleError, handleSuccess } = require('./utils');
const { body, validationResult } = require('express-validator');

// Route to create a new blog post
router.post(
    '/blogs',
    [
        // Validate request body fields
        body('title').notEmpty().withMessage('Title is required'),
        body('content').notEmpty().withMessage('Content is required'),
        body('authorId').notEmpty().isInt().withMessage('Author ID is required and should be an integer'),
    ],
    async (req, res) => {
        // Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return handleError(res, 400, errors.array());
        }

        try {
            const { title, content, authorId } = req.body;

            // check if authorId exists
            User.getUserById(authorId, (err, user) => {
                if (err) {
                    return handleError(res, 500, err);
                } else if (!user) {
                    return handleError(res, 404, `User with ID ${authorId} not found.`);
                }

                // Create the post
                Post.createPost(title, content, authorId, (err, postId) => {
                    if (err) {
                        return handleError(res, 500, err);
                    }
                    handleSuccess(res, 201, 'Blog post created successfully', { postId });
                });
            });

        } catch (error) {
            handleError(res, 500, error);
        }
    }
);

// Route to get a post by ID
router.get('/blogs/:id', checkId, async (req, res) => {
    const postId = req.params.id;
    try {
        Post.getPostById(postId, (err, post) => {
            if (err) {
                return handleError(res, 500, err);
            }
            if (!post) {
                return handleError(res, 404, `Blog post with ID ${postId} not found.`);
            }
            handleSuccess(res, 200, 'Blog post fetched successfully', { post });
        });
    } catch (error) {
        handleError(res, 500, error);
    }
});

// Route to get posts by a specific user (authorId) with pagination
router.get('/blogs/user/:id', checkId, async (req, res) => {
    const authorId = req.params.id;

    // Extract page and pageSize from query parameters, default to 1 and 10 if not provided
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pagesize) || 10;

    try {
        // Fetch posts by user with pagination
        Post.getPostsByUser(authorId, page, pageSize, (err, posts, total) => {
            if (err) {
                return handleError(res, 500, err);
            }

            // Return the posts and total count for pagination UI
            handleSuccess(res, 200, 'Blog posts fetched successfully', { posts, total });
        });
    } catch (error) {
        handleError(res, 500, error);
    }
});

// Route to get all posts with pagination
router.get('/blogs', async (req, res) => {
    try {
        // Extract page and pageSize from query parameters, defaults to 1 and 10 if not provided
        const page = parseInt(req.query.page) || 1;
        const pageSize = parseInt(req.query.pagesize) || 10;

        // Fetch posts
        Post.getAllPosts(page, pageSize, (err, posts, total) => {
            if (err) {
                return handleError(res, 500, err);
            }

            // Return paginated posts and total count for pagination UI
            handleSuccess(res, 200, 'Blog posts fetched successfully', { posts, total });
        });
    } catch (error) {
        handleError(res, 500, error);
    }
});

// Route to update a blog post by ID
router.put(
    '/blogs/:id',
    checkId,
    [
        body('title').optional().notEmpty().withMessage('Title cannot be empty'),
        body('content').optional().notEmpty().withMessage('Content cannot be empty'),
        body('authorId').optional().isInt().withMessage('Author ID should be an integer'),
    ],
    async (req, res) => {

        // Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return handleError(res, 400, errors.array());
        }

        try {
            const updates = req.body, authorId = updates.authorId, postId = req.params.id;

            // check if authorId exists
            User.getUserById(authorId, (err, user) => {
                if (err) {
                    return handleError(res, 500, err);
                } else if (!user) {
                    return handleError(res, 404, `User with ID ${authorId} not found.`);
                }

                // Create the post
                Post.updatePost(postId, updates, (err, changes) => {
                    if (err) {
                        return handleError(res, 500, err);
                    }
                    if (changes === 0) {
                        return handleError(res, 404, `Blog post with ID ${postId} not found or no changes made.`);
                    }
                    handleSuccess(res, 200, 'Blog post updated successfully');
                });
            });
        } catch (error) {
            handleError(res, 500, error);
        }
    }
);

// Route to delete a blog post by ID
router.delete('/blogs/:id', checkId, async (req, res) => {
    const postId = req.params.id;

    try {
        Post.deletePost(postId, (err, changes) => {
            if (err) {
                return handleError(res, 500, err);
            }
            if (changes === 0) {
                return handleError(res, 404, `Post with ID ${postId} not found.`);
            }
            handleSuccess(res, 200, 'Blog post deleted successfully');
        });
    } catch (error) {
        handleError(res, 500, error);
    }
});

// Route to like a blog post
router.post('/blogs/:id/like', checkId, async (req, res) => {
    const postId = req.params.id;
    try {
        Post.likePost(postId, (err, changes) => {
            if (err) {
                return handleError(res, 500, err);
            }
            if (changes === 0) {
                return handleError(res, 404, `Post with ID ${postId} not found.`);
            }
            handleSuccess(res, 200, 'Blog post liked successfully');
        });
    } catch (error) {
        handleError(res, 500, error);
    }
});

module.exports = router;
