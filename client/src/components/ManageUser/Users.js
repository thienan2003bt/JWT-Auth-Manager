import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import UserService from '../../services/userService';
import { toast } from 'react-toastify'
import './Users.scss';
import ModalDelete from './ModalDelete';
import ModalUser from './ModalUser';

import { UserContext } from '../../context/UserProvider';

function Users(props) {

    const { user } = React.useContext(UserContext);

    const [userList, setUserList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentLimit, setCurrentLimit] = useState(3);
    const [showModalDelete, setShowModalDelete] = useState(false);
    const [showModalUser, setShowModalUser] = useState(false);

    const [totalPage, setTotalPageCount] = useState(10);
    const [dataModal, setDataModal] = useState(null);
    const [actionModalUser, setActionModalUser] = useState('');

    useEffect(() => {

        fetchAllUsers();

    }, [currentPage]);

    const fetchAllUsers = async (page) => {


        let state = false;
        try {
            let response = await UserService.fetchAllUsers(page ? page : currentPage, currentLimit);
            if (response && response && response.errCode === '0') {
                state = true;

                response = response.data;
                setUserList(response.userList);
                setTotalPageCount(response.totalPage);
            } else {
                toast.error("Error fetching user list: " + response?.errMsg);
            }
        } catch (error) {
            toast.error("Error fetching user list: " + error.message);
        }

        return state;
    }

    const handleRefresh = async () => {
        let state = await fetchAllUsers();
        if (state) toast.success("User data is up to date");
    }

    const handlePageClick = async (event) => {
        const newOffset = parseInt(event.selected) + 1;
        setCurrentPage(newOffset);
    };

    const handleDeleteUser = async (userID) => {
        setDataModal(userID);
        setShowModalDelete(true);
    }

    const handleCreateUser = async () => {
        setShowModalUser(true);
        setActionModalUser("CREATE");
    }

    const handleCloseModalDelete = async () => {
        setShowModalDelete(false);
        setDataModal(null);
    }


    const handleUpdateUser = async (user) => {
        setDataModal(user);
        setShowModalUser(true);
        setActionModalUser("EDIT");
    }

    const handleCloseModalUser = async () => {
        setShowModalUser(false);
        setDataModal(null);
        await fetchAllUsers();
    }

    const handleConfirmModalDelete = async () => {
        let response = await UserService.deleteUser(dataModal);
        if (response && response && response.errCode === '0') {
            toast.success(response.errMsg);
            await fetchAllUsers();
        } else {
            toast.error("Error deleting user");
            if (response && response) {
                toast.error(response.errMsg);
            }
        }
        setShowModalDelete(false);
        setDataModal(null);
    }

    const handleSaveModalUser = async () => {
        await fetchAllUsers();
    };


    return (
        <div className='container'>
            <div className='manage-users-container'>
                <div className='user-header'>
                    <div className='title'>
                        <h3 className='my-2'>Manage users</h3>
                    </div>

                    <div className='actions'>
                        <button className='btn btn-success mx-2 mb-3' onClick={() => handleRefresh()}>
                            <i className="fa fa-refresh pe-1" ></i>
                            Refresh
                        </button>
                        <button className='btn btn-primary mx-2 mb-3' onClick={handleCreateUser}>
                            <i className="fa fa-plus pe-1"></i>
                            Add new user
                        </button>
                        <div className='row mb-3 d-flex flex-row flex-wrap justify-content-center'>
                            <label htmlFor='limit' className='limit-label' >Set limit per page: </label>
                            <select id='limit' name='limit' value={currentLimit} onChange={(e) => setCurrentLimit(e.target.value)} className="form-select" >
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </select>
                        </div>
                    </div>

                </div>

                <div className='user-container'>

                    <table className='table table-bordered table-hover'>
                        <thead>
                            <tr>

                                <th scope='col'>#</th>
                                <th scope='col'>User ID</th>
                                <th scope='col'>Email</th>
                                <th scope='col'>Username</th>
                                <th scope='col'>Sex</th>
                                <th scope='col'>Phone</th>
                                <th scope='col'>Address</th>
                                <th scope='col'>Group</th>
                                <th>Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {userList && userList.length > 0
                                ? <>
                                    {userList.map((user, index) => {
                                        return <tr key={index}>
                                            <td>{currentLimit * (currentPage - 1) + index + 1}</td>
                                            <td>{user.id}</td>
                                            <td>{user.email}</td>
                                            <td>{user.username}</td>
                                            <td>{user.sex}</td>
                                            <td>{user.phone}</td>
                                            <td>{user.address}</td>
                                            <td>{user.Group?.name} - {user.Group?.description}</td>
                                            <td>
                                                <button title='Edit a user' id="edit-btn" className='btn btn-warning mx-1'
                                                    onClick={() => handleUpdateUser(user)}>
                                                    <i className="fa fa-pencil-square" ></i>
                                                </button>
                                                <button title='Delete a user' id="delete-btn" className='btn btn-danger mx-1'
                                                    onClick={() => handleDeleteUser(user.id)}>
                                                    <i className="fa fa-trash-o"></i>

                                                </button>
                                            </td>
                                        </tr>

                                    })}
                                </>
                                : <tr><td><p>Not found Users</p></td></tr>}
                        </tbody>
                    </table>


                    <div className='user-footer'>
                        <ReactPaginate
                            containerClassName='pagination justify-content-center' //important
                            activeClassName='active'
                            breakLabel="..."
                            nextLabel="Next ->"
                            onPageChange={handlePageClick}
                            pageRangeDisplayed={5}
                            marginPagesDisplayed={2}
                            pageCount={totalPage}
                            previousLabel="<- Previous"
                            pageClassName='page-item'
                            pageLinkClassName='page-link'
                            breakClassName='page-item'
                            breakLinkClassName='page-link'
                            previousClassName='page-item'
                            previousLinkClassName='page-link'
                            nextClassName='page-item'
                            nextLinkClassName='page-link'
                            renderOnZeroPageCount={null}
                        />
                    </div>

                </div>
            </div>

            <ModalDelete show={showModalDelete} dataModal={dataModal} handleClose={handleCloseModalDelete} handleDelete={handleConfirmModalDelete} />
            <ModalUser action={actionModalUser} show={showModalUser} dataModal={dataModal} handleClose={handleCloseModalUser} handleSave={handleSaveModalUser} />
        </div>
    );
}

export default Users;