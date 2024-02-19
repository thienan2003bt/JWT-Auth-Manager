import React, { useEffect, useState } from 'react';
import './GroupRole.scss';
import UserService from '../../services/userService';
import { toast } from 'react-toastify';
import RoleService from '../../services/roleService';
import _ from 'lodash';

function GroupRole(props) {
    const defaultUserGroupList = [];
    const defaultRoleList = [];

    const [userGroupList, setUserGroupList] = useState(defaultUserGroupList);
    const [roleList, setRoleList] = useState(defaultRoleList);
    const [selectedGroup, setSelectedGroup] = useState('');
    const [assignRoleByGroup, setAssignRoleByGroup] = useState([]);


    useEffect(() => {
        fetchAllGroups();
        fetchAllRoles();
    }, []);

    const handleOnChangeSelect = async (groupID) => {
        setSelectedGroup(groupID);
        if (groupID) {
            await fetchRolesByGroup(groupID);
        }
    }

    const fetchAllGroups = async () => {
        try {
            let response = await UserService.fetchAllGroups();
            if (response && response && response.errCode === '0') {
                setUserGroupList(response.data);
            } else {
                toast.error("Error fetching groups: " + response?.errMsg);
            }
        } catch (error) {
            toast.error("Error fetching groups: " + error.message);
        }
    }

    const fetchRolesByGroup = async (groupID) => {
        try {
            let response = await RoleService.fetchRolesByGroup(groupID);
            if (response && response && response.errCode === '0') {
                let result = buildDataByGroup(response.data);
                setAssignRoleByGroup(result);
            } else {
                toast.error("Error fetching groups: " + response?.errMsg);
            }
        } catch (error) {
            toast.error("Error fetching groups: " + error.message);
        }
    }

    const buildDataByGroup = (groupRoles) => {
        groupRoles = groupRoles.map((role) => role.Roles);
        let result = [];
        if (roleList && roleList.length > 0) {
            roleList.map((role) => {
                let object = {
                    ...role,
                    isAssigned: false
                }

                if (groupRoles && groupRoles.length > 0) {
                    object.isAssigned = groupRoles.some((role) => role.url === object.url) ? true : false;
                }

                result.push(object);
            })
        }

        return result;
    }

    const fetchAllRoles = async () => {
        try {
            let response = await RoleService.fetchAllRoles();
            if (response && response.errCode === '0') {
                setRoleList(response.data);
                toast.success(response.errMsg);
            } else {
                toast.error("Error fetching roles: " + response?.errMsg);
            }
        } catch (error) {
            toast.error("Error fetching roles: " + error.message);
        }
    }

    const handleSelectRole = (value) => {
        let _assignRoleByGroup = _.cloneDeep(assignRoleByGroup);
        let index = _assignRoleByGroup.findIndex((role) => parseInt(role.id) === parseInt(value));
        if (index > -1) {
            _assignRoleByGroup[index].isAssigned = !_assignRoleByGroup[index].isAssigned;
        }
        setAssignRoleByGroup(_assignRoleByGroup);
    }

    const buildDataToSave = () => {
        let result = {};
        const _assignRoleByGroup = _.cloneDeep(assignRoleByGroup);
        result.groupId = selectedGroup;
        let groupRoles = _assignRoleByGroup.filter((role) => role.isAssigned === true);

        groupRoles = groupRoles.map((role) => {
            return {
                groupId: +result.groupId,
                roleId: +role.id,
            }
        })

        result.groupRoles = groupRoles;
        return result;
    }

    const handleSave = async () => {
        let data = buildDataToSave();
        console.log("Check role data: ");
        console.log(data);
        try {
            let response = await RoleService.assignRoleToGroup(data);
            if (response && response.errCode === '0') {
                toast.success(response.errMsg);
                await fetchRolesByGroup(data.groupId);
            } else {
                toast.error("Error fetching roles: " + response?.errMsg);
            }
        } catch (error) {
            toast.error("Error fetching roles: " + error.message);
        }


    }

    return (
        <div className='group-role-container'>
            <div className='container'>
                <div className='container mt-3'>
                    <h4>Group Role</h4>
                    <div className='assign-group-role'>
                        <div className='col-12 col-sm-6 form-group'>
                            <label htmlFor="group">Select group <span className='red'>(*)</span>: </label>
                            <select className="form-select" name="group" id="group" onChange={(e) => handleOnChangeSelect(e.target.value)}>
                                <option defaultValue >Please select your group</option>
                                {userGroupList && userGroupList.length > 0 && userGroupList.map((group, index) => {
                                    return (<option key={index} value={group.id}>
                                        {group.name}
                                    </option>)
                                })}
                            </select>
                        </div>
                    </div>

                    <hr className='my-2' />
                    {selectedGroup &&
                        <div className='available-role my-4'>
                            <h5>Asisgn roles: </h5>
                            {assignRoleByGroup && assignRoleByGroup.length > 0 && assignRoleByGroup.map((role, index) => {
                                return <div className='form-check my-2' key={`list-role-${index}`}>
                                    <input className='form-check-input role-check-input' type='checkbox' id={`list-role-${index}`}
                                        value={role.id} checked={role.isAssigned} onChange={(e) => handleSelectRole(e.target.value)} />
                                    <label className='role-check-label' htmlFor={`list-role-${index}`}>{role.url}: {role.description}</label>
                                </div>
                            })}


                        </div>
                    }
                    <div className='mt-3'>
                        <button className='btn btn-warning' onClick={() => handleSave()}>Save</button>
                    </div>

                </div>


            </div>
        </div>
    );
}

export default GroupRole;