import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import UserService from '../../services/userService';
import './signup.scss';

function Signup(props) {

    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [retypePassword, setRetypePassword] = useState('');


    const initialValid = {
        validEmail: true,
        validUsername: true,
        validPhone: true,
        validPassword: true,
        validRetypePassword: true,
    }
    const [isValid, setIsValid] = useState(initialValid);

    const validateSignupForm = () => {
        const emailRegex = /\S+@\S+\.\S+/;
        const phoneRegex = /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/;

        if (!email) {
            toast.error("Email is required");
            setIsValid({ ...initialValid, validEmail: false });
            return false;
        }
        if (!emailRegex.test(email)) {
            toast.error("Enter invalid email address");
            setIsValid({ ...initialValid, validEmail: false });
            return false;
        }
        if (!username) {
            toast.error("Username is required");
            setIsValid({ ...initialValid, validUsername: false });
            return false;
        }
        if (!phone) {
            toast.error("Phone number is required");
            setIsValid({ ...initialValid, validPhone: false });
            return false;
        }
        if (!phoneRegex.test([phone])) {
            toast.error("Enter invalid phone number");
            setIsValid({ ...initialValid, validPhone: false });
            return false;
        }
        if (!password) {
            toast.error("Password is required");
            setIsValid({ ...initialValid, validPassword: false });
            return false;
        }
        if (password !== retypePassword) {
            toast.error("Your retype password is not the same with the password");
            setIsValid({ ...initialValid, validRetypePassword: false });
            return false;
        }


        return true;
    }

    const handleSubmitSignupForm = async () => {

        let state = validateSignupForm();
        if (state === true) {
            try {
                let response = await UserService.createNewUser(email, username, phone, password);
                response = response.data;

                if (response.errCode === '0') {
                    toast.success(response.errMsg);
                    navigate("/login");
                } else {
                    toast.error(response.errMsg);

                }
            } catch (error) {
                console.error('Error posting data:', error);
            }
        }
    }

    useEffect(() => {

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
                            <input required type="text" className={isValid.validEmail ? "form-control" : "form-control is-invalid"} id="email" name="email" placeholder="Email address"
                                value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>

                        <div className="form-group">
                            <label htmlFor="username">Username: </label>
                            <input required type="text" className={isValid.validUsername ? "form-control" : "form-control is-invalid"} id="username" name="username" placeholder="Username"
                                value={username} onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="phone">Phone: </label>
                            <input required type="text" className={isValid.validPhone ? "form-control" : "form-control is-invalid"} id="phone" name="phone" placeholder="Phone"
                                value={phone} onChange={(e) => setPhone(e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Password: </label>
                            <input required type="password" className={isValid.validPassword ? "form-control" : "form-control is-invalid"} id="password" name="password" placeholder="Password"
                                value={password} onChange={(e) => setPassword(e.target.value)}
                            />

                        </div>

                        <div className="form-group">
                            <label htmlFor="retype_password">Retype password: </label>
                            <input required type="password" className={isValid.validRetypePassword ? "form-control" : "form-control is-invalid"} id="retype_password" name="retype_password" placeholder="Retype password"
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