import jwt from 'jsonwebtoken';
require('dotenv').config();

const secretKey = process.env.JWT_SECRET_KEY;


const verifyToken = (token) => {
    let data = null;

    try {
        let decoded = jwt.verify(token, secretKey);
        data = decoded;
    } catch (error) {
        console.log("JWT verifing error: " + error.message);
    }

    return data;
}

const signJWTSample = () => {
    let payload = {
        foo: 'bar',
    };

    let token = '';
    try {
        token = jwt.sign(payload, secretKey);
    } catch (error) {
        console.log("JWT signing error: " + error.message);
    }

    return token;
}


const JWTMiddleware = {
    verifyToken,
    signJWTSample,
}


module.exports = JWTMiddleware;