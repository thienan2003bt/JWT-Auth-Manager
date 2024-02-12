import React, { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import UserService from '../../services/userService';

function Users(props) {
    const navigate = useNavigate();

    const [userList, setUserList] = useState([]);



    useEffect(() => {
        const fetchAllUsers = async () => {
            let response = await UserService.fetchAllUsers();
            if (response && response.data && response.data.errCode === '0') {
                setUserList(response.data.data);
            }
        }

        fetchAllUsers();
    });

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
                        <th scope='col'>#</th>
                        <th scope='col'>User ID</th>
                        <th scope='col'>Email</th>
                        <th scope='col'>Username</th>
                        <th scope='col'>Sex</th>
                        <th scope='col'>Phone</th>
                        <th scope='col'>Address</th>
                        <th scope='col'>Group</th>
                    </thead>

                    <tbody>
                        {userList && userList.length > 0
                            ? <>
                                {userList.map((user, index) => {
                                    return <tr>
                                        <td scope='row'>{index}</td>
                                        <td>{user.id}</td>
                                        <td>{user.email}</td>
                                        <td>{user.username}</td>
                                        <td>{user.sex}</td>
                                        <td>{user.phone}</td>
                                        <td>{user.address}</td>
                                        <td>{user.Group?.name} - {user.Group?.description}</td>
                                    </tr>
                                })}
                            </>
                            : <p>Not found Users</p>}
                    </tbody>
                </table>


                <div className='user-footer'>
                    <nav aria-label="Page navigation example">
                        <ul class="pagination">
                            <li class="page-item"><Link class="page-link" to="#">Previous</Link></li>
                            <li class="page-item"><Link class="page-link" to="#">1</Link></li>
                            <li class="page-item"><Link class="page-link" to="#">2</Link></li>
                            <li class="page-item"><Link class="page-link" to="#">3</Link></li>
                            <li class="page-item"><Link class="page-link" to="#">Next</Link></li>
                        </ul>
                    </nav>
                </div>

            </div>
        </div>
    );
}

export default Users;