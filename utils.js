const handleError = (err) => {
    if (err) {
        console.error(err.message);
    }
}

module.exports = { handleError };