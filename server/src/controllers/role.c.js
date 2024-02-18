import RoleService from '../services/roleService';

const showRoleList = async (req, res, next) => {

}

const createNewRole = async (req, res, next) => {
    try {
        let response = await RoleService.createNewRole(req.body);
        return res.status(200).json(response);
    } catch (error) {
        next(error);
        return res.status(500).json({
            errCode: '-3',
            errMsg: 'Service error ...',
            data: null,
        });
    }
}

const updateRole = async (req, res, next) => {

}

const deleteRole = async (req, res, next) => {

}

module.exports = {
    showRoleList,
    createNewRole,
    updateRole,
    deleteRole
};