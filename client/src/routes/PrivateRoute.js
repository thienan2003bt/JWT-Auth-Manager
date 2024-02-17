import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';

import { UserContext } from '../context/UserProvider';
function PrivateRoute(props) {
    const { user } = useContext(UserContext);

    const { children } = props;

    return (
        <div>
            {(user && user.isAuthenticated === true)
                ? <>{children}</>
                : <Navigate to="/login" />
            }
        </div>

    );
}


export default PrivateRoute;