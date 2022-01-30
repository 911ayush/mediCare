import React from 'react'
import { Outlet } from 'react-router';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export const Wauth = (props) => {
    return (
        <>
        <Navbar bg="dark" variant="dark" className='mb-3 '>
                <Container>
                    <Nav className="me-auto">
                        <Navbar.Collapse className="justify-content-end">
                            <Navbar.Text>
                                Enter as: <a>{props.who}</a>
                            </Navbar.Text>
                        </Navbar.Collapse>
                        <Nav.Link as={Link} to="signup" >Sign Up</Nav.Link>
                        <Nav.Link as={Link} to="login" >Log In</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>

        <Outlet />
        </>
    )
}
