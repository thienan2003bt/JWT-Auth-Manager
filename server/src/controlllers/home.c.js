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
        let userList = await UserService.getUserList();

        return res.render('user.ejs', {
            userList: userList
        });
    },

    insertNewUser: async (req, res, next) => {
        const { email, username, password } = req.body;

        await UserService.createNewUser(email, username, password);

        return res.send(req.body);
    },
}