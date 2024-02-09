import bcrypt from 'bcrypt';
import db from '../models/index';

const SALT_ROUND = bcrypt.genSaltSync(10);

/**
 * 
 * @param {*} rawPassword - password inputted from client
 * @returns hashed password by bcrypt
 */
const hashUserPassword = async (rawPassword) => {
    return await bcrypt.hash(rawPassword, SALT_ROUND);
};


/**
 * 
 * @param {*} email - email inputted from client
 * @param {*} password - password inputted from client
 * @param {*} username - username inputted from client
 */
const createNewUser = async (newUser) => {
    try {
        let existingUser = await db.User.findOne({
            where: { email: newUser.email }
        });

        if (existingUser) {
            return {
                errCode: '-1',
                errMsg: 'The email is already in use',
                errData: null,
            }
        }


        let hashedPassword = await hashUserPassword(newUser.password);

        await db.User.create({
            email: newUser.email,
            username: newUser.username,
            phone: newUser.phone,
            password: hashedPassword,
        });

        return {
            errCode: '0',
            errMsg: 'New user is created successfully',
            errData: null,
        }

    } catch (error) {
        console.log("Error: ", error.message);
        return {
            errCode: '-2',
            errMsg: 'Something wrong creating new user',
            errData: null,
        }
    }

};


module.exports = {
    createNewUser,
};