import React from 'react';
import './signup.scss';
import { Link } from 'react-router-dom';

function signup(props) {
    return (
        <div className='signup-container d-flex flex-column justify-content-center'>
            <div className='container'>
                <div className='row px-sm-1 px-3'>
                    <div className='container-left red col-sm-7 d-none d-sm-flex flex-column justify-content-center align-items-start ps-3'>
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
                        <div className="form-group">
                            <label htmlFor="email">Email: </label>
                            <input required type="text" className="form-control" id="email" name="email" placeholder="Email address" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="username">Username: </label>
                            <input required type="text" className="form-control" id="username" name="username" placeholder="Username" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="phone">Phone: </label>
                            <input type="text" className="form-control" id="phone" name="phone" placeholder="Phone" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Password: </label>
                            <input required type="password" className="form-control" id="password" name="password" placeholder="Password" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="retype_password">Retype password: </label>
                            <input required type="password" className="form-control" id="retype_password" name="retype_password" placeholder="Retype password" />
                        </div>

                        <div className="text-center">
                            <button type="submit" className='btn btn-primary'>Sign up</button>
                            <div className='my-3'></div>
                            <hr />
                        </div>
                        <div className="text-center">

                            <label id="login-label" htmlFor="login">Already have an account ?</label>
                            <div className='my-3'></div>
                            <Link to="/login">
                                <button type="button" className='btn btn-success' id="login">Login</button>
                            </Link>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default signup;