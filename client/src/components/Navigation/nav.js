import { React, useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Navbar from 'react-bootstrap/Navbar';
import { UserContext } from '../../context/UserProvider';
import './nav.scss';
import { NavLink } from 'react-router-dom';
import logo from '../../logo.svg';

function NavHeader(props) {
    const { user } = useContext(UserContext);
    const account = user?.account;
    return (
        <>
            <div className='nav-header'>
                <Navbar expand="lg" bg="header" className="">
                    <Container>
                        <Navbar.Brand href="/">
                            <img
                                src={logo}
                                width='30'
                                height='30'
                                className='d-inline-block align-top'
                            />
                            <span className='brand-name'>React</span>
                        </Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav variant="pills" className="me-auto">
                                <NavLink to="/">Home</NavLink>
                                <NavLink to="/login">Login</NavLink>
                                {(user && user.isAuthenticated === true) &&
                                    <>
                                        <NavLink to="/users">Users</NavLink>

                                        <NavLink to="/projects">Projects</NavLink>
                                    </>
                                }
                            </Nav>

                            <Nav variant="pills">
                                <Nav.Item className='nav-link nav-item'>
                                    Welcome, <strong>{account.username ? account.username : "anonymous"}</strong> !
                                </Nav.Item>
                                <NavDropdown title="Settings" id="basic-nav-dropdown" menuVariant='dark'>
                                    <NavDropdown.Item href="#action/3.1">Profile</NavDropdown.Item>
                                    <NavDropdown.Item href="#action/3.2">Change password</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item href="#action/3.4">Log out</NavDropdown.Item>
                                </NavDropdown>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </div>
        </>

    );
}

export default NavHeader;