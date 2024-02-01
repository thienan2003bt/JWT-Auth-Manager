import express from 'express';
const router = express.Router();

import HomeController from '../controlllers/home.c';

/**
 * 
 * @param {*} app - express app
 */
const initWebRoutes = (app) => {
    router.get('/', HomeController.renderHome);

    router.get('/user', HomeController.renderUserPage);

    return app.use('/', router);
}

export default initWebRoutes;