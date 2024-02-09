import React from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Users(props) {
    const navigate = useNavigate();

    useEffect(() => {
        let session = sessionStorage.getItem('account');
        if (!session) {
            navigate('/login');
        }
    });

    return (
        <div>
            Users components
        </div>
    );
}

export default Users;