import { React, useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Navbar from 'react-bootstrap/Navbar';
import { UserContext } from '../../context/UserProvider';
import './nav.scss';
import { NavLink, useNavigate } from 'react-router-dom';
import logo from '../../logo.svg';
import UserService from '../../services/userService';
import { toast } from 'react-toastify';

function NavHeader(props) {
    const { user, logoutContext } = useContext(UserContext);
    const account = user?.account;
    const navigate = useNavigate();

    const handleLogoutUser = async () => {
        try {
            let data = await UserService.handleLogout();
            if (data && data.errCode === '0') {
                localStorage.removeItem('accessToken');
                logoutContext();
                toast.success(data.errMsg);
                navigate('/')
            } else {
                toast.error("Error logging out: " + data?.errMsg);
            }
        } catch (error) {
            toast.error("Error logging out: " + error);
        }

    }

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
                                {(user && user.isAuthenticated === true) &&
                                    <>
                                        <NavLink to="/users">Users</NavLink>
                                        <NavLink to="/roles">Roles</NavLink>
                                        <NavLink to="/projects">Projects</NavLink>
                                    </>
                                }
                            </Nav>

                            <Nav variant="pills">
                                <Nav.Item>IsAuthenticated: {user.isAuthenticated}</Nav.Item>
                                {(user && user.isAuthenticated === true)
                                    ?
                                    <><Nav.Item className='nav-link nav-item'>
                                        Welcome, <strong>{account.username}</strong> !
                                    </Nav.Item>
                                        <NavDropdown title="Settings" id="basic-nav-dropdown" menuVariant='dark'>
                                            <NavDropdown.Item href="#action/3.1">Profile</NavDropdown.Item>
                                            <NavDropdown.Item>Change password</NavDropdown.Item>
                                            <NavDropdown.Divider />

                                            <NavDropdown.Item>
                                                <span onClick={() => handleLogoutUser()}>Log out</span>
                                            </NavDropdown.Item>
                                        </NavDropdown>
                                    </>
                                    : <>
                                        <NavLink to="/login">Login</NavLink>
                                        <NavLink to="/signup">Signup</NavLink>
                                    </>
                                }


                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </div>
        </>

    );
}

export default NavHeader;