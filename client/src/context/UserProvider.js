import React, { useState } from 'react';

const UserContext = React.createContext({
    token: '',
    isAuthenticated: true
})

function UserProvider(props) {
    const { children } = props;

    const defaultUser = {
        token: '',
        isAuthenticated: true,
        account: {},
    };

    const [user, setUser] = useState(defaultUser);

    const loginContext = (userData) => {
        setUser(userData);
    }

    const logout = () => {
        setUser({
            ...defaultUser,
            isAuthenticated: false,
        });
    }

    return (
        <div>
            <UserContext.Provider value={{ user, loginContext, logout }}>
                {children}
            </UserContext.Provider>
        </div>
    );
}

export { UserProvider, UserContext };