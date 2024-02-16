import express from 'express';
const router = express.Router();

import APIController from '../controllers/api.c';
import UserController from '../controllers/user.c';
import GroupController from '../controllers/group.c';
import JWTMiddleware from '../middlewares/jwt.m';

const checkUserLogin = (req, res, next) => {
    const nonSecurePaths = ['/test-api', '/signup', '/login'];

    if (nonSecurePaths.includes(req.path)) {
        return next();
    }

    //TODO: check authentication here
    return next();
};


const initAPIRoutes = (app) => {
    //middlewares


    //GET
    router.get('/test-api', APIController.getTestAPI);
    router.get('/user/show', JWTMiddleware.checkUser, JWTMiddleware.checkUserPermission, UserController.showUserList);
    router.get('/group/show', GroupController.getAllGroups);

    //POST
    router.post('/signup', APIController.postSignup);
    router.post('/login', APIController.postLogin);
    router.post('/user/create', JWTMiddleware.checkUser, JWTMiddleware.checkUserPermission, UserController.createNewUser);

    //PUT
    router.put('/user/update', JWTMiddleware.checkUser, JWTMiddleware.checkUserPermission, UserController.updateUser);

    //DELETE
    router.delete('/user/delete', JWTMiddleware.checkUser, JWTMiddleware.checkUserPermission, UserController.deleteUser);

    return app.use('/api/v1/', router);
}

export default initAPIRoutes;