import express from 'express';
const router = express.Router();

import APIController from '../controllers/api.c';
import UserController from '../controllers/user.c';
import GroupController from '../controllers/group.c';
import JWTMiddleware from '../middlewares/jwt.m';


const initAPIRoutes = (app) => {
    //middlewares

    router.all('*', JWTMiddleware.checkUser, JWTMiddleware.checkUserPermission);

    //GET
    router.get('/test-api', APIController.getTestAPI);
    router.get('/user/show', UserController.showUserList);
    router.get('/group/show', GroupController.getAllGroups);
    router.get('/account', UserController.getUserAccount);
    //POST
    router.post('/signup', APIController.postSignup);
    router.post('/login', APIController.postLogin);
    router.post('/logout', APIController.postLogout);
    router.post('/user/create', UserController.createNewUser);

    //PUT
    router.put('/user/update', UserController.updateUser);

    //DELETE
    router.delete('/user/delete', UserController.deleteUser);

    return app.use('/api/v1/', router);
}

export default initAPIRoutes;