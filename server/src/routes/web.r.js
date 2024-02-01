import express from 'express';
const router = express.Router();

import HomeController from '../controlllers/home.c';

/**
 * 
 * @param {*} app - express app
 */
const initWebRoutes = (app) => {

    //GET
    router.get('/', HomeController.renderHome);
    router.get('/user', HomeController.renderUserPage);

    //POST
    router.post('/user/create', HomeController.insertNewUser)

    return app.use('/', router);
}

export default initWebRoutes;