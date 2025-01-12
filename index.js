const express = require('express');
const bodyParser = require('body-parser');
const postRoutes = require('./routes/post');
const userRoutes = require('./routes/user');
const app = express();

// Middleware
app.use(bodyParser.json());

// Mounting the routes
app.use('/api', postRoutes);
app.use('/api', userRoutes);

// Default route for testing server
app.get('/', (req, res) => {
    res.send('Server is up and running!');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});

