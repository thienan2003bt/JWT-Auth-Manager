
const getTestAPI = (req, res, next) => {
    try {
        res.status(200).json({
            message: 'ok',
            data: 'test api data returned successfully'
        });
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getTestAPI,
};