import mysql from 'mysql2';
import bcrypt from 'bcrypt';

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'jwt_auth_manager',
});

const SALT_ROUND = bcrypt.genSaltSync(10);

const hashUserPassword = async (rawPassword) => {
    return await bcrypt.hash(rawPassword, SALT_ROUND);
};

const getUserList = async () => {
    try {
        let userList = [];
        connection.query(`
            SELECT * FROM users
        `, (err, results, fields) => {
            if (err) {
                console.log(err);
                throw new Error(err.message);
            }

            if (!results) {
                throw new Error("No user found in the database");
            }

            userList = results;
        });

        return userList;
    } catch (error) {
        throw error;
    }

}

const createNewUser = async (email, password, username) => {
    try {
        let hashedPassword = await hashUserPassword(password);

        connection.query(`
        INSERT INTO users (email, username, password)
        VALUES (?, ?, ?)
    `, [email, username, hashedPassword],
            (err, results, fields) => {
                if (err) console.log(err);

                console.log(results);
            });
    } catch (error) {
        throw error;
    }

};

module.exports = {
    hashUserPassword,
    getUserList,
    createNewUser
};