import UserClientService from '../services/userClientService';

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

const postSignup = async (req, res, next) => {
    try {

        if (!req.body?.email || !req.body?.username || !req.body?.phone || !req.body?.password) {
            return res.json({
                errCode: '-1',
                errMsg: 'Missing required parameters',
                data: ''
            });
        }


        let newUser = await UserClientService.createNewUser(req.body);


        return res.status(200).json({
            errCode: newUser.errCode,
            errMsg: newUser.errMsg,
            data: newUser.data
        });
    } catch (error) {
        next(error);
    }
}

const postLogin = async (req, res, next) => {
    try {
        if (!req.body?.email || !req.body?.password) {
            return res.json({
                errCode: '-1',
                errMsg: 'Missing required parameters',
                data: ''
            });
        }

        let newUser = await UserClientService.handleLogin(req.body);

        if (newUser && newUser.data && newUser.data.accessToken) {
            res.cookie("accessToken", newUser.data?.accessToken, { httpOnly: true, maxAge: 60 * 60 * 1000 }); //1h
        }
        return res.status(200).json({
            errCode: newUser.errCode,
            errMsg: newUser.errMsg,
            data: newUser.data
        });
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getTestAPI,
    postSignup,
    postLogin
};