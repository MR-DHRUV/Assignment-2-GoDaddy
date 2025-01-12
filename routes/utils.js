// Error handler for standardizing error responses
const handleError = (res, statusCode, errorDetails = null) => {
    return res.status(statusCode).json({ error: errorDetails, success: false });
};

// Success response handler for standardizing success responses
const handleSuccess = (res, statusCode, message, data = null) => {
    return res.status(statusCode).json({ message, data, success: true });
};

module.exports = { handleError, handleSuccess };