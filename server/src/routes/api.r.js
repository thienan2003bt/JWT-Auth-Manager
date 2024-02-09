import express from 'express';
const router = express.Router();

import APIController from '../controllers/api.c';


/**
 * 
 * @param {*} app - express app
 */
const initAPIRoutes = (app) => {
    //middlewares


    //GET
    router.get('/test-api', APIController.getTestAPI);


    //POST
    router.post('/signup', APIController.postSignup);
    router.post('/login', APIController.postLogin);

    return app.use('/api/v1/', router);
}

export default initAPIRoutes;