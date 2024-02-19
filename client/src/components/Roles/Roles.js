import React, { useEffect, useRef, useState } from 'react';
import _ from 'lodash';
import './roles.scss';
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
import RoleService from '../../services/roleService';
import TableRoles from './TableRoles';

function Roles(props) {

    const defaultRoleList = {
        child1: { url: '', description: '', isValidURL: true }
    };
    const [roleList, setRoleList] = useState(defaultRoleList);
    const childRef = useRef();

    const handleOnChangeInput = (name, key, value) => {
        let _roleList = _.cloneDeep(roleList);
        _roleList[key][name] = value;

        if (name === 'url' && value && _roleList[key]['isValidURL'] === false) {
            _roleList[key]['isValidURL'] = true;
        }

        setRoleList(_roleList);
    }

    const handleAddNewInput = () => {
        toast.success("Add new role input successfully");
        let _roleList = _.cloneDeep(roleList);
        _roleList[`child${uuidv4()}`] = {
            url: '', description: '', isValidURL: true
        };
        setRoleList(_roleList);

        // console.log(roleList);
        //_roleList.push({ key: `child-${uuidv4()}`, url: '', description: '' });
        //setRoleList(_roleList);
    }

    const handleDeleteInput = (key) => {
        let _roleList = _.cloneDeep(roleList);
        //_roleList.splice(index);
        delete _roleList[key];
        toast.warning("Delete role input successfully");

        setRoleList(_roleList);
    }


    const buildDataToPersist = () => {
        let _roleList = _.cloneDeep(roleList);
        let data = [];
        Object.entries(_roleList).map(([key, child], index) => {
            data.push({ url: child.url, description: child.description });
        });

        return data;
    }

    const handleSave = async () => {
        let invalidObj = Object.entries(roleList).find(([key, child], index) => {
            return child && !child.url;
        });

        if (!invalidObj) {
            let data = buildDataToPersist();
            let response = await RoleService.createNewRole(data);
            if (response && response.data && response.errCode === '0') {
                toast.success(response.errMsg);
                childRef.current.fetchRoleListAgain();
            } else {
                toast.error("Error creating role: " + response?.errMsg);
            }
        } else {
            toast.error("URL is required")
            let _roleList = _.cloneDeep(roleList);
            _roleList[invalidObj[0]]['isValidURL'] = false;

            setRoleList(_roleList);
        }
    }



    return (
        <div className='role-container'>
            <div className='container'>
                <div className='adding-role row mt-3'>
                    <h4 className='col-12 text-center'>Manage Roles</h4>
                    <div className='role-parent'>
                        {
                            Object.entries(roleList).map(([key, child], index) => {
                                return (
                                    <div className='row role-child my-2' key={`child${key}`}>
                                        <div className='col-5 form-group'>
                                            <label>URL: </label>
                                            <input type='text' name='url' id='url'
                                                className={child.isValidURL ? 'form-control' : 'form-control is-invalid'}
                                                value={child.url} onChange={(e) => handleOnChangeInput(e.target.name, key, e.target.value)} />
                                        </div>
                                        <div className='col-5 form-group'>
                                            <label>Description: </label>
                                            <input type='text' className='form-control' name='description' id='description'
                                                value={child.description} onChange={(e) => handleOnChangeInput(e.target.name, key, e.target.value)} />
                                        </div>

                                        <div className='col-2 actions'>
                                            <div><label>Actions: </label></div>
                                            <button className='btn btn-primary' onClick={() => handleAddNewInput()}>
                                                <i className="fa fa-plus"></i>
                                            </button>
                                            {index >= 1 && <button className='btn btn-danger' onClick={() => handleDeleteInput(key)}>
                                                <i className="fa fa-trash-o"></i>
                                            </button>}

                                        </div>
                                    </div>
                                )
                            })
                        }


                        <div className='container'>
                            <button className='btn btn-warning mt-3' onClick={() => handleSave()}>Save</button>
                        </div>

                    </div>
                </div>
                <hr />
                <div className='mt-3'>
                    <h4 className='text-center'>List of roles</h4>
                    <TableRoles ref={childRef} />
                </div>
            </div>

        </div>
    );
}

export default Roles;