import express from 'express';
const router = express.Router();

import APIController from '../controllers/api.c';
import UserController from '../controllers/user.c';

/**
 * 
 * @param {*} app - express app
 */
const initAPIRoutes = (app) => {
    //middlewares


    //GET
    router.get('/test-api', APIController.getTestAPI);
    router.get('/user/show', UserController.showUserList);

    //POST
    router.post('/signup', APIController.postSignup);
    router.post('/login', APIController.postLogin);
    router.post('/user/create', UserController.createNewUser);

    //PUT
    router.put('/user/update', UserController.updateUser);

    //DELETE
    router.delete('/user/delete', UserController.deleteUser);

    return app.use('/api/v1/', router);
}

export default initAPIRoutes;