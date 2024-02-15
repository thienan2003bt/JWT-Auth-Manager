import { React, useState, useEffect } from 'react';
import './nav.scss';
import { NavLink } from 'react-router-dom';


function Nav(props) {
    const [isNavShow, setNavShow] = useState(true);

    useEffect(() => {
        let session = sessionStorage.getItem('account');

        if (!session) {
            setNavShow(false);
        }
    }, []);

    return (
        <>
            <div className="topnav">
                <NavLink to="/">Home</NavLink>
                <NavLink to="/login">Login</NavLink>
                {isNavShow === true &&
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