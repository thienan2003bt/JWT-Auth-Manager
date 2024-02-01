import express from 'express';
import path from 'path';

/**
 * 
 * @param {*} app - express app
 */
const configViewEngine = (app) => {
    app.use(express.static(path.join(__dirname, '/public')));

    app.set('views', path.join(__dirname, '/views'));
    app.set('view engine', 'ejs');
}

export default configViewEngine;