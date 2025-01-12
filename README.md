# Blog API Documentation

Base URL: `/api`

## Authentication

Authentication is not implemented in the current version of the API.

## Response Format
All endpoints follow a consistent response format:

### Success Response
```json
{
  "success": true,
  "message": "Operation successful message",
  "data": {
    // Response data object
  }
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error message",
  "error": {
    // Error details
  }
}
```

## Users API

### Create User
- **Method:** POST
- **Endpoint:** `/users`
- **Body Parameters:**
  - `name` (required): User's name
  - `email` (required): Valid email address
- **Success Response (201):**
  ```json
  {
    "success": true,
    "message": "User created successfully",
    "data": {
      "userId": 123
    }
  }
  ```

### Get User by ID
- **Method:** GET
- **Endpoint:** `/users/:id`
- **URL Parameters:**
  - `id`: User ID
- **Success Response (200):**
  ```json
  {
    "success": true,
    "message": "User fetched successfully",
    "data": {
      "user": {
        // User object
      }
    }
  }
  ```

### Get All Users
- **Method:** GET
- **Endpoint:** `/users`
- **Success Response (200):**
  ```json
  {
    "success": true,
    "message": "Users fetched successfully",
    "data": {
      "users": [
        // Array of user objects
      ]
    }
  }
  ```

### Update User
- **Method:** PUT
- **Endpoint:** `/users/:id`
- **URL Parameters:**
  - `id`: User ID
- **Body Parameters:**
  - `name` (optional): Updated name
  - `email` (optional): Updated email address
- **Success Response (200):**
  ```json
  {
    "success": true,
    "message": "User updated successfully"
  }
  ```

### Delete User
- **Method:** DELETE
- **Endpoint:** `/users/:id`
- **URL Parameters:**
  - `id`: User ID
- **Success Response (200):**
  ```json
  {
    "success": true,
    "message": "User deleted successfully"
  }
  ```

## Blog Posts API

### Create Post
- **Method:** POST
- **Endpoint:** `/blogs`
- **Body Parameters:**
  - `title` (required): Post title
  - `content` (required): Post content
  - `authorId` (required): ID of the user creating the post
- **Success Response (201):**
  ```json
  {
    "success": true,
    "message": "Post created successfully",
    "data": {
      "postId": 123
    }
  }
  ```

### Get Post by ID
- **Method:** GET
- **Endpoint:** `/blogs/:id`
- **URL Parameters:**
  - `id`: Post ID
- **Success Response (200):**
  ```json
  {
    "success": true,
    "message": "Post fetched successfully",
    "data": {
      "post": {
        // Post object
      }
    }
  }
  ```

### Get Posts by User
- **Method:** GET
- **Endpoint:** `/blogs/user/:id`
- **URL Parameters:**
  - `id`: User ID
- **Query Parameters:**
  - `page` (optional, default: 1): Page number
  - `pagesize` (optional, default: 10): Number of posts per page
- **Success Response (200):**
  ```json
  {
    "success": true,
    "message": "Posts fetched successfully",
    "data": {
      "posts": [
        // Array of post objects
      ],
      "total": 42 // Total number of posts
    }
  }
  ```

### Get All Posts
- **Method:** GET
- **Endpoint:** `/blogs`
- **Query Parameters:**
  - `page` (optional, default: 1): Page number
  - `pagesize` (optional, default: 10): Number of posts per page
- **Success Response (200):**
  ```json
  {
    "success": true,
    "message": "Posts fetched successfully",
    "data": {
      "posts": [
        // Array of post objects
      ],
      "total": 100 // Total number of posts
    }
  }
  ```

### Update Post
- **Method:** PUT
- **Endpoint:** `/blogs/:id`
- **URL Parameters:**
  - `id`: Post ID
- **Body Parameters:**
  - `title` (optional): Updated title
  - `content` (optional): Updated content
  - `authorId` (optional): Updated author ID
- **Success Response (200):**
  ```json
  {
    "success": true,
    "message": "Post updated successfully"
  }
  ```

### Delete Post
- **Method:** DELETE
- **Endpoint:** `/blogs/:id`
- **URL Parameters:**
  - `id`: Post ID
- **Success Response (200):**
  ```json
  {
    "success": true,
    "message": "Post deleted successfully"
  }
  ```

### Like Post
- **Method:** POST
- **Endpoint:** `/blogs/:id/like`
- **URL Parameters:**
  - `id`: Post ID
- **Success Response (200):**
  ```json
  {
    "success": true,
    "message": "Post liked successfully"
  }
  ```

## Error Codes

- **400:** Bad Request - Invalid input parameters
- **404:** Not Found - Resource not found
- **500:** Internal Server Error - Server-side error

## Data Models

### User Model
```json
{
  "id": "integer",
  "name": "string",
  "email": "string"
}
```

### Post Model
```json
{
  "id": "integer",
  "title": "string",
  "content": "string",
  "authorId": "integer"
}
```
## Blogs API
### Create Blog Post
- **Method:** POST
- **Endpoint:** `/blogs`
- **Description:** Creates a new blog post
- **Request Body:**
  ```json
  {
    "title": "string (required)",
    "content": "string (required)",
    "authorId": "integer (required)"
  }
  ```
- **Validation:**
  - Title cannot be empty
  - Content cannot be empty
  - AuthorId must be an integer and cannot be empty
- **Success Response (201):**
  ```json
  {
    "success": true,
    "message": "Post created successfully",
    "data": {
      "postId": "integer"
    }
  }
  ```
- **Error Responses:**
  - `400`: Validation errors in request body
  - `404`: Author ID not found
  - `500`: Server error

### Get Post by ID
- **Method:** GET
- **Endpoint:** `/blogs/:id`
- **Parameters:**
  - `id`: Post ID (URL parameter)
- **Success Response (200):**
  ```json
  {
    "success": true,
    "message": "Post fetched successfully",
    "data": {
      "post": {
        // Post object
      }
    }
  }
  ```
- **Error Responses:**
  - `404`: Post not found
  - `500`: Server error

### Get Posts by User
- **Method:** GET
- **Endpoint:** `/blogs/user/:id`
- **Parameters:**
  - `id`: User ID (URL parameter)
  - `page`: Page number (query parameter, default: 1)
  - `pagesize`: Items per page (query parameter, default: 10)
- **Success Response (200):**
  ```json
  {
    "success": true,
    "message": "Posts fetched successfully",
    "data": {
      "posts": [
        // Array of post objects
      ],
      "total": "integer" // Total number of posts
    }
  }
  ```
- **Error Responses:**
  - `404`: User not found
  - `500`: Server error

### Get All Posts
- **Method:** GET
- **Endpoint:** `/blogs`
- **Parameters:**
  - `page`: Page number (query parameter, default: 1)
  - `pagesize`: Items per page (query parameter, default: 10)
- **Success Response (200):**
  ```json
  {
    "success": true,
    "message": "Posts fetched successfully",
    "data": {
      "posts": [
        // Array of post objects
      ],
      "total": "integer" // Total number of posts
    }
  }
  ```
- **Error Response:**
  - `500`: Server error

### Update Post
- **Method:** PUT
- **Endpoint:** `/blogs/:id`
- **Parameters:**
  - `id`: Post ID (URL parameter)
- **Request Body:**
  ```json
  {
    "title": "string (optional)",
    "content": "string (optional)",
    "authorId": "integer (optional)"
  }
  ```
- **Validation:**
  - If title provided, cannot be empty
  - If content provided, cannot be empty
  - If authorId provided, must be an integer
- **Success Response (200):**
  ```json
  {
    "success": true,
    "message": "Post updated successfully"
  }
  ```
- **Error Responses:**
  - `400`: Validation errors in request body
  - `404`: Post not found or no changes made
  - `500`: Server error

### Delete Post
- **Method:** DELETE
- **Endpoint:** `/blogs/:id`
- **Parameters:**
  - `id`: Post ID (URL parameter)
- **Success Response (200):**
  ```json
  {
    "success": true,
    "message": "Post deleted successfully"
  }
  ```
- **Error Responses:**
  - `404`: Post not found
  - `500`: Server error

### Like Post
- **Method:** POST
- **Endpoint:** `/blogs/:id/like`
- **Parameters:**
  - `id`: Post ID (URL parameter)
- **Success Response (200):**
  ```json
  {
    "success": true,
    "message": "Post liked successfully"
  }
  ```
- **Error Responses:**
  - `404`: Post not found
  - `500`: Server error

## Middleware

The API uses the following middleware:

1. `checkId`: Validates ID parameters in URLs
2. `express-validator`: Validates request body fields

## Error Handling

All endpoints use consistent error handling through the `handleError` utility:

```javascript
{
  "success": false,
  "message": "Error message",
  "error": {
    // Error details object
  }
}
```

## Success Responses

All endpoints use consistent success handling through the `handleSuccess` utility:

```javascript
{
  "success": true,
  "message": "Success message",
  "data": {
    // Response data object (if any)
  }
}
```