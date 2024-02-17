import axios from 'axios';
import { toast } from 'react-toastify';

const instance = axios.create({
    baseURL: 'http://localhost:8080/'
});


//for sending cookies to client side
instance.defaults.withCredentials = true;

//Request interceptor
instance.interceptors.request.use((config) => {
    return config;
}, (err) => {
    return Promise.reject(err);
});


//Response interceptor
instance.interceptors.response.use((response) => {
    return response.data;
}, (err) => {
    console.log("err" + err.message);
    const status = err?.response?.status;
    console.log("status: " + status);
    switch (status) {
        //Unauthorized
        case 401: {
            toast.error("Unauthorized user. Please login ...");
            return Promise.reject(err);
        }

        // forbidden (permission related issues)
        case 403: {
            toast.error("You do not have permission to access this resource ...");
            return Promise.reject(err);
        }

        // bad request
        case 400: {
            return Promise.reject(err.message);
        }

        // not found
        case 404: {
            return Promise.reject(err.message);
        }

        // conflict
        case 409: {
            return Promise.reject(err.message);
        }

        // unprocessable
        case 422: {
            return Promise.reject(err.message);
        }

        // generic api error (server related) unexpected
        default: {
            return Promise.reject(err.message);
        }
    }

});

export default instance;