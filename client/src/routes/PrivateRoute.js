import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function PrivateRoute(props) {
    const navigate = useNavigate();

    const { children } = props;
    let auth = true;

    useEffect(() => {
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