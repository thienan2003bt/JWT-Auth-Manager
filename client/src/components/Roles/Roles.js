import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import './roles.scss';
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';

function Roles(props) {

    const defaultRoleList = {
        child1: { url: '', description: '' }
    };
    const [roleList, setRoleList] = useState(defaultRoleList);


    const handleOnChangeInput = (name, key, value) => {
        let _roleList = _.cloneDeep(roleList);
        _roleList[key][name] = value;

        setRoleList(_roleList);
    }

    const handleAddNewInput = () => {
        toast.success("Add new role input successfully");
        let _roleList = _.cloneDeep(roleList);
        _roleList[`child${uuidv4()}`] = {
            url: '', description: ''
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

    return (
        <div className='role-container'>
            <div className='container'>
                <div className='row mt-3'>
                    <h4 className='col-12 text-center'>Manage Roles</h4>
                    <div className='role-parent'>
                        {
                            Object.entries(roleList).map(([key, child], index) => {
                                return (
                                    <div className='row role-child my-2' key={`child${key}`}>
                                        <div className='col-5 form-group'>
                                            <label>URL: </label>
                                            <input type='text' className='form-control' name='url' id='url'
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
                            <button className='btn btn-warning mt-3'>Save</button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default Roles;