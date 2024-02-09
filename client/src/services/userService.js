import axios from "axios";

const createNewUser = async (email, username, phone, password) => {
    const response = await axios.post('http://localhost:8080/api/v1/signup', {
        email, username, phone, password
    });

    return response;
}

let UserService = {
    createNewUser,
}

export default UserService;