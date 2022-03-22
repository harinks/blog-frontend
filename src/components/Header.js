import React from 'react';
import { Navbar, Nav, NavDropdown, Container, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { useNavigate } from 'react-router-dom';
import logo from '../images/MERN BLOG-logo/default.png';
import { useLogoutUserMutation } from '../services/appApi';

function Header() {
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.user);
    const [logoutUser] = useLogoutUserMutation();

    function handleLogout() {
        logoutUser().then(({ error }) => {
            if (!error) {
                navigate('/');
            }
            alert("logged out");
        })
    }

    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <LinkContainer to='/'>
                    <Navbar.Brand href="#home">
                        <h1 className="my-1" style={{ fontFamily: "Ubuntu", textShadow: "0 0 2px #FF0000, 0 0 3px #0000FF" }}>MERN BLOG</h1>
                    </Navbar.Brand>
                </LinkContainer>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <LinkContainer to='/'>
                            <Nav.Link className="mx-1 my-1">Home</Nav.Link>
                        </LinkContainer>
                        {!user && (
                            <LinkContainer to='/login'>
                                <Nav.Link className="btn btn-primary text-white mx-1 my-1">Login</Nav.Link>
                            </LinkContainer>
                        )}
                        {!user && (
                            <LinkContainer to='/signup'>
                                <Nav.Link className="btn btn-primary text-white mx-1 my-1">Register</Nav.Link>
                            </LinkContainer>
                        )}
                        {user && (
                            <LinkContainer to='/create-blog'>
                                <Nav.Link className="btn btn-primary text-white mx-1 my-1">CreateBlog</Nav.Link>
                            </LinkContainer>
                        )}
                        {user && (
                            <NavDropdown className="mx-1 my-1" title={user.name} id="basic-nav-dropdown">
                                <LinkContainer to='/create-blog'>
                                    <NavDropdown.Item>Create Blog</NavDropdown.Item>
                                </LinkContainer>
                                <LinkContainer to='/blogs/me'>
                                    <NavDropdown.Item>My Blogs</NavDropdown.Item>
                                </LinkContainer>
                                <NavDropdown.Divider />
                                <NavDropdown.Item>
                                    <Button onClick={handleLogout} variant='danger'>Logout</Button>
                                </NavDropdown.Item>
                            </NavDropdown>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Header