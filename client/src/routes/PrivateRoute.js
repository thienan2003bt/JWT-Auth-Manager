import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function PrivateRoute(props) {

    const { children } = props;
    let auth = true;

    useEffect(() => {
        let session = sessionStorage.getItem('account');

        if (!session) {
            toast.error("You need to login to access this page");
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