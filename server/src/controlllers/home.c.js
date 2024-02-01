


module.exports = {
    renderHome: async (req, res, next) => {
        try {
            return res.render('home.ejs');
        } catch (err) {
            next(err);
        }
    },

    renderUserPage: async (req, res, next) => {
        return res.render('user.ejs');
    },
}