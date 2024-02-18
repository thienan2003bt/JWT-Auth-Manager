import { React } from 'react';
import { Route, Routes } from 'react-router-dom';

import Login from '../components/Login/login.js';
import Users from '../components/ManageUser/Users.js';
import Signup from '../components/Signup/signup.js';
import PrivateRoute from './PrivateRoute.js';
import Roles from '../components/Roles/Roles.js';

function IndexRoute(props) {
    return (
        <div>
            <Routes>
                {/* Public */}
                <Route path="/" element="Home" />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />

                {/* Private */}
                <Route path="/users" element={
                    <PrivateRoute>
                        <Users />
                    </PrivateRoute>
                } >
                </Route>
                <Route path="/roles" element={
                    <PrivateRoute>
                        <Roles />
                    </PrivateRoute>
                } >
                </Route>
                <Route path="/projects" element={
                    <PrivateRoute>
                        <span>Project Lists</span>
                    </PrivateRoute>
                } >
                </Route>

                {/* Not Found */}
                <Route path="*" element="404 Not Found" />


            </Routes>
        </div>
    );
}

export default IndexRoute;