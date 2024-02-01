import UserService from '../services/userService';

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

    insertNewUser: async (req, res, next) => {
        const { email, username, password } = req.body;

        await UserService.createNewUser(email, username, password);

        return res.send(req.body);
    },
}