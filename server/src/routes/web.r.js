import express from 'express';

const router = express.Router();


/**
 * 
 * @param {*} app - express app
 */
const initWebRoutes = (app) => {
    router.get('/', (req, res, next) => {
        try {
            return res.send("Hello world !");
        } catch (error) {
            next(error);
        }
    })

    return app.use('/', router);
}

export default initWebRoutes;