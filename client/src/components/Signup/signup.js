import React from 'react';
import './signup.scss';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';

function Signup(props) {

    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [retypePassword, setRetypePassword] = useState('');

    const handleSubmitSignupForm = () => {
        let userData = {
            "email": email,
            "phone": phone,
            username,
            password
        };

        alert("User data: " + JSON.stringify(userData));
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                let response = await axios.get('http://localhost:8080/api/test-api');
                response = response.data;
                console.log("Response data: ");
                console.log(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        //fetchData();
    }, []);

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

                        <h1 className='title'>Signup Form</h1>
                        <div className="form-group">
                            <label htmlFor="email">Email: </label>
                            <input required type="text" className="form-control" id="email" name="email" placeholder="Email address"
                                value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>

                        <div className="form-group">
                            <label htmlFor="username">Username: </label>
                            <input required type="text" className="form-control" id="username" name="username" placeholder="Username"
                                value={username} onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="phone">Phone: </label>
                            <input type="text" className="form-control" id="phone" name="phone" placeholder="Phone"
                                value={phone} onChange={(e) => setPhone(e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Password: </label>
                            <input required type="password" className="form-control" id="password" name="password" placeholder="Password"
                                value={password} onChange={(e) => setPassword(e.target.value)}
                            />

                        </div>

                        <div className="form-group">
                            <label htmlFor="retype_password">Retype password: </label>
                            <input required type="password" className="form-control" id="retype_password" name="retype_password" placeholder="Retype password"
                                value={retypePassword} onChange={(e) => setRetypePassword(e.target.value)}
                            />
                        </div>

                        <div className="text-center">
                            <button type="submit" className='btn btn-primary' onClick={() => handleSubmitSignupForm()}>Sign up</button>
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

export default Signup;