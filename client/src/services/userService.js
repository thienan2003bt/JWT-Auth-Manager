import axios from "../setup/axios";

const createNewUser = async (email, username, phone, password) => {
    const response = await axios.post('/api/v1/signup', {
        email, username, phone, password,
        groupId: '5' //Guest by default
    });

    return response;
}

const handleLogin = async (email, password) => {
    const response = await axios.post('/api/v1/login', {
        email, password
    });

    return response;
}

const fetchAllUsers = async (page, limit) => {
    const response = await axios.get(`/api/v1/user/show?page=${page}&limit=${limit}`);

    return response;
}


const deleteUser = async (userID) => {
    const response = await axios.delete(`/api/v1/user/delete`, {
        data: {
            id: userID
        }
    });
    return response;
}

const fetchAllGroups = async () => {
    const response = await axios.get(`/api/v1/group/show`);

    return response;
}

const createNewUserByModal = async (user) => {
    const response = await axios.post(`/api/v1/user/create`, {
        ...user,
        sex: user?.gender,
        groupId: user?.group
    });

    return response;
}

const updateUser = async (user) => {
    const response = await axios.put(`/api/v1/user/update`, {
        ...user,
        sex: user?.gender,
        groupId: user?.group
    });

    return response;
}


let UserService = {
    createNewUser,
    handleLogin,
    fetchAllUsers,
    deleteUser,
    fetchAllGroups,
    createNewUserByModal,
    updateUser
}

export default UserService;