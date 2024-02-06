import express from 'express';
const router = express.Router();

import APIController from '../controllers/api.c';

router.get('/test-api', APIController.getTestAPI);

module.exports = router;