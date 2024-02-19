import axios from "../setup/axios";
const fetchAllRoles = async (page, limit) => {
    const response = await axios.get(`/api/v1/role/show`);

    return response;
}
const createNewRole = async (newRoleData) => {
    const response = await axios.post('/api/v1/role/create', {
        ...newRoleData
    });
    return response;
}

const handleUpdateRole = async (newRoleData) => {
    const response = await axios.put('/api/v1/role/update', {
        ...newRoleData
    });
    return response;
}

const handleDeleteRole = async (roleID) => {
    const response = await axios.delete('/api/v1/role/delete', {
        data: {
            id: roleID
        }
    });
    return response;
}


let RoleService = {
    fetchAllRoles,
    createNewRole,
    handleUpdateRole,
    handleDeleteRole
}

export default RoleService;