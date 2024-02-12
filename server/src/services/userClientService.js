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



const checkPassword = async (password, hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword);
}

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
                data: null,
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
            data: null,
        }

    } catch (error) {
        console.log("Error: ", error.message);
        return {
            errCode: '-2',
            errMsg: 'Something wrong creating new user ...',
            data: null,
        }
    }

};


const handleLogin = async (rawUser) => {
    try {
        let existingUser = await db.User.findOne({
            where: { email: rawUser.email }
        });

        existingUser = existingUser?.dataValues;

        if (!existingUser) {
            return {
                errCode: '-1',
                errMsg: 'Email or password is incorrect',
                data: null,
            }
        }

        let passwordState = await checkPassword(rawUser.password, existingUser.password);
        if (passwordState === true) {
            return {
                errCode: '0',
                errMsg: 'Login successfully',
                data: null,
            }
        } else {
            return {
                errCode: '-1',
                errMsg: 'Email or password is incorrect',
                data: null,
            }
        }

    } catch (error) {
        console.log("Error: ", error.message);
        return {
            errCode: '-2',
            errMsg: 'Something wrong logging user ...',
            data: null,
        }
    }
}

const showUserList = async () => {
    try {
        let userList = await db.User.findAll({
            attributes: ["id", "email", "username", "phone", "sex", "address"],
            include: { model: db.Group, attributes: ["name", "description"] },
            nest: true
        });
        if (userList) {
            userList = userList.map((user) => {
                let returnedUser = {
                    ...user.dataValues,
                    password: null,
                }

                return returnedUser;
            });
            return {
                errCode: '0',
                errMsg: 'Get all users successfully',
                data: userList,
            }
        } else {
            return {
                errCode: '-2',
                errMsg: 'Something wrong getting all users ...',
                data: null,
            }
        }

    } catch (error) {
        console.log("Error: ", error.message);
        return {
            errCode: '-2',
            errMsg: 'Something wrong getting all users ...',
            data: null,
        }
    }
};

const showUserListWithPagination = async (page, limit) => {
    page = parseInt(page);
    limit = parseInt(limit);
    let offset = (page - 1) * limit;
    try {
        const { count, rows } = await db.User.findAndCountAll({
            attributes: ["id", "email", "username", "phone", "sex", "address"],
            include: { model: db.Group, attributes: ["name", "description"] },
            nest: true,
            offset: offset,
            limit: limit
        });

        if (count && rows) {
            let data = {
                total: count,
                totalPage: Math.ceil(count / limit),
                userList: rows
            }

            return {
                errCode: '0',
                errMsg: 'Get all users successfully',
                data: data,
            }
        } else {
            return {
                errCode: '-1',
                errMsg: 'Something wrong getting all users with pagination ...',
                data: null,
            }
        }

    } catch (error) {
        console.log("Error: ", error.message);
        return {
            errCode: '-2',
            errMsg: 'Something wrong getting all users  with pagination ...',
            data: null,
        }
    }
};


const updateUser = async (data) => {
    try {
        let user = await db.User.findOne({
            where: {
                id: data.id,
            }
        });

        if (user) {
            await db.User.update();
        } else {
            //TODO: Not found
        }

    } catch (error) {
        console.log("Error: ", error.message);
        return {
            errCode: '-2',
            errMsg: 'Something wrong updating user ...',
            data: null,
        }
    }
};

const deleteUser = async (userID) => {
    try {
        let response = await db.User.delete({
            where: {
                id: userID
            }
        })

    } catch (error) {
        console.log("Error: ", error.message);
        return {
            errCode: '-2',
            errMsg: 'Something wrong deleting user ...',
            data: null,
        }
    }
};


module.exports = {
    createNewUser,
    handleLogin,
    showUserList,
    showUserListWithPagination,
    updateUser,
    deleteUser,
};