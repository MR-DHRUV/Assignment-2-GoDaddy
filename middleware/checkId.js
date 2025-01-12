const {handleError} = require('../routes/utils');

// middleware to check if the id is present
const checkId = (req, res, next) => {
    const id = req.params.id;
    if (!id) {
        return handleError(res, 400, 'ID is required.');
    }
    next();
};

module.exports = {checkId};
