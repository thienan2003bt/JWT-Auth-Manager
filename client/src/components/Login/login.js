import { React, useContext, useEffect, useState } from 'react';
import './login.scss';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import UserService from '../../services/userService';

import { UserContext } from '../../context/UserProvider';

function Login(props) {
    const { user, loginContext } = useContext(UserContext);

    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        if (user && user.isAuthenticated === true) {
            navigate('/');
        }
    })

    const handlePressEnter = (e) => {
        if (e.code === "Enter" || e.code === "NumpadEnter") {
            handleLoginForm();
        }
    }

    const handleLoginForm = async () => {
        if (!email) {
            toast.error("Email is required");
            return;
        }
        const emailRegex = /\S+@\S+\.\S+/;

        if (!emailRegex.test(email)) {
            toast.error("Enter invalid email address");
            return false;
        }

        if (!password) {
            toast.error("Password is required");
            return;
        }

        let response = await UserService.handleLogin(email, password);
        if (response.errCode !== '0') {
            toast.error(response.errMsg);
        } else {
            let { group_role_list, email, username, accessToken } = response.data;

            let data = {
                isAuthenticated: true,
                token: accessToken,
                account: { group_role_list, email, username }
            };

            loginContext(data);
            localStorage.setItem('accessToken', accessToken);
            navigate('/users');
            toast.success(response.errMsg);
        }
    }

    return (
        <div className='login-container d-flex flex-column justify-content-center'>
            <div className='container'>
                <div className='row px-sm-1 px-3'>
                    <div className='container-left col-sm-7 d-none d-sm-flex flex-column justify-content-center align-items-start ps-3'>
                        <div className='brand'>
                            <h1>
                                JWT Human Resources Management
                            </h1>
                        </div>
                        <div className='detail'>
                            <p>
                                Manage and assign project tasks for personnels all in our unique website.
                            </p>
                        </div>
                    </div>

                    <div className='container-right green col-12 col-sm-5 d-flex flex-column gap-3 py-3 justify-content-center'>
                        <div className='brand d-sm-none d-block'>
                            <h1>
                                JWT Human Resources Management
                            </h1>
                        </div>

                        <h1 className='title'>Login Form</h1>
                        <input type="text" className="form-control" placeholder="Email address: " required
                            id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <input type="password" className="form-control" placeholder="Password: " required
                            id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)}
                            onKeyDown={(e) => handlePressEnter(e)} />

                        <div className="text-center">
                            <button type="submit" className='btn btn-primary' onClick={() => handleLoginForm()}>Login</button>
                            <div className='my-3'></div>
                            <a href="/reset-password" className="text-center forgot-password">Forgot password ?</a>
                            <hr />
                        </div>
                        <div className="text-center">
                            <Link to="/signup">
                                <button type="button" className='btn btn-success'>Create new account</button>
                            </Link>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Login;