import express from 'express';
import configViewEngine from './config/viewEngine';
import initWebRoutes from './routes/web.r';


require('dotenv').config();
const PORT = process.env.PORT || 8080; //8080 by default

const app = express();

//config express middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//config view engine
configViewEngine(app);

//init view engine
initWebRoutes(app);


app.listen(PORT, () => {
    console.log("JWT Server is listening on port " + PORT + ", url: http://localhost:" + PORT);
})