import React, { useEffect, useState, forwardRef, useImperativeHandle } from 'react';
import RoleService from '../../services/roleService';
import { toast } from 'react-toastify';

const TableRoles = forwardRef((props, ref) => {

    const [roleList, setRoleList] = useState({});

    useEffect(() => {
        fetchAllRoles();
    }, [])

    useImperativeHandle(ref, () => ({
        fetchRoleListAgain() {
            fetchAllRoles();
        }
    }));


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

    const handleUpdateRole = async (roleData) => {
        try {
            let response = await RoleService.handleUpdateRole(roleData);
            if (response && response.errCode === '0') {
                toast.success(response.errMsg);
                await fetchAllRoles();
            } else {
                toast.error("Error fetching roles: " + response?.errMsg);
            }
        } catch (error) {

        }
    }

    const handleDeleteRole = async (roleId) => {
        try {
            let response = await RoleService.handleDeleteRole(roleId);
            if (response && response.errCode === '0') {
                toast.success(response.errMsg);
                await fetchAllRoles();
            } else {
                toast.error("Error fetching roles: " + response?.errMsg);
            }
        } catch (error) {

        }
    }

    return (
        <>
            <table className='table table-bordered table-hover'>
                <thead>
                    <tr>

                        <th scope='col'>#</th>
                        <th scope='col'>Role ID</th>
                        <th scope='col'>URL</th>
                        <th scope='col'>Description</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {roleList && roleList.length > 0
                        ? <>
                            {roleList.map((role, index) => {
                                return <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{role.id}</td>
                                    <td>{role.url}</td>
                                    <td>{role.description}</td>
                                    <td>
                                        <button title='Edit a role' id="edit-btn" className='btn btn-warning mx-1'
                                            onClick={() => handleUpdateRole(role)}>
                                            <i className="fa fa-pencil-square" ></i>
                                        </button>
                                        <button title='Delete a role' id="delete-btn" className='btn btn-danger mx-1'
                                            onClick={() => handleDeleteRole(role.id)}>
                                            <i className="fa fa-trash-o"></i>

                                        </button>
                                    </td>
                                </tr>

                            })}
                        </>
                        : <tr><td colSpan={5} className='text-center'><p>Not found Roles</p></td></tr>}
                </tbody>
            </table>
        </>
    );
});

export default TableRoles;