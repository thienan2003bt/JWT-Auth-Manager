import { React, useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './Users.scss';
import UserService from '../../services/userService';
import { toast } from 'react-toastify';
import _ from 'lodash';


function ModalUser(props) {
    const { action, show, dataModal, handleClose, handleSave } = props;
    const [userGroupList, setUserGroupList] = useState([]);

    const title = (action === "CREATE" ? "Create new user" : "Update user");
    const defaultUserData = {
        email: '',
        password: '',
        phone: '',
        username: '',
        gender: 'Male', //Male by default
        address: '',
        group: '4', //Customer by default
    }


    const defaultValidInputs = {
        email: true,
        password: true,
        phone: true,
        username: true,
        gender: true,
        address: true,
        group: true,
    }

    const [userData, setUserData] = useState(defaultUserData);
    const [validInput, setValidInput] = useState(defaultValidInputs);


    const handleOnChangeInput = (val, name) => {
        let _userData = _.cloneDeep(userData);
        _userData[name] = val;

        setUserData(_userData);
    };

    const checkValidate = () => {
        let options = ['email', 'phone', 'password', 'username', 'gender', 'address', 'group'];
        let state = true;
        for (let i = 0; i < options.length; i++) {
            let attrName = options[i];
            if (!userData[attrName]) {
                let _validInput = _.cloneDeep(validInput);
                _validInput[attrName] = false;
                setValidInput(_validInput);
                console.log("User data: " + JSON.stringify(userData));

                let capitalizedAttrName = attrName.charAt(0).toUpperCase() + attrName.slice(1);
                toast.error(`${capitalizedAttrName} is required`);
                state = false;
                break;
            }
        }

        return state;
    }

    const handleConfirm = async () => {
        let validState = checkValidate();
        if (validState === true) {
            let response = await UserService.createNewUserByModal(userData);
            if (response && response.data && response.data.errCode === '0') {
                toast.success(response.data.errMsg);
                handleSave();

                setUserData(defaultUserData);
                handleClose();
            } else {
                toast.error("Error creating new user ...");
                toast.error(response.data.errMsg);
            }
        }
    }

    const fetchAllGroups = async () => {
        let response = await UserService.fetchAllGroups();
        if (response && response.data && response.data.errCode === '0') {
            setUserGroupList(response.data.data);
        } else {
            toast.error("Error fetching groups");
            if (response && response.data) {
                toast.error(response.data.errMsg);
            }
        }
    }

    useEffect(() => {
        fetchAllGroups();
    }, []);

    useEffect(() => {
        if (action === "EDIT") {
            if (dataModal) {

                setUserData({
                    ...dataModal,
                    group: dataModal.Group?.id || '4',
                    gender: dataModal?.sex || 'Male',
                    phone: dataModal?.phone || '',
                    address: dataModal?.address || '',
                });
            } else {
                setUserData(defaultUserData);
            }
        }
    }, [dataModal]);

    return (
        <>
            <Modal size="lg" show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='modal-content-body row'>
                        <div className='col-12 col-sm-6 form-group'>
                            <label htmlFor="email">Email <span className='red'>(*)</span>: </label>
                            <input className={validInput.email === true ? "form-control" : "form-control is-invalid"}
                                type="email" id="email" name="email" disabled={action === "CREATE" ? false : true}

                                value={userData.email} onChange={(e) => handleOnChangeInput(e.target.value, e.target.name)} />
                        </div>
                        <div className='col-12 col-sm-6 form-group'>
                            <label htmlFor="phone">Phone number <span className='red'>(*)</span>: </label>
                            <input className={validInput.phone === true ? "form-control" : "form-control is-invalid"}
                                type="text" name="phone" id="phone"
                                value={userData.phone} onChange={(e) => handleOnChangeInput(e.target.value, e.target.name)} />
                        </div>
                        <div className='col-12 col-sm-6 form-group'>
                            <label htmlFor="username">Username <span className='red'>(*)</span>: </label>
                            <input className={validInput.username === true ? "form-control" : "form-control is-invalid"}
                                type="text" name="username" id="username"
                                value={userData.username} onChange={(e) => handleOnChangeInput(e.target.value, e.target.name)} />
                        </div>
                        <div className='col-12 col-sm-6 form-group'>
                            {action === "CREATE" &&
                                <>
                                    <label htmlFor="password">Password: <span className='red'>(*)</span>: </label>
                                    <input className={validInput.password === true ? "form-control" : "form-control is-invalid"}
                                        type="password" name="password" id="password"
                                        value={userData.password} onChange={(e) => handleOnChangeInput(e.target.value, e.target.name)} />
                                </>
                            }

                        </div>
                        <div className='col-12 form-group'>
                            <label htmlFor="address">Address: </label>
                            <input className={validInput.address === true ? "form-control" : "form-control is-invalid"}
                                type="text" name="address" id="address"
                                value={userData.address} onChange={(e) => handleOnChangeInput(e.target.value, e.target.name)} />
                        </div>
                        <div className='col-12 col-sm-6 form-group'>
                            <label htmlFor="gender">Sex: <span className='red'>(*)</span>: </label>
                            <select className={validInput.gender === true ? "form-select" : "form-select is-invalid"}
                                name="gender" id="gender"
                                value={userData.gender} onChange={(e) => handleOnChangeInput(e.target.value, e.target.name)}>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        <div className='col-12 col-sm-6 form-group'>
                            <label htmlFor="group">Group <span className='red'>(*)</span>: </label>
                            <select className={validInput.group === true ? "form-select" : "form-select is-invalid"}
                                name="group" id="group"
                                value={userData.group} onChange={(e) => handleOnChangeInput(e.target.value, e.target.name)}>
                                {userGroupList && userGroupList.length > 0 && userGroupList.map((group, index) => {
                                    return (<option key={index} value={group.id}>
                                        {group.name}
                                    </option>)
                                })}
                            </select>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => handleConfirm()}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalUser;