import mysql from 'mysql2/promise';
import bcrypt from 'bcrypt';
import bluebird from 'bluebird';





const SALT_ROUND = bcrypt.genSaltSync(10);

const hashUserPassword = async (rawPassword) => {
    return await bcrypt.hash(rawPassword, SALT_ROUND);
};

const getUserList = async () => {
    try {
        const connection = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            database: 'jwt_auth_manager',
            Promise: bluebird
        });

        let userList = [];
        const [rows, fields] = await connection.execute(`
            SELECT * FROM users
        `);

        userList = rows;
        return userList;
    } catch (error) {
        console.log("Error: ", error.message);
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