import React, { useContext, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

import { UserContext } from '../context/UserProvider';
function PrivateRoute(props) {
    const navigate = useNavigate();
    const { user } = useContext(UserContext);

    const { children } = props;
    let auth = true;

    useEffect(() => {
        console.log("Check context user: ");
        console.log(user);
        let session = sessionStorage.getItem('account');

        if (!session) {
            toast.error("You need to login to access this page");
            navigate('/login');
            auth = false;
        }
    });

    return (
        <div>
            {auth
                ? <>{children}</>
                : <Navigate to="/login" />
            }
        </div>

    );
}


export default PrivateRoute;