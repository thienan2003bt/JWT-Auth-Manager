import axios from "../setup/axios";

const createNewRole = async (newRoleData) => {
    const response = await axios.post('/api/v1/role/create', {
        ...newRoleData
    });
    return response;
}


let RoleService = {
    createNewRole
}

export default RoleService;