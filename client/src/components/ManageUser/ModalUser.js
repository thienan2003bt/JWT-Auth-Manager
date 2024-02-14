import { React, useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './Users.scss';
import UserService from '../../services/userService';
import { toast } from 'react-toastify';

function ModalUser(props) {
    const { title, show, dataModal, handleClose, handleDelete } = props;
    const [userGroupList, setUserGroupList] = useState([]);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [username, setUsername] = useState('');
    const [gender, setGender] = useState('');
    const [address, setAddress] = useState('');
    const [group, setGroup] = useState('');


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
    }, [userGroupList]);

    return (
        <>
            <Modal size="lg" show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='modal-content-body row'>
                        <div className='col-12 col-sm-6 form-group'>
                            <label>Email <span className='red'>(*)</span>: </label>
                            <input className="form-control" type="email" />
                        </div>
                        <div className='col-12 col-sm-6 form-group'>
                            <label>Phone number <span className='red'>(*)</span>: </label>
                            <input className="form-control" type="text" />
                        </div>
                        <div className='col-12 col-sm-6 form-group'>
                            <label>Username <span className='red'>(*)</span>: </label>
                            <input className="form-control" type="text" />
                        </div>
                        <div className='col-12 col-sm-6 form-group'>
                            <label>Password: <span className='red'>(*)</span>: </label>
                            <input className="form-control" type="password" />
                        </div>
                        <div className='col-12 form-group'>
                            <label>Address: </label>
                            <input className="form-control" type="password" />
                        </div>
                        <div className='col-12 col-sm-6 form-group'>
                            <label>Sex: <span className='red'>(*)</span>: </label>
                            <select className="form-select" aria-label="Default select example">
                                <option defaultValue value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                        <div className='col-12 col-sm-6 form-group'>
                            <label>Group <span className='red'>(*)</span>: </label>
                            <select className="form-select" aria-label="Default select example">
                                {userGroupList && userGroupList.length > 0 && userGroupList.map((group, index) => {
                                    return (<option key={index} value={group.name}>
                                        {group.description}
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
                    <Button variant="primary" onClick={handleDelete}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalUser;