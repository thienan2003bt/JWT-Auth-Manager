import axios from "axios";

const createNewUser = async (email, username, phone, password) => {
    const response = await axios.post('http://localhost:8080/api/v1/signup', {
        email, username, phone, password
    });

    return response;
}

const handleLogin = async (email, password) => {
    const response = await axios.post('http://localhost:8080/api/v1/login', {
        email, password
    });

    return response;
}

const fetchAllUsers = async () => {
    const response = await axios.get('http://localhost:8080/api/v1/user/show');

    return response;
}

let UserService = {
    createNewUser,
    handleLogin,
    fetchAllUsers,
}

export default UserService;