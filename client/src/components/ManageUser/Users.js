import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { useNavigate } from 'react-router-dom';
import UserService from '../../services/userService';

import './Users.scss';

function Users(props) {
    const navigate = useNavigate();

    const [userList, setUserList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentLimit, setCurrentLimit] = useState(1);

    const [totalPage, setTotalPageCount] = useState(50);

    useEffect(() => {
        const fetchAllUsers = async (page) => {
            let response = await UserService.fetchAllUsers(page ? page : currentPage, currentLimit);
            if (response && response.data && response.data.errCode === '0') {
                response.data = response.data.data;
                setUserList(response.data.userList);
                setTotalPageCount(response.data.totalPage);
            }
        }

        fetchAllUsers();
    }, [currentPage]);

    const handlePageClick = async (event) => {
        const newOffset = parseInt(event.selected) + 1;
        setCurrentPage(newOffset);
    };


    return (
        <div className='container manage-users-container'>
            <div className='user-header'>
                <div className='title'>
                    <h3 >Table of Users</h3>
                </div>

                <div className='actions'>
                    <button className='btn btn-success'>Refresh</button>
                    <button className='btn btn-primary'>Add new user</button>
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
                                        <td scope='row'>{index}</td>
                                        <td>{user.id}</td>
                                        <td>{user.email}</td>
                                        <td>{user.username}</td>
                                        <td>{user.sex}</td>
                                        <td>{user.phone}</td>
                                        <td>{user.address}</td>
                                        <td>{user.Group?.name} - {user.Group?.description}</td>
                                        <td>
                                            <button className='btn btn-warning mx-2'>Edit</button>
                                            <button className='btn btn-danger mx-2'>Delete</button>
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
    );
}

export default Users;