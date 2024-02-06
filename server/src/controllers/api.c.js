
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

const postSignup = (req, res, next) => {
    try {
        console.log("Have reached there");
        res.status(200).json({
            message: 'ok',
            data: req.body
        });
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getTestAPI,
    postSignup,
};