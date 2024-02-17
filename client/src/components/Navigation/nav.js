import { React, useState, useContext } from 'react';
import './nav.scss';
import { NavLink } from 'react-router-dom';
import { UserContext } from '../../context/UserProvider';

function Nav(props) {
    const { user } = useContext(UserContext);
    return (
        <>
            <div className="topnav">
                <NavLink to="/">Home</NavLink>
                <NavLink to="/login">Login</NavLink>
                {(user && user.isAuthenticated === true) &&
                    <>
                        <NavLink to="/users">Users</NavLink>
                        <NavLink to="/projects">Projects</NavLink>
                    </>
                }
            </div>
        </>

    );
}

export default Nav;