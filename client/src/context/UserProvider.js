import React, { useEffect, useState } from 'react';
import UserService from '../services/userService';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const UserContext = React.createContext({
    token: '',
    isAuthenticated: true
})


function UserProvider(props) {
    const navigate = useNavigate();
    const { children } = props;

    const defaultUser = {
        isLoading: true,
        token: '',
        isAuthenticated: false,
        account: {},
    };

    const [user, setUser] = useState(defaultUser);

    const loginContext = (userData) => {
        setUser({
            ...userData,
            isLoading: false
        });
    }

    const logoutContext = () => {
        setUser({
            ...defaultUser,
            isLoading: false
        });
    }

    const fetchUser = async () => {
        try {
            let response = await UserService.getUserAccount();
            if (response && response.errCode === '0') {
                let { group_role_list, email, username, accessToken } = response.data;

                let newData = {
                    isAuthenticated: true,
                    token: accessToken,
                    isLoading: false,
                    account: { group_role_list, email, username }
                };

                setUser(newData);
            } else {
                setUser({ ...defaultUser, isLoading: false });
                navigate('/login')
            }
        } catch (error) {
            toast.error("Error fetching user: ", error);
            setUser({ ...defaultUser, isLoading: false });
            navigate('/login')
        }

    }

    useEffect(() => {
        const nonFetchPath = ['/', '/login'];
        if (!nonFetchPath.includes(window.location.pathname)) {
            fetchUser();
        } else {
            setUser({ ...defaultUser, isLoading: false });
        }
    }, []);

    return (
        <div>
            <UserContext.Provider value={{ user, loginContext, logoutContext }}>
                {children}
            </UserContext.Provider>
        </div>
    );
}

export { UserProvider, UserContext };