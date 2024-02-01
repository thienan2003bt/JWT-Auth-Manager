import mysql from 'mysql2';

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'jwt_auth_manager',
});

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

        connection.query(`
            INSERT INTO users (email, username, password)
            VALUES (?, ?, ?)
        `, [email, username, password],
            (err, results, fields) => {
                if (err) console.log(err);

                console.log(results);
            });

        return res.send(req.body);
    },
}