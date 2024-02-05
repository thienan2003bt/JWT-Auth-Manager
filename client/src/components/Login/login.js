import React from 'react';
import './login.scss';

function login(props) {
    return (
        <div className='login-container mt-3'>
            <div className='container'>
                <div className='row'>
                    <div className='container-left red col-7'>
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

                    <div className='container-right green col-5 d-flex flex-column gap-3 py-3'>
                        <h1 className='title'>Login Form</h1>
                        <input type="text" className="form-control" placeholder="Email address or your phone number" />
                        <input type="password" className="form-control" placeholder="Password" />

                        <div className="text-center">
                            <button type="submit" className='btn btn-primary'>Login</button>
                            <div className='my-3'></div>
                            <a href="/reset-password" className="text-center">Forgot password ?</a>
                            <hr />
                        </div>
                        <div className="text-center">

                            <button type="button" className='btn btn-success'>Create new account</button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default login;