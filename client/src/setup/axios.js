import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:8080/'
});


//Request interceptor
instance.interceptors.request.use((config) => {
    return config;
}, (error) => {
    return Promise.reject(error);
});


//Response interceptor
instance.interceptors.response.use((response) => {
    return response.data;
}, (error) => {
    return Promise.reject(error);
});

export default instance;