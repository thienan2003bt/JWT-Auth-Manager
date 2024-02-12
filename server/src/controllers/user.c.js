import UserClientService from '../services/userClientService';

const showUserList = async (req, res, next) => {
    try {
        let userList = await UserClientService.showUserList();
        res.status(200).json(userList);
    } catch (error) {
        next(error);
    }
};

const createNewUser = async (rqe, res, next) => {
    try {

    } catch (error) {
        next(error);
    }
};

const updateUser = async (rqe, res, next) => {
    try {

    } catch (error) {
        next(error);
    }
};

const deleteUser = async (rqe, res, next) => {
    try {

    } catch (error) {
        next(error);
    }
};

module.exports = {
    showUserList,
    createNewUser,
    updateUser,
    deleteUser
};