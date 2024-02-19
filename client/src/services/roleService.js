import axios from "../setup/axios";
const fetchAllRoles = async () => {
    const response = await axios.get(`/api/v1/role/show`);

    return response;
}

const fetchRolesByGroup = async (groupID) => {
    const response = await axios.get(`/api/v1/role/show?groupID=${groupID}`);

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

const assignRoleToGroup = async (data) => {

    const response = await axios.post('/api/v1/role/assign-to-group', {
        ...data
    });
    return response;
}

let RoleService = {
    fetchAllRoles,
    fetchRolesByGroup,
    createNewRole,
    handleUpdateRole,
    handleDeleteRole,
    assignRoleToGroup
}

export default RoleService;