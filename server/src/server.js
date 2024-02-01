import express from 'express';
import configViewEngine from './configs/viewEngine';
import initWebRoutes from './routes/web.r';

require('dotenv').config();
const PORT = process.env.PORT || 8080; //8080 by default

const app = express();

//config view engine
configViewEngine(app);

//init view engine
initWebRoutes(app);


app.listen(PORT, () => {
    console.log("JWT Server is listening on port " + PORT + ", url: http://localhost:" + PORT);
})